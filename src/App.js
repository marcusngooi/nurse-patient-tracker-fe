// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Setting up the routes
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "./App.css";

import Home from "./components/Home";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Game from "./components/Game";

import PrivateRoute from "./components/PrivateRoute";
import PatientRouteGuard from "./components/PatientRouteGuard";

import ListUsers from "./components/Nurse/ListUsers";
import ShowVitalSigns from "./components/Patient/ShowVitalSigns";
import EnterVitalSigns from "./components/Patient/EnterVitalSigns";
import CheckCommonSymptoms from "./components/Patient/CheckCommonSymptoms";
import HepatitisCheckForm from "./components/Nurse/HepatitisCheckForm";
import HepatitisCheckResults from "./components/Nurse/HepatitisCheckResults";
import SendAlert from "./components/Patient/SendAlert";
import CreateMotivationalTip from "./components/Nurse/CreateMotivationalTip";
import ReadMotivationalTip from "./components/Patient/ReadMotivationalTip";

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
                  <Nav.Link as={Link} to="/game">
                    Game
                  </Nav.Link>
                  <Nav.Link as={Link} to="/sendemergencyalert">
                    Send Emergency Alert
                  </Nav.Link>
                  <Nav.Link as={Link} to="/readmotivationaltip">
                    Read Motivational Tip
                  </Nav.Link>
                </>
              )}
              {isSignedIn && isNurse && (
                <>
                  <Nav.Link as={Link} to="/listusers">
                    List Users
                  </Nav.Link>
                  <Nav.Link as={Link} to="/hepatitischeckform">
                    Hepatitis Check
                  </Nav.Link>
                  <Nav.Link as={Link} to="/createmotivationaltip">
                    Create Motivational Tip
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
                handleSignUp={handleSignUp}
              />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/entervitalsaspatient" element={<EnterVitalSigns />} />
          <Route path="/checksymptoms" element={<CheckCommonSymptoms />} />
          <Route path="/entervitalsigns/:id" element={<EnterVitalSigns />} />
          <Route path="/showvitalsigns/:id" element={<ShowVitalSigns />} />
          <Route path="/listusers" element={<ListUsers />} />
          <Route path="/hepatitischeckform" element={<HepatitisCheckForm />} />
          <Route
            path="/hepatitischeckresults"
            element={<HepatitisCheckResults />}
          />
          <Route
            path="/createmotivationaltip"
            element={<CreateMotivationalTip />}
          />
          <Route path="/sendemergencyalert" element={<SendAlert />} />
          <Route
            path="/readmotivationaltip"
            element={<ReadMotivationalTip />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
