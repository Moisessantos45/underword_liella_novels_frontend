import { useState, useEffect, createContext } from "react";
import urlAxios from "../config/urlAxios.js";
import ApiUsers from "../config/ApiUsers.js";
import Loading from "../components/Loading";
import { obtenerConfig } from "../utils/Utils.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setAuth] = useState({});
  const [userCont, setCont] = useState(0);
  const [ultimosCapitulo, setEndChapters] = useState([]);
  const [ultimosCards, setEndCards] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [userType, setUserType] = useState("");
  const [count, setCount] = useState(0);
  const [visitas_actuales, setVisitas] = useState(0);
  const [dataActive, setDataActive] = useState(false);

  useEffect(() => {
    const autenticar = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        localStorage.removeItem("horaInicio");
        return <redirect to="/login-admin" />;
      }

      const confi = obtenerConfig();
        try {
        const [resUser, resSite] = await Promise.all([
          ApiUsers("/admin/panel-administracion", confi),
          urlAxios(`/admin/panel-administracion`, confi),
        ]);
         const dataUser = resUser.data;
        const dataSite = resSite.data;
        setUserType(dataUser.user.tipo);
        setAuth(dataUser.user);
        setCont(dataUser.totalUsers);
        setEndChapters(dataSite.ultimosCapitulos);
        setEndCards(dataSite.ultimasCards);
        setVisitas(dataSite.visistas_actuales);
      } catch (error) {
        setAuth({});
        localStorage.removeItem("token");
      }
      setCargando(false);
    };
    autenticar();
  }, [dataActive]);

  const extensSession = async () => {
    try {
      const { data } = await ApiUsers.patch(
        `/admin/extends-sesion?email=${userAuth.email}`
      );

      localStorage.setItem("token", data);
    } catch (error) {
      setAuth({});
      localStorage.removeItem("token");
    }
  };

  if (cargando) return <Loading />;
  return (
    <AuthContext.Provider
      value={{
        userAuth,
        setAuth,
        cargando,
        userType,
        userCont,
        ultimosCapitulo,
        ultimosCards,
        count,
        setCount,
        setCargando,
        visitas_actuales,
        setDataActive,
        extensSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
