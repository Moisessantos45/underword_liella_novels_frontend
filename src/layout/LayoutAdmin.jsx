import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import "../css/LoyoutAdmin.css";
import Slider from "../components/Slider";
import { Navigate } from "react-router-dom";

const LayoutAdmin = () => {
  const { userAuth, cargando } = useAuth();

  useEffect(() => {
    document.title = "Panel de administracion";
  }, []);

  if (cargando) return <Loading />;
  return (
    <>
      <Slider />
      {userAuth?.id ? (
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      ) : (
        <Navigate to="/login-admin" />
      )}
    </>
  );
};

export default LayoutAdmin;
