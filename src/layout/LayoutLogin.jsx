import { Outlet } from "react-router-dom";
import NabvarLogin from "../components/NabvarLogin";

import React from "react";

const LayoutLogin = () => {
  return (
    <>
      <NabvarLogin />
      <Outlet />
    </>
  );
};

export default LayoutLogin;
