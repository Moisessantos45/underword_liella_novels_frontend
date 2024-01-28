import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import "../css/modal.css";
import imgClose from "../img/cerrar.png";

const Modal = () => {
  const { modal, setModal, cardEditar, setEditarCard, enviarDatos } =
    useAdmin();
  const [nombreClave, setNombre] = useState("");
  const [volumen, setVolumen] = useState(0);
  const [imagen, setImagen] = useState("");
  const [captiuloActive, setDisponible] = useState("");
  const [capitulo, setCapitulos] = useState("");
  const [mega, setMega] = useState("");
  const [mediafire, setMediafire] = useState("");
  const [megaEpub, setMegaEpub] = useState("");
  const [mediafireEpub, setMediafireEpub] = useState("");
  const [clave, setClave] = useState("");
  const [id, setId] = useState(null);
  const type = "cards";
  useEffect(() => {
    if (cardEditar?.clave) {
      setNombre(cardEditar.nombreClave);
      setVolumen(cardEditar.volumen);
      setImagen(cardEditar.imagen);
      setDisponible(cardEditar.captiuloActive);
      setCapitulos(cardEditar.capitulo);
      setMega(cardEditar.mega);
      setMediafire(cardEditar.mediafire);
      setMegaEpub(cardEditar.megaEpub);
      setMediafireEpub(cardEditar.mediafireEpub);
      setClave(cardEditar.clave);
      setId(cardEditar.id);
    }
  }, [cardEditar]);
  const ocultarModal = () => {
    setModal(false);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    enviarDatos(
      {
        nombreClave,
        volumen,
        imagen,
        captiuloActive,
        capitulo,
        mega,
        mediafire,
        megaEpub,
        mediafireEpub,
        clave,
        id,
      },
      type
    );
    setNombre("");
    setVolumen(0);
    setImagen("");
    setDisponible("");
    setCapitulos("");
    setMega("");
    setMediafire("");
    setMegaEpub("");
    setMediafireEpub("");
    setClave("");
    setId(null);
    setEditarCard([]);
  };
  return (
    <>
      <section className="flex justify-center items-center top-0 left-0 modal">
        <form
          className="flex items-center h-96 max-w-lg font-bold bg-slate-50 rounded-lg form_modal relative"
          onSubmit={handelSubmit}
        >
          <img
            src={imgClose}
            alt=""
            className="absolute w-6 h-6 top-2 right-1 cursor-pointer"
            onClick={ocultarModal}
          />
          <div className="form_add_content flex text-black h-16">
            <label htmlFor="nombre" className="text-black">
              Agrega el nombre de la novela
            </label>
            <input
              type="text"
              placeholder="titulo"
              id="nombre"
              className="input_from text-black"
              value={nombreClave}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form_add_content flex flex-wrap">
            <label htmlFor="volumen" className="text-black w-40">
              Volumen
            </label>
            <input
              type="number"
              placeholder="volumen"
              id="volumen"
              className="input_from sm:w-16 w-11/12"
              value={volumen}
              onChange={(e) => setVolumen(e.target.value)}
            />
            <label htmlFor="captitulo" className="text-black w-40">
              Texto
            </label>
            <input
              type="text"
              placeholder="captitulo"
              id="capitulo"
              className="input_from sm:w-32 w-11/12"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="form_add_content flex h-16">
            <label htmlFor="imagen" className="text-black">
              Agrega a url imagen
            </label>
            <input
              type="text"
              placeholder="imagen"
              id="imagen"
              className="input_from"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>
          <div className="form_add_content flex h-16">
            <label htmlFor="disponible" className="text-black">
              Esta para descarga o leer
            </label>
            <input
              type="text"
              placeholder="disponible"
              id="disponible"
              className="input_from"
              value={captiuloActive}
              onChange={(e) => setDisponible(e.target.value)}
            />
          </div>
          {/* <div className="form_add_content flex h-16">
            <label htmlFor="captitulo" className="text-black">
              Texto de disponible
            </label>
            <input
              type="text"
              placeholder="captitulo"
              id="capitulo"
              className="input_from"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div> */}
          <div className="form_add_content flex h-16">
            <label htmlFor="mega" className="text-black">
              Link de mega
            </label>
            <input
              type="text"
              placeholder="mega"
              id="mega"
              className="input_from"
              value={mega}
              onChange={(e) => setMega(e.target.value)}
            />
          </div>
          <div className="form_add_content flex h-16">
            <label htmlFor="mediafire" className="text-black">
              Link de mediafire
            </label>
            <input
              type="text"
              placeholder="mediafire"
              id="mediafire"
              className="input_from"
              value={mediafire}
              onChange={(e) => setMediafire(e.target.value)}
            />
          </div>
          <div className="form_add_content flex h-16">
            <label htmlFor="megaEpub" className="text-black">
              Link de mega epub
            </label>
            <input
              type="text"
              placeholder="megaEpub"
              id="megaEpub"
              className="input_from"
              value={megaEpub}
              onChange={(e) => setMegaEpub(e.target.value)}
            />
          </div>
          <div className="form_add_content flex h-16">
            <label htmlFor="mediafireEpub" className="text-black">
              link de epub mediafire
            </label>
            <input
              type="text"
              placeholder="mediafire Epub"
              id="mediafireEpub"
              className="input_from"
              value={mediafireEpub}
              onChange={(e) => setMediafireEpub(e.target.value)}
            />
          </div>
          <div className="form_add_content flex h-16">
            <label htmlFor="clave" className="text-black">
              No modificar
            </label>
            <input
              type="text"
              placeholder="clave"
              id="clave"
              className="input_from"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Actualizar el volumen"
            className="btn_submit h-7"
          />
        </form>
      </section>
    </>
  );
};

export default Modal;
