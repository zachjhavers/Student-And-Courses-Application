import React from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./entryform.css";

const ADD_COURSE = gql`
  mutation AddCourse(
    $courseCode: String!
    $courseName: String!
    $section: String!
    $semester: String!
  ) {
    addCourse(
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
    ) {
      id
      courseCode
      courseName
    }
  }
`;

const AddCourse = () => {
  let navigate = useNavigate();
  let courseCode, courseName, section, semester;

  const [addCourse, { loading, error }] = useMutation(ADD_COURSE);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({
      variables: {
        courseCode: courseCode.value,
        courseName: courseName.value,
        section: section.value,
        semester: semester.value,
      },
    })
      .then(() => {
        courseCode.value = "";
        courseName.value = "";
        section.value = "";
        semester.value = "";
        navigate("/courselist");
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
          <Form.Label> Course Code:</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            ref={(node) => {
              courseCode = node;
            }}
            placeholder="Course Code:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Course Name:</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            ref={(node) => {
              courseName = node;
            }}
            placeholder="Course Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Section:</Form.Label>
          <Form.Control
            type="text"
            name="section"
            ref={(node) => {
              section = node;
            }}
            placeholder="Section:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Semester:</Form.Label>
          <Form.Control
            type="text"
            name="semester"
            ref={(node) => {
              semester = node;
            }}
            placeholder="Semester:"
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit">
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Submitting...
            </>
          ) : (
            "Add Course"
          )}
        </Button>
      </form>
      {error && <div className="error">Submission error! {error.message}</div>}
    </div>
  );
};

export default AddCourse;
