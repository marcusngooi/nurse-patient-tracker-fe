// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Create Motivational Tips

import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const ADD_TIP = gql`
  mutation AddTip($message: String!) {
    addTip(message: $message) {
      _id
      message
    }
  }
`;


function CreateMotivationalTip() {
  let navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [addTip, {data, error}] = useMutation(ADD_TIP);

    if (error) return `Submission Error! ${error.message}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        addTip({ variables: {message: message} })
        setMessage('');
        alert("You have submitted this movitational tip: " + message);
        navigate("/home");

    };

    return (
      <Container>
        <h1>Create Tip</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMessage">
            <Form.Label>Message:</Form.Label>
            <Form.Control required type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">Create Motivational Tip</Button>
        </Form>
      </Container>
    );
  }

export default CreateMotivationalTip;