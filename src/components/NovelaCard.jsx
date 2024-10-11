import { NavLink } from "react-router-dom";
import useInteractionStore from "../Store/InteractionStore";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import useNovelasStore from "../Store/NovelasStore";

const NovelaCard = ({ item, index, isOpen, toggleAccordion }) => {
  const { setIsDrawerOpen, setConfirmDialog, confirmDialog } =
    useInteractionStore();
  const { setItemNovela, changeStatus, removeNovela } = useNovelasStore();
  const { userAuth } = useAuth();

  const [id, setId] = useState(null);
  const isConfirmDialog = useRef(false);

  const handleClick = async () => {
    await removeNovela(id);
    setId(null);
  };

  useEffect(() => {
    isConfirmDialog.current = confirmDialog;
    if (isConfirmDialog.current && userAuth.tipo === "administrador") {
      handleClick();
      setConfirmDialog(false);
    }
  }, [confirmDialog]);

  return (
    <div className="mb-2 sm:w-60 w-44 text_color relative" key={index}>
      <div className="w-full bg-gray-50 dark:bg-gray-800 relative flex justify-center flex-wrap rounded-lg items-center min-h-36">
        <a
          href={`/novela/${item.id}?nombre=${encodeURIComponent(item.titulo)}`}
          className="bg-blue-700 text-white rounded-lg h-7 w-9 flex items-center justify-center absolute left-1 top-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-arrow-right"></i>
        </a>
        <button
          className="bg-blue-700 text-white rounded-lg h-7 w-10 flex items-center justify-center absolute right-1 top-1"
          onClick={() => changeStatus(item.id, item.activo)}
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
        <h3 className="m-1 text-black dark:text-white text-xs">
          <span className="font-bold text-sm">Titulo:</span> {item.titulo}
        </h3>
        <NavLink
          className="bg-blue-600 text-white rounded-lg h-7 w-16 m-1 flex items-center justify-center"
          to={`/dashboard/${userAuth.id}/agregar-novela`}
          onClick={() => setItemNovela(item)}
        >
          Editar
        </NavLink>
        <button
          className={`bg-rose-700 text-white rounded-lg h-7 w-18 m-1 flex justify-center items-center ${
            userAuth.role === "administrador"
              ? ""
              : "bg-rose-400 cursor-not-allowed"
          }`}
          onClick={() => {
            setIsDrawerOpen(true);
            setId(item.id);
          }}
          disabled={userAuth.role !== "administrador"}
        >
          Eliminar
        </button>
        <button
          className={`w-full text-white p-2 text-left focus:outline-none rounded-lg ${
            isOpen === index ? "bg-blue-700" : ""
          }`}
          onClick={() => toggleAccordion(index)}
        >
          <span className="text-black dark:text-white font-bold">
            Mostrar mas info
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-max-height duration-300 ease-in-out rounded-lg absolute sm:w-60 w-44 z-20 ${
          isOpen === index ? " max-h-48" : "max-h-0"
        }`}
      >
        <div className="p-2 bg-gray-100 dark:bg-gray-700">
          <h1 className="m-2 text-xs dark:text-gray-300">
            <span className="font-bold text-sm">Sinopsis:</span> {item.sinopsis}
          </h1>
          <h1 className="m-2 dark:text-gray-300">
            <span className="font-bold">Autor:</span> {item.autor}
          </h1>
          <h1 className="m-2 dark:text-gray-300">
            <span className="font-bold">Géneros:</span> {item.generos}
          </h1>
          <h1 className="m-2 dark:text-gray-300">
            <span className="font-bold">Volúmenes:</span> {item.volumenes}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NovelaCard;
