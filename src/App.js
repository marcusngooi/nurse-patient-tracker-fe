import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "./components/Navbar";
import Home from "./components/Home";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import ListUsers from "./components/Nurse/ListUsers";
import ShowVitalSigns from "./components/Patient/ShowVitalSigns";
import EnterVitalSigns from "./components/Patient/EnterVitalSigns";
import CheckCommonSymptoms from "./components/Patient/CheckCommonSymptoms";
import HepatitisCheckForm from "./components/Nurse/HepatitisCheckForm";
import HepatitisCheckResults from "./components/Nurse/HepatitisCheckResults";
import SendAlert from "./components/Patient/SendAlert";
import CreateMotivationalTip from "./components/Nurse/CreateMotivationalTip";
import ReadMotivationalTip from "./components/Patient/ReadMotivationalTip";
import AuthProvider from "./hooks/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="appContainer">
      <Router>
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route
                path="/entervitalsaspatient"
                element={<EnterVitalSigns />}
              />
              <Route path="/checksymptoms" element={<CheckCommonSymptoms />} />
              <Route
                path="/entervitalsigns/:id"
                element={<EnterVitalSigns />}
              />
              <Route path="/showvitalsigns/:id" element={<ShowVitalSigns />} />
              <Route path="/listusers" element={<ListUsers />} />
              <Route
                path="/hepatitischeckform"
                element={<HepatitisCheckForm />}
              />
              <Route
                path="/hepatitischeckresults"
                element={<HepatitisCheckResults />}
              />
              <Route
                path="/createmotivationaltip"
                element={<CreateMotivationalTip />}
              />
              <Route path="/sendemergencyalert" element={<SendAlert />} />
              <Route
                path="/readmotivationaltip"
                element={<ReadMotivationalTip />}
              />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
