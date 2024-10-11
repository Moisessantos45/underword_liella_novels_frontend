import { useCallback, useState } from "react";
import "@/css/ContainerAdmin.css";
import useAdmin from "@/hooks/useAdmin";
import NavbarSlider from "@/components/NavbarSlider";
import CustomSelect from "@/components/UI/CustomSelect";
import FormAddContent from "@/components/UI/FormAddContent";
import useNovelasStore from "@/Store/NovelasStore";
import { isBoolean, isNumber } from "@/utils/Utils";
import useVolumensStore from "@/Store/VolumensStore";
import { showAlert } from "@/utils/Utils";

const Container_card = () => {
  const { listNovelas } = useNovelasStore();
  const { addVolumen } = useVolumensStore();
  const { activeDark } = useAdmin();

  const [capitulo, setCapitulos] = useState("");
  const [captiuloActive, setDisponible] = useState("");
  const [imagen, setImagen] = useState(
    "https://i.ibb.co/WvKyKrk/no-disponibles.jpg"
  );
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [mediafire, setMediafire] = useState("");
  const [mediafireEpub, setMediafireEpub] = useState("");
  const [mega, setMega] = useState("");
  const [megaEpub, setMegaEpub] = useState("");
  const [volumen, setVolumen] = useState(0);

  const [selectedId, setSelectedId] = useState(null);

  const handleFormAddContentChange = useCallback((value) => {
    setLinks(value);
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [volumen, imagen];
    const camposVacios = campos.filter(
      (valor) => typeof valor === "string" && valor.trim() === ""
    );

    if (camposVacios.length > 0 || !selectedId?.id) {
      showAlert("Los siguientes campos están vacíos");
      return;
    }

    const isValidateActive = isBoolean(captiuloActive);
    const validateVolumen = isNumber(volumen);

    if (validateVolumen) {
      showAlert("El volumen debe ser un número");
      return;
    }

    let newNameClave = "";
    let newClave = "";
    if (selectedId.id) {
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

    await addVolumen({
      capitulo,
      captiuloActive: isValidateActive,
      clave: newClave,
      idNovel: selectedId.id,
      imagen,
      link,
      links,
      mediafire,
      mega,
      megaEpub,
      mediafireEpub,
      nombreClave: newNameClave,
      volumen: Number(volumen),
    });

    setVolumen("");
    setImagen("https://i.ibb.co/WvKyKrk/no-disponibles.jpg");
    setCapitulos("");
    setMega("");
    setMediafire("");
    setMediafireEpub("");
    setMegaEpub("");
    setSelectedId(null);
  };

  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        <NavbarSlider />
        <form
          className={`w-11/12 sm:w-8/12 p-2 md:mt-10 lg:mt-0 ${
            activeDark ? "bg-gray-800" : "bg-white"
          } shadow-lg rounded-lg m-auto`}
          onSubmit={handelSubmit}
        >
          <CustomSelect
            options={listNovelas}
            placeholder="Selecciona la novela"
            onChange={(option) => setSelectedId(option)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 w-11/12 mx-auto">
            <div>
              <label htmlFor="disponible" className="text-slate-600 text-sm">
                ¿Está disponible para leer?
              </label>
              <input
                id="disponible"
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="Está disponible para leer"
                value={captiuloActive}
                onChange={(e) => setDisponible(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="capitulo" className="text-slate-600 text-sm">
                Escribe si está disponible para leer
              </label>
              <input
                id="capitulo"
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="Escribe si está disponible para leer"
                value={capitulo}
                onChange={(e) => setCapitulos(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="imagen" className="text-slate-600 text-sm">
                URL de la portada
              </label>
              <input
                id="imagen"
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="URL Portada"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </div>
          </div>

          <FormAddContent
            onChange={handleFormAddContentChange}
            initialValues={links}
          />

          <div className="grid grid-cols-1 gap-3 mt-2 w-11/12 mx-auto">
            <div className="flex flex-col">
              <label className="text-sm text-slate-600" htmlFor="link-scan">
                Link del scan
              </label>
              <input
                type="text"
                name="link-scan"
                className="border rounded h-7 sm:h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="link del scan"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="mega" className="text-slate-800 text-sm">
                Link de Mega
              </label>
              <input
                id="mega"
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="Link de Mega"
                value={mega}
                onChange={(e) => setMega(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="mediafire" className="text-slate-600 text-sm">
                Link de Drive
              </label>
              <input
                id="mediafire"
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="Link de Drive"
                value={mediafire}
                onChange={(e) => setMediafire(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="megaEpub" className="text-slate-600 text-sm">
                Link de Mega ePub
              </label>
              <input
                id="megaEpub"
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="Link de Mega ePub"
                value={megaEpub}
                onChange={(e) => setMegaEpub(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="mediafireEpub" className="text-slate-600 text-sm">
                Link de Mediafire ePub
              </label>
              <input
                id="mediafireEpub"
                type="text"
                className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
                placeholder="Link de Mediafire ePub"
                value={mediafireEpub}
                onChange={(e) => setMediafireEpub(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-5 mb-5">
            <button
              type="submit"
              className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
            >
              Agregar volumen
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Container_card;
