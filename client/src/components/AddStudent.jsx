import React from "react";
import { gql, useMutation } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import "./entryform.css";

const ADD_STUDENT = gql`
  mutation AddStudent(
    $studentNumber: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $phoneNumber: String!
    $email: String!
    $program: String!
  ) {
    addStudent(
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

const AddStudent = () => {
  let navigate = useNavigate();
  let studentNumber,
    password,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    email,
    program;

  const [addStudent, { loading, error }] = useMutation(ADD_STUDENT);

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent({
      variables: {
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
        studentNumber.value = "";
        password.value = "";
        firstName.value = "";
        lastName.value = "";
        address.value = "";
        city.value = "";
        phoneNumber.value = "";
        email.value = "";
        program.value = "";
        navigate("/studentlist");
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
          <Form.Label> Student Number:</Form.Label>
          <Form.Control
            type="text"
            name="studentNumber"
            ref={(node) => {
              studentNumber = node;
            }}
            placeholder="Student Number:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            ref={(node) => {
              password = node;
            }}
            placeholder="Password:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            ref={(node) => {
              firstName = node;
            }}
            placeholder="First Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            ref={(node) => {
              lastName = node;
            }}
            placeholder="Last Name:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Address:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            ref={(node) => {
              address = node;
            }}
            placeholder="Address:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> City:</Form.Label>
          <Form.Control
            type="text"
            name="city"
            ref={(node) => {
              city = node;
            }}
            placeholder="City:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            ref={(node) => {
              phoneNumber = node;
            }}
            placeholder="Phone Number:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            ref={(node) => {
              email = node;
            }}
            placeholder="Email:"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label> Program:</Form.Label>
          <Form.Control
            type="text"
            name="program"
            ref={(node) => {
              program = node;
            }}
            placeholder="Program:"
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit">
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Submitting...
            </>
          ) : (
            "Add Student"
          )}
        </Button>
      </form>
      {error && <div className="error">Submission error! {error.message}</div>}
    </div>
  );
};

export default AddStudent;
