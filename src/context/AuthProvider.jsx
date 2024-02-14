import { useState, useEffect, createContext } from "react";
import Loading from "../components/Loading";
import urlAxios from "../config/urlAxios";
import useAdmin from "../hooks/useAdmin";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setAuth] = useState({});
  const [userCont, setCont] = useState(0);
  const [ultimosCapitulo, setEndChapters] = useState([]);
  const [ultimosCards, setEndCards] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [userType, setUserType] = useState("");
  const [webIlustraciones, setWebIlustraciones] = useState([]);
  const [count, setCount] = useState(600);
  const [visitas_actuales, setVisitas] = useState(0);

  useEffect(() => {
    const autenticar = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return <redirect to="/login-admin" />;
      }
      const confi = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { token },
      };
      try {
        const { data } = await urlAxios(
          `/underwordliellanovels/panel-administracion`,
          confi
        );
        setUserType(data.usuario.tipo);
        setAuth(data.usuario);
        setCont(data.totalUsuarios);
        setEndChapters(data.ultimosCapitulos);
        setEndCards(data.ultimasCards);
        setVisitas(data.visistas_actuales);
        // localStorage.setItem("horaInicio", Date.now());
      } catch (error) {
        setAuth({});
        localStorage.removeItem("token");
      }
      setCargando(false);
    };
    autenticar();
  }, []);
 
  if (cargando) return <Loading />;
  return (
    <AuthContext.Provider
      value={{
        userAuth,
        setAuth,
        cargando,
        userType,
        webIlustraciones,
        userCont,
        ultimosCapitulo,
        ultimosCards,
        count,
        setCargando,
        visitas_actuales,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
