// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
// Description: Read Motivation Tip from the patient side
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Container } from 'react-bootstrap';

const GET_TIPS = gql`
  query GetTip {
    tip {
      _id
      message
    }
  }
`;

const ReadMotivationalTip = () => {
  const { loading, error, data, refetch } = useQuery(GET_TIPS);
  console.log(data);
  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <Container className="text-center">
      <h1>Your Motivational Tip is:</h1>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '50vh'}}>
      <h3>{data.tip.message}</h3>
      </div>
      
    </Container>
  );
};

export default ReadMotivationalTip;
