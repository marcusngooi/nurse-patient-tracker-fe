// Lab 4 Exercise 1
// Author(s):   Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
// Description: Shows the results of the user's inputs
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HepatitisCheckResults = () => {
  let location = useLocation();

  return (
    <div className="container">
      <h1>Prediction Results</h1>
      <h2>The values for Hepatitis status will be:</h2>
      <table>
        <thead>
          <tr>
            <th>Hepatitis Status</th>
            <th>Value 1</th>
            <th>Value 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Please see a doctor!</td>
            <td>1</td>
            <td>0</td>
          </tr>
          <tr>
            <td>You should still see a doctor, but the symptoms are not as concerning</td>
            <td>0</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      <h2>Prediction</h2>
      <table>
        <tbody>
          <tr>
            <td>Value 1:</td>
            <td>{location.state.prediction.hepatitisStatus.resultsArray[0]}</td>
          </tr>
          <tr>
            <td>Value 2:</td>
            <td>{location.state.prediction.hepatitisStatus.resultsArray[1]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HepatitisCheckResults;
