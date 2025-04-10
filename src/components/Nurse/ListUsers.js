import React from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { GET_PATIENTS } from "../../graphql/queries";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ListUsers = () => {
  let navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_PATIENTS);

  const showVitalSigns = (id) => {
    navigate("/showvitalsigns/" + id);
  };

  const enterVitalSigns = (id) => {
    navigate("/entervitalsigns/" + id);
  };

  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1> Error : {error}</h1>;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>User Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Patient's Vital Signs</th>
            <th>Enter Vital Signs</th>
          </tr>
        </thead>
        <tbody>
          {data.patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient._id}</td>
              <td>{patient.userName}</td>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    showVitalSigns(patient._id);
                  }}
                >
                  Vital Signs
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    enterVitalSigns(patient._id);
                  }}
                >
                  Enter Vital Signs
                </Button>
              </td>
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

export default ListUsers;
