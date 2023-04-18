// Group Project
// Author(s):   Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Gather the user's inputs

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";

import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const HEPATITIS_STATUS = gql`
  query HepatitisStatus(
    $age: Int!
    $sex: Int!
    $steroid: Int!
    $antivirals: Int!
    $fatigue: Int!
    $malaise: Int!
    $anorexia: Int!
    $liverBig: Int!
    $liverFirm: Int!
    $spleenPalpable: Int!
    $spiders: Int!
    $ascites: Int!
    $varices: Int!
    $bilurubin: Float!
    $alkPhosphate: Int!
    $sGot: Int!
    $albumin: Float!
    $protime: Int!
    $histology: Int!
  ) {
    hepatitisStatus(
      age: $age
      sex: $sex
      steroid: $steroid
      antivirals: $antivirals
      fatigue: $fatigue
      malaise: $malaise
      anorexia: $anorexia
      liverBig: $liverBig
      liverFirm: $liverFirm
      spleenPalpable: $spleenPalpable
      spiders: $spiders
      ascites: $ascites
      varices: $varices
      bilurubin: $bilurubin
      alkPhosphate: $alkPhosphate
      sGot: $sGot
      albumin: $albumin
      protime: $protime
      histology: $histology
    )
  }
`;

const HepatitisCheckForm = () => {
  let navigate = useNavigate();

  let age,
    sex,
    steroid,
    antivirals,
    fatigue,
    malaise,
    anorexia,
    liverBig,
    liverFirm,
    spleenPalpable,
    spiders,
    ascites,
    varices,
    bilurubin,
    alkPhosphate,
    sGot,
    albumin,
    protime,
    histology;

  const [getHepatitisStatus, { loading, error, data }] =
    useLazyQuery(HEPATITIS_STATUS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getHepatitisStatus({
      variables: {
        age: age.value,
        sex: sex.value,
        steroid: steroid.value,
        antivirals: antivirals.value,
        fatigue: fatigue.value,
        malaise: malaise.value,
        anorexia: anorexia.value,
        liverBig: liverBig.value,
        liverFirm: liverFirm.value,
        spleenPalpable: spleenPalpable.value,
        spiders: spiders.value,
        ascites: ascites.value,
        varices: varices.value,
        bilurubin: bilurubin.value,
        alkPhosphate: alkPhosphate.value,
        sGot: sGot.value,
        albumin: albumin.value,
        protime: protime.value,
        histology: histology.value,
      },
    });
    console.log(response)
    navigate("/hepatitischeckresults", {
      state: {
        prediction: response.data,
      },
    });
  };

  return (
    <div className="container">
      <h1>Input Form</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type="number"
            name="age"
            ref={(node) => {
              age = node;
            }}
            placeholder="Age:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sex:</Form.Label>
          <Form.Select
            name="sex"
            ref={(node) => {
              sex = node;
            }}
            placeholder="Sex:"
          >
            <option value="1">Male</option>
            <option value="2">Female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Steroid:</Form.Label>
          <Form.Select
            name="steroid"
            ref={(node) => {
              steroid = node;
            }}
            placeholder="Steroid:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Antivirals:</Form.Label>
          <Form.Select
            name="antivirals"
            ref={(node) => {
              antivirals = node;
            }}
            placeholder="Antivirals:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Fatigue:</Form.Label>
          <Form.Select
            name="fatigue"
            ref={(node) => {
              fatigue = node;
            }}
            placeholder="Fatigue:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Malaise:</Form.Label>
          <Form.Select
            name="malaise"
            ref={(node) => {
              malaise = node;
            }}
            placeholder="Malaise:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Anorexia:</Form.Label>
          <Form.Select
            name="anorexia"
            ref={(node) => {
              anorexia = node;
            }}
            placeholder="Anorexia:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Enlarged Liver:</Form.Label>
          <Form.Select
            name="liverBig"
            ref={(node) => {
              liverBig = node;
            }}
            placeholder="Enlarged Liver:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Firm Liver:</Form.Label>
          <Form.Select
            name="liverFirm"
            ref={(node) => {
              liverFirm = node;
            }}
            placeholder="Firm Liver:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Palpable Spleen:</Form.Label>
          <Form.Select
            name="spleenPalpable"
            ref={(node) => {
              spleenPalpable = node;
            }}
            placeholder="Palpable Spleen:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Spider Angiomas:</Form.Label>
          <Form.Select
            name="spiders"
            ref={(node) => {
              spiders = node;
            }}
            placeholder="Spider Angiomas:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Ascites:</Form.Label>
          <Form.Select
            name="ascites"
            ref={(node) => {
              ascites = node;
            }}
            placeholder="Ascites:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Varices:</Form.Label>
          <Form.Select
            name="varices"
            ref={(node) => {
              varices = node;
            }}
            placeholder="Varices:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Bilurubin Level (mg/dL):</Form.Label>
          <Form.Control
            type="text"
            name="bilurubin"
            ref={(node) => {
              bilurubin = node;
            }}
            placeholder="Bilurubin Level:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Alkaline Phosphatase Level (U/L):</Form.Label>
          <Form.Control
            type="number"
            name="alkPhosphate"
            ref={(node) => {
              alkPhosphate = node;
            }}
            placeholder="Alkaline Phosphatase Level:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Serum Glutamic Oxaloacetic Transaminase Level (U/L):
          </Form.Label>
          <Form.Control
            type="number"
            name="sGot"
            ref={(node) => {
              sGot = node;
            }}
            placeholder="Serum Glutamic Oxaloacetic Transaminase Level:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Albumin Level (g/dL):</Form.Label>
          <Form.Control
            type="text"
            name="albumin"
            ref={(node) => {
              albumin = node;
            }}
            placeholder="Albumin Level:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Prothrombin Time (seconds):</Form.Label>
          <Form.Control
            type="number"
            name="protime"
            ref={(node) => {
              protime = node;
            }}
            placeholder="Prothrombin Time:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Liver Biopsy Performed Showing Histolic Changes of Chronic
            Hepatitis:
          </Form.Label>
          <Form.Select
            name="histology"
            ref={(node) => {
              histology = node;
            }}
            placeholder="Liver Biopsy Performed Showing Histolic Changes of Chronic Hepatitis:"
          >
            <option value="1">No</option>
            <option value="2">Yes</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Check Hepatitis Status
        </Button>
      </Form>
    </div>
  );
};

export default HepatitisCheckForm;
