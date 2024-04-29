import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./entryform.css";

const ADD_STUDENT_TO_COURSE = gql`
  mutation AddStudentToCourse($studentId: ID!, $courseId: ID!) {
    addStudentToCourse(studentId: $studentId, courseId: $courseId) {
      id
      courseCode
      courseName
    }
  }
`;

const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
    students {
      id
      studentNumber
    }
  }
`;

const GET_ALL_COURSES = gql`
  query GetAllCourses {
    courses {
      id
      courseCode
    }
  }
`;

const AddStudentToCourse = () => {
  let navigate = useNavigate();
  let studentId, courseId;

  const {
    loading: studentsLoading,
    error: studentsError,
    data: studentsData,
  } = useQuery(GET_ALL_STUDENTS);
  const {
    loading: coursesLoading,
    error: coursesError,
    data: coursesData,
  } = useQuery(GET_ALL_COURSES);

  const [addStudentToCourse, { loading, error }] = useMutation(
    ADD_STUDENT_TO_COURSE
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudentToCourse({
      variables: {
        studentId: studentId.value,
        courseId: courseId.value,
      },
    })
      .then(() => {
        studentId.value = "";
        courseId.value = "";
        navigate("/");
      })
      .catch((error) => {
        console.error("Submission error:", error);
      });
  };

  return (
    <div className="entryform">
      <br></br>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Select Student:</Form.Label>
          <Form.Control
            as="select"
            ref={(node) => {
              studentId = node;
            }}
          >
            {studentsLoading ? (
              <option>Loading...</option>
            ) : studentsError ? (
              <option>Error loading students</option>
            ) : (
              studentsData.students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.studentNumber}
                </option>
              ))
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label> Select Course:</Form.Label>
          <Form.Control
            as="select"
            ref={(node) => {
              courseId = node;
            }}
          >
            {coursesLoading ? (
              <option>Loading...</option>
            ) : coursesError ? (
              <option>Error loading courses</option>
            ) : (
              coursesData.courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseCode}
                </option>
              ))
            )}
          </Form.Control>
        </Form.Group>

        <br></br>
        <Button variant="primary" type="submit">
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Submitting...
            </>
          ) : (
            "Add Student to Course"
          )}
        </Button>
      </form>
      {error && <div className="error">Submission error! {error.message}</div>}
    </div>
  );
};

export default AddStudentToCourse;
