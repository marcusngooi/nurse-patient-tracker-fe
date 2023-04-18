import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Container, Form, Button } from 'react-bootstrap';

const ADD_TIP = gql`
  mutation AddTip($message: String!) {
    addTip(message: $message) {
      _id
      message
    }
  }
`;


function CreateMotivationalTip() {
    const [message, setMessage] = useState('');

    const [addTip, {data, error}] = useMutation(ADD_TIP);

    if (error) return `Submission Error! ${error.message}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        addTip({ variables: {message: message} })
        setMessage('');
    };

    return (
      <Container>
        <h1>Create Tip</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formMessage">
            <Form.Label>Message:</Form.Label>
            <Form.Control type="text" value={message} onChange={(event) => setMessage(event.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">Create Motivational Tip</Button>
        </Form>
      </Container>
    );
  }

export default CreateMotivationalTip;