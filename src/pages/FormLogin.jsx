import { useEffect, useState } from "react";
import "../css/styleForm.css";
import urlAxios from "../config/urlAxios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { login } from "../firebase/ConfigFirebase";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const toastify = (text, type) => {
  Toastify({
    text: `${text}`,
    duration: 3000,
    newWindow: true,
    // close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: type
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      borderRadius: "10px",
    },
  }).showToast();
};

const FormLogin = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [email, setEmail] = useState("");
  const { userAuth, cargando, setAuth } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth?.activo) {
      navigate("/dashboard");
    }
  }, [userAuth, navigate]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if ([password, email].includes("")) {
      toastify("Campos vacios", false);
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      toastify("Correo invalido", false);
      toastify("Direccion valida @gmail.com", false);
      return;
    }
    try {
      const { data } = await urlAxios.post("/underwordliellanovels/login", {
        email,
        password,
      });
      console.log(data);
      setAuth(data);
      localStorage.setItem("token", data.token);
      toastify("Inicio exitoso", true);
      navigate("/dashboard");
    } catch (error) {
      toastify(error.response.data.msg, false);
      setError(error.response.data.msg);
      console.log(error);
    }
  };

  if (cargando) return <Loading />;

  return (
    <div className="container-from">
      {error && (
        <span className=" bg-red-600 flex w-11/12 items-center justify-center m-auto text-white font-bold text-sm rounded-md h-8">
          {error}
        </span>
      )}
      <div className="heading">Sign In</div>
      <form onSubmit={handelSubmit} className="form">
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <span className="forgot-password">
          <a href="#">Forgot Password ?</a>
        </span>
        <input className="login-button" type="submit" defaultValue="Sign In" />
      </form>
    </div>
  );
};

export default FormLogin;
