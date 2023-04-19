// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Check common symptoms

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CHECK_SYMPTOMS = gql`
  mutation CheckSymptoms(
    $fever: Boolean!
    $cough: Boolean!
    $fatigue: Boolean!
    $breathing: Boolean!
    $bodyaches: Boolean!
    $headache: Boolean!
    $smell: Boolean!
    $sorethroat: Boolean!
    $runnynose: Boolean!
    $vomiting: Boolean!
    $diarrhea: Boolean!
  ) {
    checkSymptoms(
      fever: $fever
      cough: $cough
      fatigue: $fatigue
      breathing: $breathing
      bodyaches: $bodyaches
      headache: $headache
      smell: $smell
      sorethroat: $sorethroat
      runnynose: $runnynose
      vomiting: $vomiting
      diarrhea: $diarrhea
    ) {
      patientId
    }
  }
`;
const CheckSymptoms = (props) => {
  let navigate = useNavigate();
  //
  let fever,
    cough,
    fatique,
    breathing,
    bodyaches,
    headache,
    smell,
    sorethroat,
    runnynose,
    vomiting,
    diarrhea;
  const [checkSymptoms, { data, loading, error }] = useMutation(CHECK_SYMPTOMS);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <h1 className="text-center">Check Your Symptoms</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(fever.checked);
          checkSymptoms({
            variables: {
              fever: fever.checked,
              cough: cough.checked,
              fatigue: fatique.checked,
              breathing: breathing.checked,
              bodyaches: bodyaches.checked,
              headache: headache.checked,
              smell: smell.checked,
              sorethroat: sorethroat.checked,
              runnynose: runnynose.checked,
              vomiting: vomiting.checked,
              diarrhea: diarrhea.checked,
            },
          });

          fever.value = "";
          cough.value = "";
          fatique.value = "";
          breathing.value = "";
          bodyaches.value = "";
          headache.value = "";
          smell.value = "";
          sorethroat.value = "";
          runnynose.value = "";
          vomiting.value = "";
          diarrhea.value = "";
          navigate("/home");
        }}
      >
        <Form.Check
          name="flexCheck"
          value=""
          id="fever"
          ref={(node) => {
            fever = node;
          }}
          label="Fever or chills"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="cough"
          ref={(node) => {
            cough = node;
          }}
          label="Cough"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="breathing"
          ref={(node) => {
            breathing = node;
          }}
          label="Shortness of breath or difficulty breathing"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="fatigue"
          ref={(node) => {
            fatique = node;
          }}
          label="Fatigue"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="bodyaches"
          ref={(node) => {
            bodyaches = node;
          }}
          label="Muscle or body aches"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="headache"
          ref={(node) => {
            headache = node;
          }}
          label="Headache"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="smell"
          ref={(node) => {
            smell = node;
          }}
          label="New loss of taste or smell"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="sorethroat"
          ref={(node) => {
            sorethroat = node;
          }}
          label="Sore throat"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="runnynose"
          ref={(node) => {
            runnynose = node;
          }}
          label="Congestion or runny nose"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="vomiting"
          ref={(node) => {
            vomiting = node;
          }}
          label="Nausea or vomiting"
        />
        <Form.Check
          name="flexCheck"
          value=""
          id="diarrhea"
          ref={(node) => {
            diarrhea = node;
          }}
          label="Diarrhea"
        />
        <Button
          className="btn btn-primary btn-large centerButton"
          type="submit"
        >
          Send
        </Button>
      </Form>
    </div>
  );
};
export default CheckSymptoms;
