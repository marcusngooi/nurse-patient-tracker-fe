// Group Project
// Author:      Marcus Ngooi (301147411)
//             Ikamjot Hundal (301147411)
// Description: Signing in user.

import React from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SIGN_IN = gql`
  mutation SignIn($userName: String!, $password: String!) {
    signIn(userName: $userName, password: $password) {
      _id
      userName
      userType
    }
  }
`;

function SignIn(props) {
  let navigate = useNavigate();
  let userName, password;
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await signIn({
      variables: { userName: userName.value, password: password.value },
    });
    props.handleSignIn(payload);
    navigate("/home");
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <div>
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
    </div>
  );
}
//
export default SignIn;
