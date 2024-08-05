import { useEffect, useState } from "react";
import "../css/slider.css";
import useAdmin from "../hooks/useAdmin";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const Slider = () => {
  const { active, activeDark, SesionLogout } = useAdmin();
  const { userType, userAuth, setAuth, cargando } = useAuth();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPart = pathParts[pathParts.length - 1];
  const menuItems = [
    {
      text: "Inicio",
      icon: "fas fa-border-all",
      url: `/dashboard/${userAuth.idUser}`,
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
      text: "Gestionar Ilustraciones",
      icon: "fa-regular fa-images",
      url: "ilustraciones_activas",
      tipo: "user",
    },
    {
      text: "Upload Ilustraciones",
      icon: "fa-solid fa-file-image",
      url: "subir_imagenes",
      tipo: "user",
    },
    {
      text: "Upload File Mega",
      icon: "fas fa-file-upload",
      url: "subir_file_mega",
      tipo: "user",
    },
    {
      text: "Team",
      icon: "fas fa-people-group",
      tipo: "administrador",
      url: "colaboradores",
    },
  ];
  useEffect(() => {
    document.title = "Panel de administracion";
  }, []);
  useEffect(() => {
    if (!userAuth?.activo) {
      navigate("/login-admin");
    }
  }, [userAuth, navigate]);

  const handelClick = async () => {
    const email = userAuth.email;
    try {
      await SesionLogout(email);
      localStorage.removeItem("token");
      localStorage.removeItem("horaInicio");
      setAuth({});
      navigate("/login-admin");
    } catch (error) {
      return;
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
          <span className="text dark:text-white">Admin Panel</span>
        </a>

        <ul className="side-menu top">
          {menuItems.map(
            (item, index) =>
              (item.tipo === "user" || userType === "administrador") && (
                <li
                  key={index}
                  className={`${
                    (lastPart === `${userAuth.id}` && item.text === "Inicio") ||
                    (lastPart === item.url && item.text !== "Inicio")
                      ? "actives"
                      : ""
                  }`}
                >
                  <NavLink
                    to={item.url}
                    className="nav-link"
                    onClick={() => setActiveIndex(index)}
                  >
                    <i className={`${item.icon} dark:text-gray-400`}></i>
                    <span
                      className={`${
                        activeDark
                          ? "text-gray-400"
                          : index === activeIndex
                          ? "text-blue-500 font-bold"
                          : "text-gray-500"
                      } text-sm dark:text-gray-400`}
                    >
                      {item.text}
                    </span>
                  </NavLink>
                </li>
              )
          )}
        </ul>

        <ul className="side-menu">
          <li>
            <NavLink to="configuracion-sitio">
              <i className="fas fa-cog dark:text-gray-400"></i>
              <span className="text dark:text-white">Settings</span>
            </NavLink>
          </li>
          <li>
            <button onClick={handelClick} className="logout cursor-pointer">
              <i className="fas fa-right-from-bracket dark:text-gray-400"></i>
              <span className="text dark:text-white">Logout</span>
            </button>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Slider;
