// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Home Page
import React from 'react';

function Home(props)
{
    return (
        <div style={{textAlign: 'center', fontFamily: 'sans-serif'}}>
  <h1 style={{fontSize: '2.5em'}}>COMP308-402: Emerging Technologies Group Project</h1>
  <h2 style={{fontSize: '1.75em'}}>Developing Apps Using Emerging Web Technologies</h2>
  <br />
  <h3 style={{fontSize: '1.5em'}}>About the App</h3>
  <p style={{fontSize: '1.2em'}}>This MERN full-stack and GraphQL application allows users to login and register as a nurse or a patient. Nurses can enter vital signs, send daily motivational tips, and generate a list of possible medical conditions based on the symptoms entered by the patient. Patients can enter their symptoms, and access a fitness game page, and send an emergency alert to first responders.</p>
  <br />
  <br />
  <h3 style={{fontSize: '1.5em'}}>Developers</h3>
  <p style={{fontSize: '1.2em'}}>This application was created by:</p>
  <ul style={{listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: '600px'}}>
    <li style={{fontSize: '1.2em', marginBottom: '1em'}}>Marcus Ngooi</li>
    <li style={{fontSize: '1.2em', marginBottom: '1em'}}>Ikamjot Hundal</li>
    <li style={{fontSize: '1.2em', marginBottom: '1em'}}>Ben Coombes</li>
    <li style={{fontSize: '1.2em', marginBottom: '1em'}}>Grant Macmillan</li>
    <li style={{fontSize: '1.2em', marginBottom: '1em'}}>Tatsiana Ptushko</li>
    <li style={{fontSize: '1.2em', marginBottom: '1em'}}>Gabriel Dias Tinoco</li>
  </ul>
</div>
    );
}

export default Home;