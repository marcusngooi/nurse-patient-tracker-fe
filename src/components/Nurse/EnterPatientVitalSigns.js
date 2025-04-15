import React from "react";
import { useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ENTER_PATIENT_VITAL_SIGNS } from "../../graphql/mutations";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EnterVitals = () => {
  const { id } = useParams();
  let weight, bodyTemperature, heartRate, bloodPressure, respiratoryRate;

  const [enterVitals, { loading, error }] = useMutation(
    ENTER_PATIENT_VITAL_SIGNS,
  );

  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

  return (
    <div className="entryform">
      <h2>Enter your Vital Signs</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          enterVitals({
            variables: {
              id: id,
              weight: parseFloat(weight.value),
              bodyTemperature: parseFloat(bodyTemperature.value),
              heartRate: parseInt(heartRate.value),
              bloodPressure: parseInt(bloodPressure.value),
              respiratoryRate: parseFloat(respiratoryRate.value),
            },
          });
          weight.value = "";
          bodyTemperature.value = "";
          heartRate.value = "";
          bloodPressure.value = "";
          respiratoryRate.value = "";
        }}
      >
        <Form.Group>
          <Form.Label> Weight: </Form.Label>
          <Form.Control
            type="text"
            name="weight"
            ref={(node) => {
              weight = node;
            }}
            placeholder="Weight:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Body Temperature: </Form.Label>
          <Form.Control
            type="text"
            name="bodyTemperature"
            ref={(node) => {
              bodyTemperature = node;
            }}
            placeholder="Body Temperature:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Heart Rate: </Form.Label>
          <Form.Control
            type="text"
            name="heartRate"
            ref={(node) => {
              heartRate = node;
            }}
            placeholder="Heart Rate:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Blood Pressure: </Form.Label>
          <Form.Control
            type="text"
            name="Blood Pressure"
            ref={(node) => {
              bloodPressure = node;
            }}
            placeholder="Blood Pressure:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Respiratory Rate: </Form.Label>
          <Form.Control
            type="text"
            name="respiratoryRate"
            ref={(node) => {
              respiratoryRate = node;
            }}
            placeholder="Respiratory Rate:"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Enter
        </Button>
      </form>
    </div>
  );
};

export { EnterVitals };
