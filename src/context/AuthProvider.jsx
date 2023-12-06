import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Loading from "../components/Loading";
import urlAxios from "../config/urlAxios";
import { redirect, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuth, setAuth] = useState({});
  const [userCont, setCont] = useState(0);
  const [ultimosCapitulo, setEndChapters] = useState([]);
  const [ultimosCards, setEndCards] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [userType, setUserType] = useState("");
  const [webIlustraciones, setWebIlustraciones] = useState([]);
  const storedCount = parseInt(localStorage.getItem("counter")) || 600;
  const [count, setCount] = useState(storedCount);
  const[visitas_actuales,setVisitas]=useState(0)
  // const location = useLocation();

  useEffect(() => {
    const autenticar = async () => {
      const token = localStorage.getItem("token");
      // console.log("token",token)
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
        // console.log(data);
        setAuth(data.usuario);
        setCont(data.totalUsuarios);
        // setWebIlustraciones(data.ilusNovelas);
        setEndChapters(data.ultimosCapitulos);
        setEndCards(data.ultimasCards);
        setVisitas(data.visistas_actuales)
      } catch (error) {
        setAuth({});
        localStorage.removeItem("token");
        console.log(error);
      }
      setCargando(false);
    };
    autenticar();
  }, []);
  // console.log(userCont);
  // useEffect(() => {
  //   const currentPathname = window.location.pathname;

  //   if (count > 0 && currentPathname.startsWith("/dashboard")) {
  //     const timer = setTimeout(() => {
  //       const shouldReset = window.confirm("¿Desea reiniciar el contador?");

  //       if (shouldReset) {
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("counter");
  //         setCount(0);
  //         window.location.reload();
  //       } else {
  //         console.log("Contador no reiniciado");
  //       }
  //     }, count * 1000);

  //     // Actualizar el valor en localStorage cada vez que el contador cambie
  //     localStorage.setItem("counter", count.toString());

  //     return () => clearTimeout(timer);
  //   }
  // }, [count]);
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
        visitas_actuales
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
