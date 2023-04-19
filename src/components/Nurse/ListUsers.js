// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Show a list of patients
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

// const GET_USERS = gql`
//   {
//     users {
//       _id
//       userName
//       firstName
//       lastName
//       user_type
//     }
//   }
// `;

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

const ListUsers = () => {
  let navigate = useNavigate();

  // const { loading, error, data, refetch } = useQuery(GET_USERS);
  const { loading, error, data, refetch } = useQuery(GET_PATIENTS);

  const showVitalSigns = (id) => {
    navigate("/showvitalsigns/" + id);
  };

  const enterVitalSigns = (id) => {
    navigate("/entervitalsigns/" + id);
  };

  if (loading) return <p>Loading..</p>;
  if (error) return <p> Error : {error}</p>;

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
          {data.patients.map((patient, index) => (
            <tr key={index}>
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
