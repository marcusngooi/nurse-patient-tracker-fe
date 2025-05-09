import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Navigation,
  Home,
  SignUp,
  SignIn,
  Nurse,
  Patient,
  Routing,
} from "./components";
import AuthProvider from "./hooks/AuthProvider";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="appContainer">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Routing.PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/entervitals" element={<Patient.EnterVitals />} />
              <Route
                path="/checksymptoms"
                element={<Patient.CheckSymptoms />}
              />
              <Route
                path="/sendemergencyalert"
                element={<Patient.SendAlert />}
              />
              <Route
                path="/readmotivationaltip"
                element={<Patient.ReadMotivationalTip />}
              />
              <Route path="/showvitals" element={<Patient.ShowVitalSigns />} />
              <Route path="/entervitals/:id" element={<Nurse.EnterVitals />} />
              <Route path="/listusers" element={<Nurse.ListUsers />} />
              <Route
                path="/hepatitischeckform"
                element={<Nurse.HepatitisCheckForm />}
              />
              <Route
                path="/hepatitischeckresults"
                element={<Nurse.HepatitisCheckResults />}
              />
              <Route
                path="/createmotivationaltip"
                element={<Nurse.CreateMotivationalTip />}
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
