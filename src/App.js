// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Setting up the routes
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";

import ListStudents from "./components/Student/ListStudents";
import ShowStudents from "./components/Student/ShowStudents";

import AddCourse from "./components/Course/AddCourse";
import EditCourse from "./components/Course/EditCourse";
import ListCourses from "./components/Course/ListCourses";
import ShowCourses from "./components/Course/ShowCourses";

import Home from "./components/Home";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Student Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/liststudents">
                List of Students
              </Nav.Link>
              <Nav.Link as={Link} to="/listcourses">
                List of Courses
              </Nav.Link>
              <Nav.Link as={Link} to="/addcourse">
                Add Course
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="appContainer">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route path="/liststudents" element={<PrivateRoute />}>
            <Route path="/liststudents" element={<ListStudents />} />
          </Route>

          <Route path="/showstudents/:id" element={<PrivateRoute />}>
            <Route path="/showstudents/:id" element={<ShowStudents />} />
          </Route>

          <Route path="/listcourses" element={<PrivateRoute />}>
            <Route path="/listcourses" element={<ListCourses />} />
          </Route>

          <Route path="/editcourse/:id" element={<PrivateRoute />}>
            <Route path="/editcourse/:id" element={<EditCourse />} />
          </Route>
          
          <Route path="/showcourses/:id" element={<PrivateRoute />}>
            <Route path="/showcourses/:id" element={<ShowCourses />} />
          </Route>

          <Route path="/addcourse" element={<PrivateRoute />}>
            <Route path="/addcourse" element={<AddCourse />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
