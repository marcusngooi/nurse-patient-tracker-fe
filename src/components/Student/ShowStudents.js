// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Show student's info
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { gql, useQuery, useMutation } from "@apollo/client";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";


const GET_STUDENT = gql`
  query Getstudent($id: String!) {
    getStudent(id: $id) {
      _id
      studentNumber
      firstName
      lastName
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: String!) {
    deleteStudent(id: $id) {
      _id
    }
  }
`;

const ShowStudent = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();

  const {
    loadingStudent,
    errorStudent,
    dataStudent,
    refetch,
  } = useQuery(GET_STUDENT, {
    variables: {id: id}
  });

  const [deleteStudent, {dataDeleteStudent, loadingDeleteStudent, errorDeleteStudent}] =
    useMutation(DELETE_STUDENT);

    const editStudent = (id) => {
      navigate("/editstudent/" + id);
    };

    if (loadingStudent || loadingDeleteStudent) return <p>Loading..</p>;

    if (errorDeleteStudent || errorStudent)
      return (
        <p>
          Error: {errorDeleteStudent}
          {errorStudent}
        </p>
      );

    return (
      <div>
        <Table>
          <tbody>
            <tr>
              <th>Student Number</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
            {dataStudent.studentCourses.map((student, index) => (
            <tr key={student.id || index}>
              <td>{student._id}</td>
              <td>{student.studentNumber}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    editStudent(student._id);
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteStudent({ variables: { id: student._id } });
                    refetch();
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
      );
};




/*const ShowStudent = (props) => {




}; */

/*function ShowStudent(props) {
  let { id } = useParams();

  const [data, setData] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/students/show/" + id;
  const apiUrlShowCourses = "http://localhost:3000/api/courses/list/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showCourses = () => {
    setShowLoading(true);
    const fetchCourseData = async () => {
      const result = await axios(apiUrlShowCourses);
      setCourseData(result.data);
      setShowLoading(false);
    };
    fetchCourseData();
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <h1>
        Name: {data.firstName} {data.lastName}
      </h1>
      <p>
        Student Number: {data.studentNumber}
        <br />
        Address: {data.address}
        <br />
        City: {data.city}
        <br />
        Phone Number: {data.phoneNumber}
        <br />
        Email: {data.email}
        <br />
        Program: {data.program}
        <br />
        Favorite Topic: {data.favoriteTopic}
        <br />
        Favorite Assignment: {data.favoriteAssignment}
      </p>
      <h3>Courses:</h3>
      <Button
        type="button"
        variant="info"
        onClick={() => {
          showCourses();
        }}
        style={{ marginBottom: ".5rem" }}
      >
        Show Courses
      </Button>
      {
        <ListGroup>
          {courseData &&
            courseData.map((item, idx) => (
              <ListGroup.Item key={idx}>
                {item.courseCode}: {item.courseName}
              </ListGroup.Item>
            ))}
        </ListGroup>
      }
    </div>
  );
} */

export default ShowStudent;
