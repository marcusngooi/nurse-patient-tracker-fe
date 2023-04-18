// COMP308-402 Group Project
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Home Page
import React from 'react';

function Home(props)
{
    return (
        <div>
            <h2>COMP308-402: Emerging Technologies</h2>
            <h2>Group Project</h2>
            <h4>Developing Apps Using Emerging Web Technologies</h4>
            <p>This MERN full-stack and GraphQL application allows users to login and register as a nurse or a patient.
                 Nurses can enter vital signs, send daily motivational tips, and generate a list of possible medical conditions based on the symptoms entered by the patient.
                    Patients can enter their symptoms, and access a fitness game page, and send an emergency alert to first responders.
            </p>
            <br />
            <br />
            <p>This application was created by: Marcus Ngooi, Ikamjot Hundal, Ben Coombes, Grant Macmillan, Tatsiana Ptushko and Gabriel Dias Tinoco </p>
        </div>
    );
}

export default Home;