import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { IS_NURSE } from "../../graphql/queries";

const PatientRouteGuard = () => {
  const { loading, error, data } = useQuery(IS_NURSE);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return data.isNurse ? <Navigate to="/home" /> : <Outlet />;
};

export { PatientRouteGuard };
