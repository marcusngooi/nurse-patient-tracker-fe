// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Add a Course to the list.

import React from "react";
import { useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ADD_COURSE = gql`
  mutation AddCourse(
    $courseCode: String!
    $courseName: String!
    $section: String!
    $semester: String!
    $students: [String!]
  ) {
    addCourse(
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
      students: $students
    ) {
      _id
      courseCode
      courseName
    }
  }
`;

const AddCourse = (props) => {
  let navigate = useNavigate();
  const username = props.screen;

  let courseCode, courseName, section, semester;

  const [addCourse, { data, loading, error }] = useMutation(ADD_COURSE);

  if (loading) return "Submiting..";
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
      <h2> Add a Course, {username} </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCourse({
            variables: {
              courseCode: courseCode.value,
              courseName: courseName.value,
              section: section.value,
              semester: semester.value,
              students: [],
            },
          });
          courseCode.value = "";
          courseName.value = "";
          section.value = "";
          semester.value = "";
          navigate("/listcourses");
        }}
      >
        <Form.Group>
          <Form.Label> Course Code: </Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            ref={(node) => {
              courseCode = node;
            }}
            placeholder="Course Code:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Course Name: </Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            ref={(node) => {
              courseName = node;
            }}
            placeholder="Course Name:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Section: </Form.Label>
          <Form.Control
            type="text"
            name="section"
            ref={(node) => {
              section = node;
            }}
            placeholder="Section:"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label> Semester: </Form.Label>
          <Form.Control
            type="text"
            name="semester"
            ref={(node) => {
              semester = node;
            }}
            placeholder="Semester:"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Course
        </Button>
      </form>
    </div>
  );
};

export default AddCourse;
