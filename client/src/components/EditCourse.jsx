import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import "./entryform.css";

const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $courseCode: String
    $courseName: String
    $section: String
    $semester: String
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
    ) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_COURSE, {
    variables: { id },
  });

  const [updateCourse] = useMutation(UPDATE_COURSE);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { courseCode, courseName, section, semester } = e.target.elements;

    updateCourse({
      variables: {
        id,
        courseCode: courseCode.value,
        courseName: courseName.value,
        section: section.value,
        semester: semester.value,
      },
    })
      .then(() => {
        navigate("/courselist");
      })
      .catch((error) => {
        console.error("Submission error:", error);
      });
  };

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (error) return <p>Error :(</p>;

  const { courseCode, courseName, section, semester } = data.course;

  return (
    <div>
      <h1>Edit Course</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCourseCode">
          <Form.Label>Course Code</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            defaultValue={courseCode}
          />
        </Form.Group>

        <Form.Group controlId="formCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            defaultValue={courseName}
          />
        </Form.Group>

        <Form.Group controlId="formSection">
          <Form.Label>Section</Form.Label>
          <Form.Control type="text" name="section" defaultValue={section} />
        </Form.Group>

        <Form.Group controlId="formSemester">
          <Form.Label>Semester</Form.Label>
          <Form.Control type="text" name="semester" defaultValue={semester} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditCourse;
