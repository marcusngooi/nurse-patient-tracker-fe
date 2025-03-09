import React from "react";
import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ENTER_VITAL_SIGNS = gql`
  mutation AddVitalAsPatient(
    $weight: Float!
    $bodyTemperature: Float!
    $heartRate: Int!
    $bloodPressure: Int!
    $respiratoryRate: Float!
  ) {
    addVitalAsPatient(
      weight: $weight
      bodyTemperature: $bodyTemperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      respiratoryRate: $respiratoryRate
    ) {
      _id
      patient
      date
      weight
    }
  }
`;

const EnterVitals = () => {
  let navigate = useNavigate();
  let weight, bodyTemperature, heartRate, bloodPressure, respiratoryRate;

  const [enterVitals, { loading, error }] = useMutation(ENTER_VITAL_SIGNS);

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

          alert("Submitted the vital signs");
          navigate("/home");
        }}
      >
        <Form.Group>
          <Form.Label> Weight: </Form.Label>
          <Form.Control
            required
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
            required
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
            required
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
            required
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
            required
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

export default EnterVitals;
