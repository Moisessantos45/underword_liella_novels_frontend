import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import ModalTime from "./ModalTime";
import { useEffect } from "react";

const TimeSession = () => {
  const { setCount, userAuth, setAuth } = useAuth();
  const { modalTime, setModalTime, SesionLogout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      let horaInicio = localStorage.getItem("horaInicio");

      if (!horaInicio) {
        clearInterval(intervalId);
        await SesionLogout(userAuth.email);
        localStorage.removeItem("token");
        localStorage.removeItem("horaInicio");
        setAuth({});
        navigate("/login-admin");
        return;
      }
      let tiempoTranscurrido = Date.now() - parseInt(horaInicio, 10);
      let tiempoRestante = 900 - Math.floor(tiempoTranscurrido / 1000);

      if (modalTime) {
        clearInterval(intervalId);
      }

      setCount(tiempoRestante);

      if (tiempoRestante <= 0) {
        setModalTime(true);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [
    setCount,
    userAuth,
    setAuth,
    setModalTime,
    SesionLogout,
    navigate,
    modalTime,
  ]);

  return <>{modalTime && <ModalTime />}</>;
};

export default TimeSession;
