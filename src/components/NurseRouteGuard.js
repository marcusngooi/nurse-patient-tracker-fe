// Group Project
// Author:      Marcus Ngooi (301147411)
// Description: Setting up the Guard for the Nurse routes
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { gql, useQuery } from "@apollo/client";

const IS_NURSE = gql`
  query IsNurse {
    isNurse
  }
`;

const NurseRouteGuard = () => {
  const { loading, error, data } = useQuery(IS_NURSE);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return data.isNurse ? <Outlet /> : <Navigate to="/home" />;
};

export default NurseRouteGuard;
