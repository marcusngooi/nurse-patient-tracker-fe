import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

import Home from "./components/Home";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import Game from "./components/Game";
import ListUsers from "./components/Nurse/ListUsers";
import ShowVitalSigns from "./components/Patient/ShowVitalSigns";
import EnterVitalSigns from "./components/Patient/EnterVitalSigns";
import CheckCommonSymptoms from "./components/Patient/CheckCommonSymptoms";
import HepatitisCheckForm from "./components/Nurse/HepatitisCheckForm";
import HepatitisCheckResults from "./components/Nurse/HepatitisCheckResults";
import SendAlert from "./components/Patient/SendAlert";
import CreateMotivationalTip from "./components/Nurse/CreateMotivationalTip";
import ReadMotivationalTip from "./components/Patient/ReadMotivationalTip";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isNurse, setIsNurse] = useState(false);

  const signOut = useMutation(SIGN_OUT);

  useEffect(() => {
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

  const handleSignOut = () => {
    setIsSignedIn(false);
    Cookies.set("isSignedIn", "false");
    signOut();
  };

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
                  <Nav.Link as={Link} onClick={handleSignOut}>
                    Sign Out
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
                  <Nav.Link as={Link} onClick={handleSignOut}>
                    Sign Out
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
};

export default App;
