const Course = require("../models/Course");
const Student = require("../models/Student");

const getCourses = async () => {
  const courses = await Course.find().populate("students").exec();
  if (!courses) {
    throw new Error("Error");
  }
  return courses;
};

const getCourseById = async (root, args) => {
  const courseInfo = await Course.findById(args.id).exec();
  if (!courseInfo) {
    throw new Error("Error");
  }
  return courseInfo;
};

const addCourse = async (root, params) => {
  const courseModel = new Course(params);
  const newCourse = await courseModel.save();
  if (!newCourse) {
    throw new Error("Error");
  }
  return newCourse;
};

const addStudentToCourse = async (root, { studentId, courseId }) => {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    if (course.students.includes(studentId)) {
      throw new Error(
        `Student with ID ${studentId} is already associated with the course`
      );
    }

    course.students.push(studentId);

    const updatedCourse = await course.save();

    return updatedCourse;
  } catch (error) {
    console.error("Error adding student to course:", error);
    throw new Error("Failed to add student to course");
  }
};

const updateCourse = async (parent, args) => {
  console.log("args in update course :", args);
  try {
    const { id, ...update } = args;
    const options = { new: true };
    const updatedCourse = await Course.findByIdAndUpdate(id, update, options);

    if (!updatedCourse) {
      throw new Error(`Course with ID ${id} not found`);
    }

    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error("Failed to update course");
  }
};

const deleteCourse = async (root, params) => {
  try {
    const deletedCourse = await Course.findOneAndRemove({
      courseCode: params.courseCode,
    }).exec();

    if (!deletedCourse) {
      throw new Error(`Course with course code ${params.courseCode} not found`);
    }

    return deletedCourse;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw new Error("Failed to delete course");
  }
};

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  addStudentToCourse,
};
