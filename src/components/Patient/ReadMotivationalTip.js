import React from "react";
import { gql, useQuery } from "@apollo/client";

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
    <div>
      <h2>Tips for Patient </h2>
      <p>{data.tip.message}</p>
    </div>
  );
};

export default ReadMotivationalTip;
