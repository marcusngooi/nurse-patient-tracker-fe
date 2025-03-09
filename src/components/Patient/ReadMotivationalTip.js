import React from "react";

import { gql, useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";

const GET_TIPS = gql`
  query GetTip {
    tip {
      _id
      message
    }
  }
`;

const ReadMotivationalTip = () => {
  const { loading, error, data } = useQuery(GET_TIPS);
  console.log(data);
  if (loading) return <h1>Loading..</h1>;
  if (error) return <h1>Error : {error}</h1>;

  return (
    <Container className="text-center">
      <h1>Your Motivational Tip is:</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <h3>{data.tip.message}</h3>
      </div>
    </Container>
  );
};

export default ReadMotivationalTip;
