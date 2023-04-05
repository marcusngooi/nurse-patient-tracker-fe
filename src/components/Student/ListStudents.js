// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Show the list of the students
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const GET_STUDENTS = gql`
  {
    students {
      _id
      studentNumber
      email
      firstName
      lastName
    }
  }
`;

const ListStudents = () => {
  let navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_STUDENTS);

  const showCourses = (id) => {
    navigate("/showcourses/" + id);
  };

  if (loading) return <p>Loading..</p>;
  if (error) return <p> Error : {error}</p>;

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <th>Unique ID</th>
            <th>Student Number</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Show Student's Courses</th>
          </tr>
          {data.students.map((student, index) => (
            <tr key={index}>
              <td>{student._id}</td>
              <td>{student.studentNumber}</td>
              <td>{student.email}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    showCourses(student._id);
                  }}
                >
                  Enrolled Courses
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

export default ListStudents;
