import { Outlet } from "react-router-dom";
import NabvarLogin from "../components/NabvarLogin";

import React, { Suspense } from "react";

const LayoutLogin = () => {
  return (
    <>
      <NabvarLogin />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default LayoutLogin;
