import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      _id
      username
      userType
    }
  } 
`;

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      success
      message
    }
  }
`;

const SIGN_UP = gql`
  mutation SignUp(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $userType: String!
    $vitals: [String!]
  ) {
    signUp(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      userType: $userType
      vitals: $vitals
    ) {
      _id
      username
      userType
    }
  }
`;

 const ADD_TIP = gql`
  mutation AddTip($message: String!) {
    addTip(message: $message) {
      _id
      message
    }
  }
`;

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

const ADD_ALERT = gql`
  mutation AddAlert($message: String!) {
    addAlert(message: $message) {
      _id
      message
      patient
    }
  }
`;

export { SIGN_IN, SIGN_OUT, SIGN_UP, ADD_TIP, ENTER_VITAL_SIGNS, CHECK_SYMPTOMS, ADD_ALERT };
