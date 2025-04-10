import React from "react";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { CHECK_SYMPTOMS } from "../../graphql/mutations";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CheckSymptoms = () => {
  let navigate = useNavigate();
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
  const [checkSymptoms, { loading, error }] = useMutation(CHECK_SYMPTOMS);

  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h1>{`Submission error! ${error.message}`}</h1>;

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
