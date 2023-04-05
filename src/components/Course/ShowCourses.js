// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Show the list of the courses

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { gql, useQuery, useMutation } from "@apollo/client";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const GET_STUDENT_COURSES = gql`
  query StudentCourses($id: String!) {
    studentCourses(id: $id) {
      _id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const DROP_COURSE = gql`
  mutation DropCourse($id: String!) {
    dropCourse(id: $id) {
      _id
    }
  }
`;

const ShowCourses = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const {
    loadingStudentCourses,
    errorStudentCourses,
    dataStudentCourses,
    refetch,
  } = useQuery(GET_STUDENT_COURSES, {
    variables: { id: id },
  });

  const [dropCourse, { dataDropCourse, loadingDropCourse, errorDropCourse }] =
    useMutation(DROP_COURSE);

  const editCourse = (id) => {
    navigate("/editcourse/" + id);
  };

  if (loadingStudentCourses) return <h1>Loading Student Courses...</h1>;
  if (errorStudentCourses) return <h1>Error: {errorStudentCourses}</h1>
  if (loadingDropCourse) return <h1>Loading Drop Course...</h1>
  if (errorDropCourse) return <h1>Error: {errorDropCourse}</h1>

  return (
    <div>
      <Table>
        <tbody>
          <tr>
            <th>Unique ID</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Section</th>
            <th>Semester</th>
            <th>Edit Course</th>
            <th>Drop Course</th>
          </tr>
          {dataStudentCourses?.studentCourses.map((course, index) => (
            <tr key={index}>
              <td>{course._id}</td>
              <td>{course.courseCode}</td>
              <td>{course.courseName}</td>
              <td>{course.section}</td>
              <td>{course.semester}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    editCourse(course._id);
                  }}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    dropCourse({ variables: { id: course._id } });
                    refetch();
                  }}
                >
                  Drop
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

export default ShowCourses;
