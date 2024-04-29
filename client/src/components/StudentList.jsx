import React from "react";
import { gql, useQuery } from "@apollo/client";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const GET_STUDENTS = gql`
  {
    students {
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

const StudentList = () => {
  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Number</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Program</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.studentNumber}</td>
              <td>{student.password}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.address}</td>
              <td>{student.city}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.email}</td>
              <td>{student.program}</td>
              <td>
                <Link to={`/editstudent/${student.id}`}>Edit</Link>
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

export default StudentList;
