import { Outlet } from "react-router-dom";
import NabvarPrincipal from "../components/NabvarPrincipal";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Comentarios from "../components/Comentarios";

const LayoutInicio = () => {

  return (
    <>
      <NabvarPrincipal />
      <Outlet />
      <Comentarios/>
      <Footer/>
    </>
  );
};

export default LayoutInicio;
