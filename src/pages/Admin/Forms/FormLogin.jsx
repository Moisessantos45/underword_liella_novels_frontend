import { useEffect, useState } from "react";
import "@/css/styleForm.css";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import useAuth from "@/hooks/useAuth";
import { toastify } from "@/utils/Utils.js";
import { errorHandle } from "@/Services/errorHandle.js";
import supabase from "@/config/supabase";

const FormLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { cargando, setAuth, setCargando, setDataActive } = useAuth();
  const navigate = useNavigate();

  const verifySession = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      setAuth(data.user);
      navigate(`/dashboard/${data?.user.id}`);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setAuth(data.user);
      localStorage.setItem("token", data.session.access_token);
      toastify("Inicio exitoso", true);
      localStorage.setItem("horaInicio", Date.now());
      setDataActive(true);
      navigate(`/dashboard/${data?.user.id}`);
      setCargando(false);
    } catch (error) {
      errorHandle(error);
      setAuth({});
    }
    setCargando(false);
  };

  if (cargando) return <Loading />;

  return (
    <main className="flex justify-center items-center main__content-form bg-white dark:bg-[#0c0c1e]">
      <form
        className="relative space-y-1 sm:h-88 h-[60vh] rounded-md bg-white dark:bg-[#0c0c1e] p-3 lg:p-10 margin sm:w-auto w-11/12"
        onSubmit={handelSubmit}
      >
        <p className="sm:text-xl text-4xl font-bold lg:text-3xl gradient-text text-center">
          Iniciar sesión
        </p>
        <p className="sm:text-xl text-2xl font-semibold lg:text-xl m-3 gradient-text text-center">
          Ingresa tus datos
        </p>
        <div className=" mt-7">
          <label className="text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-md text-gray-700 dark:text-gray-300 px-3 border border-slate-300 dark:border-slate-700 outline-none focus:ring"
          />
        </div>
        <div>
          <label className="text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-2 h-12 w-full rounded-md text-gray-700 dark:text-gray-300 px-3 border border-slate-300 dark:border-slate-700 outline-none focus:ring"
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
