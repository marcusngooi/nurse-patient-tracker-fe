import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_ALERT } from "../../graphql/mutations";

import { Container, Form, Button } from "react-bootstrap";

const SendAlert = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [addAlert, { error }] = useMutation(ADD_ALERT);

  if (error) return <h1>{`Submission Error ${error.message}`}</h1>;

  const handleSubmit = (event) => {
    event.preventDefault();
    addAlert({ variables: { message: message } });
    setMessage("");
    alert("The first Responders is onroute");
    navigate("/home");
  };

  return (
    <Container>
      <h1>Send Emergency Alert</h1>
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
          Send Alert
        </Button>
      </Form>
    </Container>
  );
};

export default SendAlert;
