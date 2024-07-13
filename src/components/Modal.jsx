import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import "../css/modal.css";
import imgClose from "../img/cerrar.png";

const Modal = () => {
  const { setModal, cardEditar, setEditarCard, enviarDatos } = useAdmin();
  const [volumen, setVolumen] = useState(0);
  const [imagen, setImagen] = useState("");
  const [captiuloActive, setDisponible] = useState("");
  const [capitulo, setCapitulos] = useState("");
  const [mega, setMega] = useState("");
  const [mediafire, setMediafire] = useState("");
  const [megaEpub, setMegaEpub] = useState("");
  const [mediafireEpub, setMediafireEpub] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [id, setId] = useState(null);
  const type = "cards";
  useEffect(() => {
    if (cardEditar?.clave) {
      setVolumen(cardEditar.volumen);
      setImagen(cardEditar.imagen);
      setDisponible(cardEditar.captiuloActive);
      setCapitulos(cardEditar.capitulo);
      setMega(cardEditar.mega);
      setMediafire(cardEditar.mediafire);
      setMegaEpub(cardEditar.megaEpub);
      setMediafireEpub(cardEditar.mediafireEpub);
      setId(cardEditar.id);
      selectedId(cardEditar.idNovel);
    }
  }, [cardEditar]);

  const ocultarModal = () => {
    setModal(false);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    enviarDatos(
      {
        volumen,
        imagen,
        captiuloActive,
        capitulo,
        mega,
        mediafire,
        megaEpub,
        mediafireEpub,
        id,
        idNovel: selectedId,
      },
      type
    );

    setVolumen(0);
    setImagen("");
    setDisponible("");
    setCapitulos("");
    setMega("");
    setMediafire("");
    setMegaEpub("");
    setMediafireEpub("");
    setSelectedId(null);
    setId(null);
    setEditarCard([]);
    setModal(false);
  };
  return (
    <>
      <section className="flex p-2 justify-center items-center top-0 left-0 modal">
        <div className="max-w-md bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
          <img
            src={imgClose}
            alt="modal-close"
            className="absolute w-6 h-6 sm:top-6 sm:right-[29%] right-7 top-[18%] cursor-pointer"
            onClick={ocultarModal}
          />
          <form className="md:flex" onSubmit={handelSubmit}>
            <div className="w-full p-4 px-5 py-5">
              <div className="flex flex-row text-center">
                <h2 className="text-3xl text-green-400 font-semibold">
                  Actualizar datos
                </h2>
              </div>
              <div className="grid md:grid-cols-3 md:gap-2">
                <input
                  type="number"
                  className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Volumen"
                  value={volumen}
                  onChange={(e) => setVolumen(e.target.value)}
                />
                <input
                  type="text"
                  className="border rounded h-10 w-full text-slate-400 focus:text-slate-700  focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Si hay capitulos"
                  value={capitulo}
                  onChange={(e) => setCapitulos(e.target.value)}
                />
                <input
                  type="text"
                  className="border rounded h-10 w-full text-slate-400 focus:text-slate-700  focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Capitulo activo"
                  value={captiuloActive}
                  onChange={(e) => setDisponible(e.target.value)}
                />
              </div>
              <input
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
              <input
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Mega"
                value={mega}
                onChange={(e) => setMega(e.target.value)}
              />
              <input
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Mediafire"
                value={mediafire}
                onChange={(e) => setMediafire(e.target.value)}
              />
              <input
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700  focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Mega Epub"
                value={megaEpub}
                onChange={(e) => setMegaEpub(e.target.value)}
              />
              <input
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                placeholder="Mediafire Epub"
                value={mediafireEpub}
                onChange={(e) => setMediafireEpub(e.target.value)}
              />
              <div className="flex justify-center items-center pt-2">
                <button
                  type="submit"
                  value="Actualizar el volumen"
                  className="h-10 w-48 rounded font-medium text-xs bg-blue-500 text-white"
                >
                  Actualizar el volumen
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Modal;
