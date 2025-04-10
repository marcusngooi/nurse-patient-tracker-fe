import { useAuth } from "../hooks/AuthProvider";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  const auth = useAuth();

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">NPT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Common */}
            {!auth?.isSignedIn && (
              <>
                <Nav.Link href="/signin" className="nav-link">
                  Sign In
                </Nav.Link>
                <Nav.Link href="/signup" className="nav-link">
                  Sign Up
                </Nav.Link>
              </>
            )}
            {auth?.isSignedIn && (
              <>
                <Nav.Link href="/home" className="nav-link">
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={auth.signOutAction}
                  className="nav-link"
                  href="#"
                >
                  Sign Out
                </Nav.Link>
              </>
            )}
            {/* Patient */}
            {auth?.user?.userType === "patient" && (
              <>
                <Nav.Link href="/sendemergencyalert" className="nav-link">
                  Send Emergency Alert
                </Nav.Link>
                <Nav.Link href="/entervitals" className="nav-link">
                  Enter Vitals
                </Nav.Link>
                <Nav.Link href="/showvitals" className="nav-link">
                  Show Vitals
                </Nav.Link>
                <Nav.Link href="/checksymptoms" className="nav-link">
                  Check Symptoms
                </Nav.Link>
                <Nav.Link href="/readmotivationaltip" className="nav-link">
                  Read Motivational Tip
                </Nav.Link>
              </>
            )}
            {/* Nurse */}
            {auth?.user?.userType === "nurse" && (
              <>
                <Nav.Link href="/entervitals/:id" className="nav-link">
                  Enter Vitals
                </Nav.Link>
                <Nav.Link href="/listpatients" className="nav-link">
                  List Patients
                </Nav.Link>
                <Nav.Link href="/hepatitischeckform" className="nav-link">
                  Hepatitis Check Form
                </Nav.Link>
                <Nav.Link href="/hepatitischeckresults" className="nav-link">
                  Hepatitis Check Results
                </Nav.Link>
                <Nav.Link href="/createmotivationaltip" className="nav-link">
                  Create Motivational Tip
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
