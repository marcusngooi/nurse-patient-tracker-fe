import React from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";

const SIGN_IN = gql`
  mutation SignIn($userName: String!, $password: String!) {
    signIn(userName: $userName, password: $password) {
      _id
      userName
      userType
    }
  }
`;

const SignIn = (props) => {
  let navigate = useNavigate();
  let userName, password;
  const [signIn, { loading, error }] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await signIn({
      variables: { userName: userName.value, password: password.value },
    });
    props.handleSignIn(payload);
    navigate("/home");
  };

  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

  return (
    <div className="entryform">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> UserName:</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            ref={(node) => {
              userName = node;
            }}
            placeholder="User Name:"
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
        <Button size="lg" variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
    </div>
  );
};

SignIn.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};

export default SignIn;
