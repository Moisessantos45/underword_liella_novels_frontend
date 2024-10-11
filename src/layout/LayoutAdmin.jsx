import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import "../css/LoyoutAdmin.css";
import Slider from "../components/Slider";
import supabase from "../config/supabase";

const LayoutAdmin = () => {
  const { cargando } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login-admin");
      }
    });
  }, []);

  useEffect(() => {
    document.title = "Panel de administracion";
  }, []);

  if (cargando) return <Loading />;
  return (
    <>
      <Slider />

      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default LayoutAdmin;
