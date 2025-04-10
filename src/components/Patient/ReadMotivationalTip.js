import React from "react";

import { useQuery } from "@apollo/client";
import { GET_TIPS } from "../../graphql/queries";

import { Container } from "react-bootstrap";

const ReadMotivationalTip = () => {
  const { loading, error, data } = useQuery(GET_TIPS);
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
