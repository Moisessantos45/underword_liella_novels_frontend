import { useEffect, useState } from "react";
import "../css/styleForm.css";
import urlAxios from "../config/urlAxios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
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
  const [email, setEmail] = useState("");
  const { userAuth, cargando, setAuth, setCargando } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuth?.activo) {
      navigate(`/dashboard/${userAuth?.id}`);
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
      setAuth(data);
      localStorage.setItem("token", data.token);
      toastify("Inicio exitoso", true);
      setCargando(false);
      localStorage.setItem("horaInicio", Date.now());
      navigate(`/dashboard/${data?.id}`);
    } catch (error) {
      toastify(error.response.data.msg, false);
      setError(error.response.data.msg);
      setAuth({});
    }
    setCargando(false);
  };

  if (cargando) return <Loading />;

  return (
    <main className=" flex justify-center items-center main__content-form bg-white">
      <form
        className="relative space-y-1 sm:h-88 h-[60vh] rounded-md bg-white p-3 lg:p-10 margin sm:w-auto w-11/12"
        onSubmit={handelSubmit}
      >
        <p className="sm:text-xl text-3xl font-semibold lg:text-3xl gradient-text text-center">
          Inciar sesion
        </p>
        <p className="sm:text-xl text-3xl font-semibold lg:text-xl m-3 gradient-text text-center">
          Ingresa tu datos
        </p>
        <div className="">
          <label className=""> Email Address </label>
          <input
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-md text-gray-700 px-3 border border-slate-300 outline-none focus:ring"
          />
        </div>
        <div>
          <label className=""> Password </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-2 h-12 w-full rounded-md text-gray-700 px-3 border border-slate-300 outline-none focus:ring"
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 w-full rounded-md bg-gradient-to-r from-violet-700 to-fuchsia-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          >
            Sign In
          </button>
        </div>
      </form>
    </main>
  );
};

export default FormLogin;
