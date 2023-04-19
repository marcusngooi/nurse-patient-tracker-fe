import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const ADD_ALERT = gql`
  mutation AddAlert($message: String!) {
    addAlert(message: $message) {
      _id
      message
      patient
    }
  }
`;

function SendAlert() {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [addAlert, { data, error }] = useMutation(ADD_ALERT);

  if (error) return `Submission Error ${error.message}`;

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
          <Form.Control type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Send Alert</Button>
      </Form>
    </Container>
  );
}

export default SendAlert;
