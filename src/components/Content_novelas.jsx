import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavbarSlider from "./NavbarSlider";
import urlAxios from "../config/urlAxios";
import ModalConfirm from "./ModalConfirm";

const Content_novelas = () => {
  const {
    active,
    novelasInfo,
    obtenerDatos,
    eliminarDatos,
    setNovelasInfo,
    activeDark,
    setConfirmar,
    confirmar_delate,
    mostrar_modal,
    setMostrar_modal,
  } = useAdmin();
  const { userType, userAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(null);

  const toggleAccordion = (index) => {
    if (isOpen === index) {
      setIsOpen(null);
    } else {
      setIsOpen(index);
    }
  };
  const type = "novelas";

  const handelClick = async (clave, active) => {
    console.log(clave, active);
    try {
      const { data } = await urlAxios.put("/novelas/estado", { clave, active });
      // console.log(data);
      const novelasActulizados = novelasInfo.map((novela) =>
        novela.id == data.id ? data : novela
      );
      setNovelasInfo(novelasActulizados);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="justify-evenly flex flex-wrap overflow-y-auto scroll_vertical">
          {novelasInfo.map((item, index) => (
            <div className="mb-2 sm:w-60 w-44 text_color" key={index}>
              <div className="w-full bg-gray-50 relative flex justify-center flex-wrap rounded-lg items-center">
                <Link
                  to={`/novela/${item.clave}`}
                  className="bg-blue-700 text-white rounded-lg h-7 w-9 flex items-center justify-center absolute left-1 top-1"
                >
                  {" "}
                  <i className="fas fa-arrow-right"></i>
                </Link>
                <button
                  className="bg-blue-700 text-white rounded-lg h-7 w-10 flex items-center justify-center absolute right-1 top-1"
                  onClick={() => handelClick(item.clave, !item.activo)}
                >
                  {item.activo ? "off" : "on"}
                </button>
                <img
                  src={item.imagen}
                  className="w-14 h-16 rounded-lg m-1"
                  alt=""
                />
                {/* <h3 className="m-1 text-black text-xs">
                  <span className="font-bold text-sm">Nombres:</span>{" "}
                  {item.nombre}
                </h3> */}
                <h3 className="m-1 text-black text-xs">
                  <span className="font-bold text-sm">Titulo:</span>{" "}
                  {item.titulo}
                </h3>
                <NavLink
                  className="bg-blue-600 text-white rounded-lg h-7 w-16 m-1 flex items-center justify-center"
                  to="/dashboard/agregar-novela"
                  onClick={() => obtenerDatos(item)}
                >
                  Editar
                </NavLink>
                {/* <button
                  className="bg-rose-700 rounded-lg h-7 w-16 m-1 flex items-center justify-center"
                  onClick={() => eliminarDatos(item.id,type)}
                >
                  Eliminar
                </button> */}
                <button
                  className={`bg-rose-700 text-white rounded-lg h-7 w-18 m-1 flex justify-center items-center ${
                    userType === "administrador"
                      ? ""
                      : "bg-rose-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (userAuth.tipo === "administrador") {
                      setMostrar_modal(true);
                      if (confirmar_delate) {
                        eliminarDatos(item.id, type);
                      }
                    }
                  }}
                  disabled={userType !== "administrador"}
                >
                  Eliminar
                </button>
                <button
                  className={`w-full text-white p-2 text-left focus:outline-none rounded-lg ${
                    isOpen === index ? "bg-blue-700" : ""
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-black font-bold">Mostrar mas info</span>
                </button>
              </div>

              <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out rounded-lg m-2 ${
                  isOpen === index ? " max-h-48" : "max-h-0"
                }`}
              >
                <div className="p-2 bg-gray-100">
                  <h1 className="m-2 text-xs">
                    <span className="font-bold text-sm">Sinopsi:</span>{" "}
                    {item.sinopsis}
                  </h1>
                  <h1 className="m-2">
                    <span className="font-bold">Author:</span> {item.autor}
                  </h1>
                  <h1 className="m-2">
                    <span className="font-bold">Generos:</span> {item.generos}
                  </h1>
                  <h1 className="m-2">
                    <span className="font-bold">Volumenes:</span>{" "}
                    {item.volumenes}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="max-w-md mx-auto p-4"></div>
      </section>
      {mostrar_modal && <ModalConfirm />}
    </>
  );
};

export default Content_novelas;
