import { useCallback, useEffect, useState } from "react";
import "../css/modal.css";
import imgClose from "../img/cerrar.png";
import FormAddContent from "./UI/FormAddContent";
import CustomSelect from "./UI/CustomSelect";
import useInteractionStore from "@/Store/InteractionStore";
import useVolumensStore from "@/Store/VolumensStore";
import useNovelasStore from "@/Store/NovelasStore";
import { isBoolean, isNumber, toastify } from "../utils/Utils";

const Modal = () => {
  const { setIsVisibleModal } = useInteractionStore();
  const { listNovelas } = useNovelasStore();
  const { itemVolumen, setItemVolumen, updateVolumen } = useVolumensStore();

  const [capitulo, setCapitulos] = useState("");
  const [captiuloActive, setDisponible] = useState("");
  const [clave, setClave] = useState("");
  const [idNovel, setIdNovel] = useState(null);
  const [imagen, setImagen] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [mediafire, setMediafire] = useState("");
  const [mediafireEpub, setMediafireEpub] = useState("");
  const [mega, setMega] = useState("");
  const [megaEpub, setMegaEpub] = useState("");
  const [nombreClave, setNombreClave] = useState("");
  const [volumen, setVolumen] = useState(0);

  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const findNovel = listNovelas.find(
      (novel) => novel.id === itemVolumen.idNovel
    );
    setSelectedId(findNovel);
  }, []);

  useEffect(() => {
    if (itemVolumen?.id) {
      setCapitulos(itemVolumen.capitulo);
      setDisponible(itemVolumen.captiuloActive);
      setClave(itemVolumen.clave);
      setIdNovel(itemVolumen.id);
      setImagen(itemVolumen.imagen);
      setLink(itemVolumen.link);
      setLinks(itemVolumen.links);
      setMediafire(itemVolumen.mediafire);
      setMega(itemVolumen.mega);
      setMegaEpub(itemVolumen.megaEpub);
      setMediafireEpub(itemVolumen.mediafireEpub);
      setVolumen(itemVolumen.volumen);
      setNombreClave(itemVolumen.nombreClave);
    }
  }, [itemVolumen]);

  const handleFormAddContentChange = useCallback((value) => {
    setLinks(value);
  }, []);

  const ocultarModal = () => {
    setIsVisibleModal(false);
    setItemVolumen({});
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    let newNameClave = "";
    let newClave = "";
    if (selectedId.id !== itemVolumen.idNovel) {
      newClave = selectedId.titulo
        .split(" ")
        .slice(0, 3)
        .join("_")
        .toLowerCase();
      newNameClave = selectedId.titulo
        .split(" ")
        .slice(0, 4)
        .join(" ")
        .toLowerCase();
    }

    const isValidateActive = isBoolean(captiuloActive);
    const validateVolumen = isNumber(volumen);

    if (validateVolumen) {
      toastify("El volumen debe ser un número", "error");
      return;
    }

    await updateVolumen({
      capitulo,
      captiuloActive: isValidateActive,
      clave: newClave || clave,
      id: itemVolumen.id,
      idNovel,
      imagen,
      link,
      links,
      mediafire,
      mega,
      megaEpub,
      mediafireEpub,
      nombreClave: newNameClave || nombreClave,
      volumen: Number(volumen),
    });

    setVolumen(0);
    setImagen("");
    setDisponible("");
    setCapitulos("");
    setMega("");
    setMediafire("");
    setMegaEpub("");
    setMediafireEpub("");
    setSelectedId(null);
    setLinks([]);
    setIsVisibleModal(false);
    setItemVolumen({});
  };

  return (
    <>
      <section className="flex p-2 justify-center items-center top-0 left-0 modal">
        <div className=" w-12/12 sm:max-w-md bg-gray-800 shadow-lg rounded-lg md:max-w-xl mx-2 relative">
          <img
            src={imgClose}
            alt="modal-close"
            className="absolute w-6 h-6 top-2 right-2 cursor-pointer invert"
            onClick={ocultarModal}
          />
          <form className="md:flex" onSubmit={handelSubmit}>
            <div className="w-full p-4 px-5 py-5">
              <div className="flex flex-row text-center">
                <h2 className="text-3xl text-green-400 font-semibold">
                  Actualizar datos
                </h2>
              </div>
              <CustomSelect
                options={listNovelas}
                placeholder="Selecciona la novela"
                onChange={(option) => setSelectedId(option)}
                initValue={selectedId}
              />
              <div className="grid md:grid-cols-3 md:gap-2">
                <div className="flex flex-col">
                  <label className="text-sm text-slate-600" htmlFor="volumen">
                    Volumen
                  </label>
                  <input
                    id="volumen"
                    type="number"
                    className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="Volumen"
                    value={volumen}
                    onChange={(e) => setVolumen(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-slate-600" htmlFor="capitulos">
                    Si hay capítulos
                  </label>
                  <input
                    id="capitulos"
                    type="text"
                    className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="Si hay capítulos"
                    value={capitulo}
                    onChange={(e) => setCapitulos(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="text-sm text-slate-600"
                    htmlFor="capituloActivo"
                  >
                    Capítulo activo
                  </label>
                  <input
                    id="capituloActivo"
                    type="text"
                    className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="Capítulo activo"
                    value={captiuloActive}
                    onChange={(e) => setDisponible(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-slate-600" htmlFor="imagenbg">
                  Imagen
                </label>
                <input
                  type="text"
                  name="imagenbg"
                  className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Imagen"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                />
              </div>

              <FormAddContent
                onChange={handleFormAddContentChange}
                initialValues={links}
              />
              <div className="flex flex-col">
                <label className="text-sm text-slate-600" htmlFor="link-scan">
                  Link del scan
                </label>
                <input
                  type="text"
                  name="link-scan"
                  className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="link del scan"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-slate-600" htmlFor="megaUrl">
                  Mega
                </label>
                <input
                  type="text"
                  name="megaUrl"
                  className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Mega"
                  value={mega}
                  onChange={(e) => setMega(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-sm text-slate-600"
                  htmlFor="urlMediafire"
                >
                  Mediafire
                </label>
                <input
                  type="text"
                  name="urlMediafire"
                  className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Mediafire"
                  value={mediafire}
                  onChange={(e) => setMediafire(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-slate-600" htmlFor="megaEpub">
                  Mega Epub
                </label>
                <input
                  type="text"
                  name="megaEpub"
                  className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700  focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Mega Epub"
                  value={megaEpub}
                  onChange={(e) => setMegaEpub(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-sm text-slate-600"
                  htmlFor="mediafireEpub"
                >
                  Mediafire Epub
                </label>
                <input
                  type="text"
                  name="mediafireEpub"
                  className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  placeholder="Mediafire Epub"
                  value={mediafireEpub}
                  onChange={(e) => setMediafireEpub(e.target.value)}
                />
              </div>

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
