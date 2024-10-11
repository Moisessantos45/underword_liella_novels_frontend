import { useEffect, useState } from "react";
import "../css/slider.css";
import useAdmin from "../hooks/useAdmin";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";
import supabase from "../config/supabase";

import {
  Home,
  UserPlus,
  Upload,
  BookOpen,
  Layers,
  FileText,
  RefreshCw,
  Image,
  FileImage,
  Upload as UploadIcon,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const Slider = () => {
  const { active, activeDark } = useAdmin();
  const { userType, userAuth, setAuth, cargando } = useAuth();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPart = pathParts[pathParts.length - 1];

  const menuItems = [
    {
      text: "Inicio",
      icon: Home,
      url: `/dashboard/${userAuth.idUser}`,
      tipo: "user",
    },
    {
      text: "Agregar usuario",
      icon: UserPlus,
      url: "agregar-user",
      tipo: "administrador",
    },
    {
      text: "Agregar Novela",
      icon: BookOpen,
      url: "agregar-novela",
      tipo: "user",
    },
    {
      text: "Agregar volumen",
      icon: Layers,
      url: "agregar-volumen",
      tipo: "user",
    },
    {
      text: "Agregar capitulo",
      icon: FileText,
      url: "agregar-capitulo",
      tipo: "user",
    },
    {
      text: "Gestionar novelas",
      icon: RefreshCw,
      url: "actulizar-novelas",
      tipo: "user",
    },
    {
      text: "Gestionar Volumenes",
      icon: RefreshCw,
      url: "volumenes-activos",
      tipo: "user",
    },
    {
      text: "Gestionar Capitulos",
      icon: RefreshCw,
      url: "capitulos-activos",
      tipo: "user",
    },
    {
      text: "Gestionar Ilustraciones",
      icon: Image,
      url: "ilustraciones_activas",
      tipo: "user",
    },
    {
      text: "Upload Ilustraciones",
      icon: FileImage,
      url: "subir_imagenes",
      tipo: "user",
    },
    {
      text: "Upload File Mega",
      icon: UploadIcon,
      url: "subir_file_mega",
      tipo: "user",
    },
    {
      text: "Team",
      icon: Users,
      tipo: "administrador",
      url: "colaboradores",
    },
  ];

  useEffect(() => {
    document.title = "Panel de administracion";
  }, []);

  const handelClick = async () => {
    try {
      await supabase.auth.signOut();
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
                    <i>
                      <item.icon
                        className={`${
                          activeDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    </i>
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
