import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import "../css/LoyoutAdmin.css";
import Slider from "../components/Slider";
import { Navigate } from "react-router-dom";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const { userAuth, setAuth, cargando } = useAuth();
  const [email, setEmail] = useState("");
  useEffect(() => {
    document.title = "Panel de administracion";
  }, []);
  // useEffect(() => {
  //   if (!userAuth?.activo) {
  //     console.log(userAuth.activo);
  //     navigate("/login-admin");
  //   }
  // }, [userAuth]);
  if (cargando) return <Loading />;
  return (
    <>
      <Slider />
      {userAuth?.id ? <Outlet /> : <Navigate to="/login-admin" />}
    </>
  );
};

export default LayoutAdmin;
