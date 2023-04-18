import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

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
        <div>
            <h1>Create Tip</h1>
            <form onSubmit={handleSubmit}>
                <label>Message:
                <input type="text" value={message} onChange={(event) => setMessage(event.target.value)}/>
                </label>
                <button type="submit">Create Motivational Tip</button>
                
            </form>
        </div>
    );
}

export default CreateMotivationalTip;