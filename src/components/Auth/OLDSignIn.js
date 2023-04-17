// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//             Ikamjot Hundal (301147411)
// Description: Signing inSIGNED_IN_STUDENT.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      _id
    }
  }
`;

function SignIn() {
  let navigate = useNavigate();
  let email, password;
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn({
      variables: { email: email.value, password: password.value },
    });
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
              name="email"
              ref={(node) => {
                email = node;
              }}
              placeholder="Email:"
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
