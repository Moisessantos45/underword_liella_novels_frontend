import ModalTime from "./ModalTime";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import SesionLogout from "./SesionLogout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TimeSession = () => {
  const { setCount, userAuth, setAuth } = useAuth();
  const { modalTime, setModalTime } = useAdmin();
  const navigate = useNavigate();

  let intervalId = setInterval(async () => {
    let horaInicio = localStorage.getItem("horaInicio");
    if (!horaInicio) {
      clearInterval(intervalId);
      await SesionLogout(userAuth.email);
      localStorage.removeItem("token");
      localStorage.removeItem("horaInicio");
      setAuth({});
      <redirect to="/login-admin" />;
      // navigate("/login-admin");
      return;
    }
    let tiempoTranscurrido = Date.now() - horaInicio;
    setCount(900 - Math.floor(tiempoTranscurrido / 1000));
    if (tiempoTranscurrido > 900000) {
      setModalTime(true);
      clearInterval(intervalId);
      return;
    }
  }, 60);

  return <>{modalTime && <ModalTime />}</>;
};

export default TimeSession;
