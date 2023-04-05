// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
// Description: Signing up.
import React from "react";
import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

const SIGN_UP = gql`
  mutation SignUp(
    $studentNumber: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $phoneNumber: String!
    $program: String!
    $courses: [String!]
  ) {
    signUp(
      studentNumber: $studentNumber
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      program: $program
      courses: $courses
    ) {
      _id
      studentNumber
      email
    }
  }
`;

function SignUp() {
  let navigate = useNavigate();

  let studentNumber,
    email,
    password,
    firstName,
    lastName,
    address,
    city,
    phoneNumber,
    program,
    courses;
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signUp({
            variables: {
              studentNumber: studentNumber.value,
              email: email.value,
              password: password.value,
              firstName: firstName.value,
              lastName: lastName.value,
              address: address.value,
              city: city.value,
              phoneNumber: phoneNumber.value,
              program: program.value,
              courses: [], // hard coded for now
            },
          });
          studentNumber.value = "";
          email.value = "";
          password.value = "";
          firstName.value = "";
          lastName.value = "";
          address.value = "";
          city = "";
          phoneNumber = "";
          program = "";
          // courses = []
          navigate("/liststudents");
        }}
      >
        <Form.Group>
          <Form.Label> Student Number:</Form.Label>
          <Form.Control
            type="text"
            name="studentNumber"
            ref={(node) => {
              studentNumber = node;
            }}
            placeholder="Student Number:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Email:</Form.Label>
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
        <Form.Group>
          <Form.Label> First Name:</Form.Label>
          <Form.Control
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
            type="text"
            name="lastName"
            ref={(node) => {
              lastName = node;
            }}
            placeholder="Last Name:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Address:</Form.Label>
          <Form.Control
            type="text"
            name="address"
            ref={(node) => {
              address = node;
            }}
            placeholder="Address:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> City:</Form.Label>
          <Form.Control
            type="text"
            name="city"
            ref={(node) => {
              city = node;
            }}
            placeholder="City:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            ref={(node) => {
              phoneNumber = node;
            }}
            placeholder="Phone Number:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Program:</Form.Label>
          <Form.Control
            type="text"
            name="program"
            ref={(node) => {
              program = node;
            }}
            placeholder="Program:"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
