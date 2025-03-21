import React from "react";
import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const SIGN_UP = gql`
  mutation SignUp(
    $userName: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $userType: String!
    $vitals: [String!]
  ) {
    signUp(
      userName: $userName
      password: $password
      firstName: $firstName
      lastName: $lastName
      userType: $userType
      vitals: $vitals
    ) {
      _id
      userName
      userType
    }
  }
`;

const SignUp = (props) => {
  let navigate = useNavigate();

  let userName, firstName, lastName, password, userType;
  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const payload = await signUp({
            variables: {
              userName: userName.value,
              password: password.value,
              firstName: firstName.value,
              lastName: lastName.value,
              userType: userType.value,
              vitals: [],
              checklist: [],
            },
          });
          props.handleSignUp(payload);
          navigate("/home");
        }}
      >
        <Form.Group>
          <Form.Label> Username:</Form.Label>
          <Form.Control
            required
            type="text"
            name="user"
            ref={(node) => {
              userName = node;
            }}
            placeholder="Username:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Password:</Form.Label>
          <Form.Control
            required
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
            required
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
            required
            type="text"
            name="lastName"
            ref={(node) => {
              lastName = node;
            }}
            placeholder="Last Name:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> User Type:</Form.Label>
          <Form.Select
            name="userType"
            ref={(node) => {
              userType = node;
            }}
            placeholder="User Type:"
          >
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

SignUp.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
};

export default SignUp;
