import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_TIP = gql`
  mutation AddTip($message: String!, $patient: String!) {
    addTip(message: $message, patient: $patient) {
      _id
      message
      patient
    }
  }
`;


function CreateTip() {
    const [message, setMessage] = useState('');
    const [patient, setPatient] = useState('');

    const [addTip, {data, error}] = useMutation(ADD_TIP);

    if (error) return `Submission Error! ${error.message}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        addTip({ variables: {message, patient} })
        setMessage('');
    };

    return (
        <div>
            <h1>Create Tip</h1>
            <form onSubmit={handleSubmit}>
                <label>Message:
                <input type="text" value={message} onChange={(event) => setMessage(event.target.value)}/>
                </label>
                <label> Patient:
                  <input type="text" value={patient} onChange={(event) => setPatient(event.target.value)} ></input>

                </label>
                <button type="submit">Send Tip</button>
                
            </form>
        </div>
    );
}

export default CreateTip