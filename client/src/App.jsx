import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import AddCourse from "./components/AddCourse";
import CourseList from "./components/CourseList";
import EditCourse from "./components/EditCourse";
import AddStudentToCourse from "./components/addStudentToCourse";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="home">Student & Course Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/courselist">
                Courses
              </Nav.Link>
              <Nav.Link as={Link} to="/studentlist">
                Students
              </Nav.Link>
              <Nav.Link as={Link} to="/addcourse">
                Add Course
              </Nav.Link>
              <Nav.Link as={Link} to="/addstudent">
                Add Student
              </Nav.Link>
              <Nav.Link as={Link} to="/addstudenttocourse">
                Add Student To Course
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="studentlist" element={<StudentList />} />
          <Route path="addstudent" element={<AddStudent />} />
          <Route path="editstudent/:id" element={<EditStudent />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="courselist" element={<CourseList />} />
          <Route path="editcourse/:id" element={<EditCourse />} />
          <Route path="addstudenttocourse" element={<AddStudentToCourse />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
