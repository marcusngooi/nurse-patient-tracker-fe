import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/AuthProvider";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const SignIn = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInAction } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signInAction(input.username, input.password);

    if (res.success) {
      navigate("/home");
    } else {
      setError(res.message || "Sign in failed");
    }

    setLoading(false);
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
      <h1>Sign In</h1>
      {error && <p className="error">{error}</p>}
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
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </Form>
    </div>
  );
};

SignIn.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
};

export { SignIn };
