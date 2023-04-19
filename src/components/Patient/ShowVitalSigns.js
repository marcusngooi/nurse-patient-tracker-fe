// COMP308-402 Group Project
// Authors:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes
//              Grant Macmillan
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Show the list of the vital signs

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

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

const ShowVitalSigns = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_VITAL_SIGNS, {
    variables: { id: id },
  });

  

  if (loading) return <h1>Loading Patient Vital Signs...</h1>;
  if (error) return <h1>Error:</h1>;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Heart Rate</th>
            <th>Blood Pressure</th>
            <th>Weight</th>
            <th>Temperature</th>
            <th>Respiratory Rate</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.patientVitalsAsNurse.map((vitals, index) => (
            <tr key={index}>
              <td>{vitals._id}</td>
              <td>{vitals.heartRate}</td>
              <td>{vitals.bloodPpressure}</td>
              <td>{vitals.weight}</td>
              <td>{vitals.bodyTemperature}</td>
              <td>{vitals.respiratoryRate}</td>
              <td>{vitals.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="center">
        <button className="center" onClick={() => refetch()}>
          Refetch
        </button>
      </div>
    </div>
  );
};

export default ShowVitalSigns;
