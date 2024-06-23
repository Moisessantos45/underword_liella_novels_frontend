import { NavLink } from "react-router-dom";

const NovelaCard = ({
  item,
  index,
  isOpen,
  toggleAccordion,
  handelClick,
  userType,
  userAuth,
  obtenerDatos,
  setMostrar_modal,
  confirmar_delate,
  eliminarDatos,
  type,
}) => {
  return (
    <div className="mb-2 sm:w-60 w-44 text_color relative" key={index}>
      <div className="w-full bg-gray-50 relative flex justify-center flex-wrap rounded-lg items-center min-h-36">
        <a
          href={`/novela/${item.clave}`}
          className="bg-blue-700 text-white rounded-lg h-7 w-9 flex items-center justify-center absolute left-1 top-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-arrow-right"></i>
        </a>
        <button
          className="bg-blue-700 text-white rounded-lg h-7 w-10 flex items-center justify-center absolute right-1 top-1"
          onClick={() => handelClick(item.clave, !item.activo)}
        >
          {item.activo ? (
            <i className="fa-solid fa-power-off"></i>
          ) : (
            <i className="fa-regular fa-lightbulb"></i>
          )}
        </button>
        <img
          src={item.imagen}
          className="w-14 h-16 rounded-lg m-1"
          alt={`${item.titulo} imagen`}
        />
        <h3 className="m-1 text-black text-xs">
          <span className="font-bold text-sm">Titulo:</span> {item.titulo}
        </h3>
        <NavLink
          className="bg-blue-600 text-white rounded-lg h-7 w-16 m-1 flex items-center justify-center"
          to={`/dashboard/${userAuth.id}/agregar-novela`}
          onClick={() => obtenerDatos(item)}
        >
          Editar
        </NavLink>
        <button
          className={`bg-rose-700 text-white rounded-lg h-7 w-18 m-1 flex justify-center items-center ${
            userType === "administrador" ? "" : "bg-rose-400 cursor-not-allowed"
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
        className={`overflow-hidden transition-max-height duration-300 ease-in-out rounded-lg absolute sm:w-60 w-44 z-20 ${
          isOpen === index ? " max-h-48" : "max-h-0"
        }`}
      >
        <div className="p-2 bg-gray-100">
          <h1 className="m-2 text-xs">
            <span className="font-bold text-sm">Sinopsis:</span> {item.sinopsis}
          </h1>
          <h1 className="m-2">
            <span className="font-bold">Autor:</span> {item.autor}
          </h1>
          <h1 className="m-2">
            <span className="font-bold">Géneros:</span> {item.generos}
          </h1>
          <h1 className="m-2">
            <span className="font-bold">Volúmenes:</span> {item.volumenes}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NovelaCard;
