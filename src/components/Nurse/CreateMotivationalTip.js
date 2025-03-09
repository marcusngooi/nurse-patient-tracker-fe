import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import { Container, Form, Button } from "react-bootstrap";

const ADD_TIP = gql`
  mutation AddTip($message: String!) {
    addTip(message: $message) {
      _id
      message
    }
  }
`;

const CreateMotivationalTip = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [addTip, { error }] = useMutation(ADD_TIP);

  if (error) return <h1>{`Submission Error! ${error.message}`}</h1>;

  const handleSubmit = (event) => {
    event.preventDefault();
    addTip({ variables: { message: message } });
    setMessage("");
    alert("You have submitted this movitational tip: " + message);
    navigate("/home");
  };

  return (
    <Container>
      <h1>Create Tip</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMessage">
          <Form.Label>Message:</Form.Label>
          <Form.Control
            required
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Motivational Tip
        </Button>
      </Form>
    </Container>
  );
};

export default CreateMotivationalTip;
