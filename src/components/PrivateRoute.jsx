import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth/auth";

const PrivateRoute = () => {

  const userIsLoggedIn = isLoggedIn();


  if(userIsLoggedIn === null) {
    return <div>Loading...</div>;
  } else if (userIsLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
