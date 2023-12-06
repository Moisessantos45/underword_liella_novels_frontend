import { useEffect, useState } from "react";
import "../css/slider.css";
import useAdmin from "../hooks/useAdmin"
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import urlAxios from "../config/urlAxios";
import Loading from "./Loading";

const Slider = () => {
  const { active, setActive, activeDark, setDark } = useAdmin();
  const { userType, userAuth, setAuth, cargando } = useAuth();
  // const [activeDark,setDark]=useState(false)
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = [
    {
      text: "Inicio",
      icon: "fas fa-border-all",
      url: "/dashboard",
      tipo: "user",
    },
    {
      text: "Agregar usuario",
      icon: "fa-solid fa-user-plus",
      url: "agregar-user",
      tipo: "administrador",
    },
    {
      text: "Agregar Novela",
      icon: "fa-solid fa-cloud-arrow-up",
      url: "agregar-novela",
      tipo: "user",
    },
    {
      text: "Agregar volumen",
      icon: "fa-solid fa-cloud-arrow-up",
      url: "agregar-volumen",
      tipo: "user",
    },
    {
      text: "Agregar capitulo",
      icon: "fa-solid fa-cloud-arrow-up",
      url: "agregar-capitulo",
      tipo: "user",
    },
    {
      text: "Gestionar novelas",
      icon: "fa-solid fa-rotate",
      url: "actulizar-novelas",
      tipo: "user",
    },
    {
      text: "Gestionar Volumenes",
      icon: "fa-solid fa-rotate",
      url: "volumenes-activos",
      tipo: "user",
    },
    {
      text: "Gestionar Capitulos",
      icon: "fa-solid fa-rotate",
      url: "capitulos-activos",
      tipo: "user",
    },
    {
      text: "Upload  Ilustraciones",
      icon: "fa-solid fa-file-image",
      url: "subir_imagenes",
      tipo: "user",
    },
    // {
    //   text: "Gestionar Ilustraciones",
    //   icon: "fa-solid fa-images",
    //   url: "Ilustraciones_web",
    //   tipo: "user",
    // },
    { text: "Team", icon: "fas fa-people-group", tipo: "administrador",url: "colaboradores" },
  ];
  useEffect(() => {
    document.title = "Panel de administracion";
  }, []);
  useEffect(() => {
    if (!userAuth?.activo) {
      console.log(userAuth.activo);
      navigate("/login-admin");
    }
  }, [userAuth, navigate]);

  const handelClick = async () => {
    const email=userAuth.email
    // await setEmail(userAuth.email);
    try {
      await urlAxios.post("/underwordliellanovels/logout", {
        email,
      });
      console.log("funciona");
      localStorage.removeItem("token");
      setAuth({});
      navigate("/login-admin");
    } catch (error) {
      console.log(error);
    }
  };
  if (cargando) return <Loading />;
  return (
    <>
      <section
        className={`sidebar bg-stone-50 ${!active ? "hide" : ""} ${
          activeDark ? "dark" : ""
        }`}
      >
        <a href="#" className="logo">
          <i className="fab fa-slack"></i>
          <span className="text">Admin Panel</span>
        </a>

        <ul className="side-menu top">
          {menuItems.map(
            (item, index) =>
              (item.tipo === "user" || userType === "administrador") && (
                <li
                  key={index}
                  className={index === activeIndex ? "actives" : ""}
                >
                  <NavLink
                    to={item.url}
                    className="nav-link"
                    onClick={() => setActiveIndex(index)}
                  >
                    <i className={item.icon}></i>
                    <span className="text text-slate-600">{item.text}</span>
                  </NavLink>
                </li>
              )
          )}
        </ul>

        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="fas fa-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <button onClick={handelClick} className="logout cursor-pointer">
              <i className="fas fa-right-from-bracket"></i>
              <span className="text">Logout</span>
            </button>
          </li>
        </ul>
      </section>
      {/* <Content_list/> */}
    </>
  );
};

export default Slider;
