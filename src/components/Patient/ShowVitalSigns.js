import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_VITAL_SIGNS } from "../../graphql/queries";

import Table from "react-bootstrap/Table";

const ShowVitalSigns = () => {
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
          {data.patientVitalsAsNurse.map((vitals) => (
            <tr key={vitals._id}>
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

export { ShowVitalSigns };
