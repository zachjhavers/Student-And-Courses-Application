import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import "./entryform.css";

const UPDATE_STUDENT = gql`
  mutation UpdateStudent(
    $id: ID!
    $studentNumber: String
    $password: String
    $firstName: String!
    $lastName: String!
    $address: String
    $city: String
    $phoneNumber: String
    $email: String!
    $program: String!
  ) {
    updateStudent(
      id: $id
      studentNumber: $studentNumber
      password: $password
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      email: $email
      program: $program
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
      id
      studentNumber
      password
      firstName
      lastName
      address
      city
      phoneNumber
      email
      program
    }
  }
`;

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_STUDENT, {
    variables: { id },
  });

  const [updateStudent] = useMutation(UPDATE_STUDENT);

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      studentNumber,
      password,
      firstName,
      lastName,
      address,
      city,
      phoneNumber,
      email,
      program,
    } = e.target.elements;

    updateStudent({
      variables: {
        id,
        studentNumber: studentNumber.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        program: program.value,
      },
    })
      .then(() => {
        navigate("/studentlist");
      })
      .catch((error) => {
        console.error("Submission error:", error);
      });
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p>Error :(</p>;

  const {
    studentNumber,
    password,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    email,
    program,
  } = data.student;

  return (
    <div>
      <h1>Edit Student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formStudentNumber">
          <Form.Label>Student Number</Form.Label>
          <Form.Control
            type="text"
            name="studentNumber"
            defaultValue={studentNumber}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            defaultValue={password}
          />
        </Form.Group>

        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" defaultValue={firstName} />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" defaultValue={lastName} />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" defaultValue={address} />
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" defaultValue={city} />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            defaultValue={phoneNumber}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" defaultValue={email} />
        </Form.Group>

        <Form.Group controlId="formProgram">
          <Form.Label>Program</Form.Label>
          <Form.Control type="text" name="program" defaultValue={program} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditStudent;
