import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const SignIn = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      auth.signInAction(input);
      return;
    }
    alert("Please provide a valid username and password");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="entryform">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label> Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInput}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
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

export { SignIn };
