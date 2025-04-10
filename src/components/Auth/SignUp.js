import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../graphql/mutations";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const SignUp = () => {
  const auth = useAuth();
  const [input, setInput] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    userType: "",
  });
  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signUp({
      variables: {
        username: input.username,
        password: input.password,
        firstName: input.firstName,
        lastName: input.lastName,
        userType: input.userType,
        vitals: [],
        checklist: [],
      },
    });
    if (res.data) {
      auth.signInAction({
        username: res.data.signUp.username,
        password: input.password,
      });
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Username:</Form.Label>
          <Form.Control
            required
            type="text"
            name="username"
            placeholder="Username:"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Password:</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Password:"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> First Name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="firstName"
            placeholder="First Name:"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Last Name:</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            placeholder="Last Name:"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> User Type:</Form.Label>
          <Form.Select
            name="userType"
            placeholder="User Type:"
            onChange={handleInput}
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
