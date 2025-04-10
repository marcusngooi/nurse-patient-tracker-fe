import { gql } from "@apollo/client";

const IS_SIGNED_IN = gql`
  query IsSignedIn {
    isSignedIn
  }
`;

 const IS_NURSE = gql`
  query IsNurse {
    isNurse
  }
`;


const GET_PATIENTS = gql`
  {
    patients {
      _id
      userName
      firstName
      lastName
    }
  }
`;

const HEPATITIS_STATUS = gql`
  query HepatitisStatus(
    $age: String!
    $sex: String!
    $steroid: String!
    $antivirals: String!
    $fatigue: String!
    $malaise: String!
    $anorexia: String!
    $liverBig: String!
    $liverFirm: String!
    $spleenPalpable: String!
    $spiders: String!
    $ascites: String!
    $varices: String!
    $bilurubin: String!
    $alkPhosphate: String!
    $sGot: String!
    $albumin: String!
    $protime: String!
    $histology: String!
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
    ) {
      resultsArray
    }
  }
`;

const GET_TIPS = gql`
  query GetTip {
    tip {
      _id
      message
    }
  }
`;

const GET_VITAL_SIGNS = gql`
  query PatientVitalsAsNurse($id: String!) {
    patientVitalsAsNurse(id: $id) {
      _id
      heartRate
      bloodPressure
      weight
      bodyTemperature
      respiratoryRate
      date
    }
  }
`;

export { IS_SIGNED_IN, GET_PATIENTS, HEPATITIS_STATUS, GET_TIPS, GET_VITAL_SIGNS, IS_NURSE };
