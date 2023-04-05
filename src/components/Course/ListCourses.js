// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Show the list of the courses
import React from "react";
import { gql, useQuery } from "@apollo/client";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router-dom";

const GET_COURSES = gql`
  {
    courses {
      _id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const ListCourses = () => {
  let navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_COURSES);

  const showStudents = (id) => {
    navigate("/showstudents/" + id);
  };

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <th>Unique ID</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Show Enrolled Students</th>
          </tr>
          {data.courses.map((course, index) => (
            <tr key={index}>
              <td>{course._id}</td>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    showStudents(course._id);
                  }}
                >
                  Enrolled Students
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

export default ListCourses;
