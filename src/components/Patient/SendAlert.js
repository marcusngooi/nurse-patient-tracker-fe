import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_ALERT = gql`
  mutation AddAlert(
    $message: String!, 
    $patient: String!
    ) {
    addAlert(
        message: $message, 
        patient: $patient
        ) {
      _id
      message
      patient
    }
  }
`;




function CreateAlert() {
    const [message, setMessage] = useState('');

    const [addAlert, {data, error}] = useMutation(ADD_ALERT);

    if (error) return `Submission Error ${error.message}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        addAlert({variables: {message}})
        setMessage('');
    };

    return (
        <div>
            <h1>Send Emergancy Alert</h1>
            <form onSubmit={handleSubmit}>
                <label>Message:
                    <input type="text" value={message} onChange={(event) => setMessage(event.target.value)}></input>
                </label>
                <button type="submit">Send Alert</button>
            </form>
        </div>
    );
}

export default CreateAlert