const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} = require("graphql");
const {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  addStudentToCourse,
} = require("../resolvers/course.server.resolvers");
const {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../resolvers/student.server.resolvers");
const Student = require("../models/Student");

const studentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLID },
    studentNumber: { type: GraphQLString },
    password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    phoneNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    program: { type: GraphQLString },
  }),
});

const courseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    courseCode: { type: GraphQLString },
    courseName: { type: GraphQLString },
    section: { type: GraphQLString },
    semester: { type: GraphQLString },
    students: {
      type: new GraphQLList(studentType),
      resolve: async (parent, args) => {
        const students = await Student.find({ _id: { $in: parent.students } });
        return students;
      },
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    courses: {
      type: new GraphQLList(courseType),
      resolve: getCourses,
    },
    course: {
      type: courseType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: getCourseById,
    },
    students: {
      type: new GraphQLList(studentType),
      resolve: getStudents,
    },
    student: {
      type: studentType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: getStudentById,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCourse: {
      type: courseType,
      args: {
        courseCode: { type: new GraphQLNonNull(GraphQLString) },
        courseName: { type: new GraphQLNonNull(GraphQLString) },
        section: { type: new GraphQLNonNull(GraphQLString) },
        semester: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addCourse,
    },
    addStudentToCourse: {
      type: courseType,
      args: {
        studentId: { type: new GraphQLNonNull(GraphQLID) },
        courseId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: addStudentToCourse,
    },
    updateCourse: {
      type: courseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        courseCode: { type: new GraphQLNonNull(GraphQLString) },
        courseName: { type: new GraphQLNonNull(GraphQLString) },
        section: { type: new GraphQLNonNull(GraphQLString) },
        semester: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateCourse,
    },
    deleteCourse: {
      type: courseType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteCourse,
    },
    addStudent: {
      type: studentType,
      args: {
        studentNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        program: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addStudent,
    },
    updateStudent: {
      type: studentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        studentNumber: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        city: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        program: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: updateStudent,
    },
    deleteStudent: {
      type: studentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: deleteStudent,
    },
  },
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
