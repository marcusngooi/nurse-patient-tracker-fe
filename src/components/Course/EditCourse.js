// Lab 3 Exercise 1
// Author:      Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Edit a Course
import React, { useState, useEffect } from "react";
import axios from "axios";
import {gql, useMutation} from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

const UPDATE_COURSE = gql`
mutation updateCourse(
    $courseCode: String!,
    $courseName: String!,
    $section: String!,
    $semester: String!,        
    ) {
    updateCourse(
        courseCode: $courseCode,
        courseName: $courseName,
        section: $section,
        semester: $semester,
        ) {
        _id
    }
}
`;


const EditCourse = (props) => {
  let navigate = useNavigate()

  let { id } = useParams();

  let courseCode, courseName, section, semester;
  const [updateCourse, {data, loading, error}] = useMutation(UPDATE_COURSE);

  if (loading) return 'Updating..';
  if (error) return `Submission Error ${error.message}`;

  return (
    <div className= 'entryform'>
      <form 
        onSubmit={e => {
          e.preventDefault();
          updateCourse({ variables: {courseCode: courseCode.value, courseName: courseName.value, section: section.value, semester: semester.value,}
          });
          courseCode.value ='';
          courseName.value ='';
          section.value = '';
          semester.value = '';
          navigate('/listcourses')
        }}>


          <Form.Group>
            <Form.Label> Course Code: </Form.Label>
            <Form.Control type="text" name="courseCode" ref={node => {courseCode = node;}}> </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label> Course Name: </Form.Label>
            <Form.Control type="text" name="courseName" ref={node => {courseName = node;}}> </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label> Section: </Form.Label>
            <Form.Control type="text" name="section" ref={node => {section = node;}}> </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label> Semester: </Form.Label>
            <Form.Control type="text" name="section" ref={node => {semester = node;}}> </Form.Control>
            </Form.Group>
        </form>
    </div>
  )
}

/*function EditCourse(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  const [course, setCourse] = useState({
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
  });
  const [showLoading, setShowLoading] = useState(true);
  const apiUrlShow = "http://localhost:3000/api/courses/show/" + id;
  const apiUrlEdit = "http://localhost:3000/api/courses/update/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrlShow);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      courseCode: course.courseCode,
      courseName: course.courseName,
      section: course.section,
      semester: course.semester,
    };

    axios
      .put(apiUrlEdit, data)
      .then((result) => {
        console.log("after calling put to update", result.data);
        setShowLoading(false);
        navigate("/showcourse/" + result.data.course._id);
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Edit Course</h1>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={updateCourse}>
        <Form.Group>
          <Form.Label> Course Code</Form.Label>
          <Form.Control
            type="text"
            name="courseCode"
            id="courseCode"
            placeholder="Enter course code"
            value={course.courseCode}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ marginTop: '.5rem' }}> Course Name</Form.Label>
          <Form.Control
            type="text"
            name="courseName"
            id="courseName"
            placeholder="Enter course name"
            value={course.courseName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ marginTop: '.5rem' }}> Section</Form.Label>
          <Form.Control
            type="text"
            name="section"
            id="section"
            placeholder="Enter section"
            value={course.section}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label style={{ marginTop: '.5rem' }}> Semester</Form.Label>
          <Form.Control
            type="text"
            name="semester"
            id="semester"
            placeholder="Enter semester"
            value={course.semester}
            onChange={onChange}
          />
        </Form.Group>
        <Button variant="primary" style={{ marginTop: '.5rem' }} type="submit">
          Update Course
        </Button>
      </Form>
    </div>
  );
} */

export default EditCourse;
