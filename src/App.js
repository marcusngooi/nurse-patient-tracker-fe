// Group Project
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Setting up the routes
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";

// import ListStudents from "./components/Student/ListStudents";
// import ShowStudents from "./components/Student/ShowStudents";

// import AddCourse from "./components/Course/AddCourse";
// import EditCourse from "./components/Course/EditCourse";
// import ListCourses from "./components/Course/ListCourses";
// import ShowCourses from "./components/Course/ShowCourses";

import Home from "./components/Home";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Game from "./components/Game"

import PrivateRoute from "./components/PrivateRoute";
import PatientRouteGuard from "./components/PatientRouteGuard";

import ListUsers from "./components/Nurse/ListUsers";
import ShowVitalSigns from "./components/Patient/ShowVitalSigns";
import EnterVitalSigns from "./components/Patient/EnterVitalSigns";
import CheckCommonSymptoms from "./components/Patient/CheckCommonSymptoms";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNurse, setIsNurse] = useState(false);

  useEffect(() => {
    // Retrieve the isSignedIn value from the cookie when the application loads
    const isSignedInCookie = Cookies.get("isSignedIn");
    if (isSignedInCookie) {
      setIsSignedIn(isSignedInCookie === "true");
    }
    const isNurseCookie = Cookies.get("isNurse");
    if (isNurseCookie) {
      setIsNurse(isNurseCookie === "true");
    }
  }, []);

  const handleSignIn = (data) => {
    setIsSignedIn(true);
    Cookies.set("isSignedIn", "true");
    if (data.data.signIn.userType === "nurse") {
      setIsNurse(true);
      Cookies.set("isNurse", "true");
    } else {
      Cookies.set("isNurse", "false");
      setIsNurse(false);
    }
  };

  // const handleSignOut = () => {
  //   setIsSignedIn(false);
  //   Cookies.set("isSignedIn", "false");
  // };

  const handleSignUp = (data) => {
    setIsSignedIn(true);
    Cookies.set("isSignedIn", "true");
    console.log(data);
    if (data.data.signUp.userType === "nurse") {
      setIsNurse(true);
      Cookies.set("isNurse", "true");
    } else {
      setIsNurse(false);
      Cookies.set("isNurse", "false");
    }
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Nurse Patient Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              {isSignedIn && !isNurse && (
                <>
                  <Nav.Link as={Link} to="/entervitalsaspatient">
                    Enter Vitals
                  </Nav.Link>
                  <Nav.Link as={Link} to="/checksymptoms">
                    Check Symptoms
                  </Nav.Link>
                  <Nav.Link as={Link} to="/game">Game</Nav.Link>
                </>
              )}

              {/* <Nav.Link as={Link} to="/liststudents">
                List of Students
              </Nav.Link>
              <Nav.Link as={Link} to="/listcourses">
                List of Courses
              </Nav.Link>
              <Nav.Link as={Link} to="/addcourse">
                Add Course
              </Nav.Link> */}
              {/* <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link> */}
              {isSignedIn && isNurse && (
                <>
                  <Nav.Link as={Link} to="/listusers">
                    List Users
                  </Nav.Link>
                </>
              )}
              {!isSignedIn && (
                <>
                  <Nav.Link as={Link} to="/signin">
                    Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="appContainer">
        <Routes>
          <Route
            index
            element={
              <SignIn
                isSignedIn={isSignedIn}
                isNurse={isNurse}
                handleSignIn={handleSignIn}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                isSignedIn={isSignedIn}
                isNurse={isNurse}
                handleSignIn={handleSignIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                isSignedIn={isSignedIn}
                isNurse={isNurse}
                handleSignIn={handleSignUp}
              />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/entervitalsaspatient" element={<PrivateRoute />}>
            <Route path="/entervitalsaspatient" element={<EnterVitalSigns />} />
          </Route>
          <Route path="/checksymptoms" element={<CheckCommonSymptoms />} />
          {/* <Route path="/liststudents" element={<PrivateRoute />}>
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
          </Route> */}
          <Route path="/entervitalsigns/:id" element={<EnterVitalSigns />} />

          <Route path="/showvitalsigns/:id" element={<ShowVitalSigns />} />
          <Route path="/listusers" element={<ListUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
