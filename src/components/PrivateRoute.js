import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

const IS_SIGNED_IN = gql`
  query IsSignedIn {
    isSignedIn
  }
`;

const PrivateRoute = () => {
  const { loading, error, data } = useQuery(IS_SIGNED_IN);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return data.isSignedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
