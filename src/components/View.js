// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: View component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";

import AddCourse from "./Course/AddCourse";
import ListCourses from "./Course/ListCourses";

function View(props) {
  let navigate = useNavigate();
  // read the info from props, coming from the ancestor component
  const { screen, setScreen, userType } = props;
  // return a stateful value and funcion to update it
  const [courseOperation, setCourseOperation] = useState("no-op");

  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };

  const addStudent = async () => {
    navigate("/addstudent");
  };

  return (
    <div className="App">
      {(() => {
        switch (courseOperation) {
          case "list":
            return <ListCourses />;
          case "add":
            return <AddCourse screen={screen} setScreen={setScreen} />;

          default:
            return (
              <div>
                <h1>Welcome, {screen}</h1>
                <Button style={{margin: ".1rem"}} onClick={() => setCourseOperation("add")}>
                  Add Course
                </Button>
                <Button style={{margin: ".1rem"}} onClick={() => setCourseOperation("list")}>
                  List Courses
                </Button>
                {userType === "Admin" && (
                  <Button style={{margin: ".1rem"}} onClick={addStudent}>Add Student</Button>
                )}
                <Button style={{margin: ".1rem"}} onClick={deleteCookie}>Log out</Button>
              </div>
            );
        }
      })()}
    </div>
  );
}

export default View;
