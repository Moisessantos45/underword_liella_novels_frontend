import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import "../css/slider.css";

const LayoutSlider = () => {
  const { active, activeDark } = useAdmin();
  const [activeIndex, setActiveIndex] = useState(0);
  const menuItems = [
    { text: "Inicio", icon: "fas fa-border-all" },
    { text: "Agregar Novela", icon: "fa-solid fa-cloud-arrow-up" },
    { text: "Agregar volumen", icon: "fa-solid fa-cloud-arrow-up" },
    { text: "Agregar capitulo", icon: "fa-solid fa-cloud-arrow-up" },
    { text: "Gestionar novelas", icon: "fa-solid fa-rotate" },
    { text: "Gestionar Volumenes", icon: "fa-solid fa-rotate" },
    { text: "Gestionar Capitulos", icon: "fa-solid fa-rotate" },
    { text: "Upload  Ilustraciones", icon: "fa-solid fa-file-image" },
    { text: "Gestionar Ilustraciones", icon: "fa-solid fa-images" },
    { text: "Team", icon: "fas fa-people-group" },
  ];

  return (
    <>
      <section className={`sidebar bg-stone-50 ${!active ? "hide" : ""}`}>
        <a href="#" className="logo">
          <i className="fab fa-slack"></i>
          <span className="text">Admin Panel</span>
        </a>

        <ul className={`side-menu top ${activeDark ? "dark" : ""}`}>
          {menuItems.map((item, index) => (
            <li key={index} className={index === activeIndex ? "actives" : ""}>
              <a
                href="#"
                className="nav-link"
                onClick={() => setActiveIndex(index)}
              >
                <i className={item.icon}></i>
                <span className="text">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>

        <ul className="side-menu">
          <li>
            <a href="#">
              <i className="fas fa-cog"></i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li>
            <button href="#" className="logout">
              <i className="fas fa-right-from-bracket"></i>
              <span className="text">Logout</span>
            </button>
          </li>
        </ul>
      </section>
    </>
  );
};

export default LayoutSlider;
