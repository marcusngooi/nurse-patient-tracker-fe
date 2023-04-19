// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Show AI Generated Results for Hepatitis Check
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Spinner, Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';

const HepatitisCheckResults = () => {
  let location = useLocation();

  return (
    <div className="container">
      <h1 style={{textAlign: 'center'}}>Prediction Results</h1>
  <h2 style={{textAlign: 'center'}}>The values for Hepatitis status will be:</h2>
  <Table className='mt-3 text-center' striped bordered hover variant="dark">
        <thead>
          <tr>
          <th width="33%">Hepatitis Status</th>
            <th width="33%">Value 1</th>
            <th width="33%">Value 2</th>
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
      </Table>
      <h2 style={{textAlign: 'center'}}>Prediction:</h2>
      <Table className='mt-3 text-center' striped bordered hover variant="dark">
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
      </Table>
    </div>
  );
};

export default HepatitisCheckResults;
