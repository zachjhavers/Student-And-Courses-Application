import React from "react";
import { gql, useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const GET_COURSES = gql`
  {
    courses {
      id
      courseCode
      courseName
      section
      semester
      students {
        id
        studentNumber
      }
    }
  }
`;

const CourseList = () => {
  const { loading, error, data, refetch } = useQuery(GET_COURSES);

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Students</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.section}</td>
              <td>{course.semester}</td>
              <td>
                {course.students.map((student) => (
                  <div key={student.id}>{student.studentNumber}</div>
                ))}
              </td>
              <td>
                <Link to={`/editcourse/${course.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="center">
        <button className="center" onClick={() => refetch()}>
          Refetch
        </button>
      </div>
    </div>
  );
};

export default CourseList;
