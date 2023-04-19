// COMP308-402 Group Project-Group-4
// Authors:     Marcus Ngooi (301147411)
//              Ikamjot Hundal (301134374)
//              Ben Coombes (301136902)
//              Grant Macmillan (301129935)
//              Gabriel Dias Tinoco
//              Tatsiana Ptushko (301182173)
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
