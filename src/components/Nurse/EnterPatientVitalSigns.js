// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Enter Patient Vital Signs

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

const ENTER_PATIENT_VITAL_SIGNS = gql`
  mutation AddVitalAsNurse(
    $id: String!
    $weight: Float!
    $bodyTemperature: Float!
    $heartRate: Int!
    $bloodPressure: Int!
    $respiratoryRate: Float!
  ) {
    addVitalAsNurse(
      id: $id
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

//function component to add vital signs
const EnterVitals = (props) => {
  const { id } = useParams();
  // let navigate = useNavigate();

  let weight, bodyTemperature, heartRate, bloodPressure, respiratoryRate;

  const [enterVitals, { data, loading, error }] =
    useMutation(ENTER_PATIENT_VITAL_SIGNS);

  if (loading) return "Submiting..";
  if (error) return `Submission error! ${error.message}`;

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

          // navigate("/entervitalsigns/" + id);
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

export default EnterVitals;
