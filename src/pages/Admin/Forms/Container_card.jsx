import { useState } from "react";
import "@/css/ContainerAdmin.css";
import useAdmin from "@/hooks/useAdmin";
import NavbarSlider from "@/components/NavbarSlider";
import Swal from "sweetalert2";
import CustomSelect from "@/components/UI/CustomSelect";
import FormAddContent from "@/components/UI/FormAddContent";

const mostrarAlerta = (texto) => {
  Swal.fire({
    icon: "error",
    width: 300,
    title: texto,
    timer: 1500,
    customClass: {
      title: "mi-clase",
    },
  });
};

const Container_card = () => {
  const { enviarDatos, novelasInfo, activeDark } = useAdmin();
  const [volumen, setVolumen] = useState("");
  const [imagen, setImagen] = useState(
    "https://i.ibb.co/WvKyKrk/no-disponibles.jpg"
  );
  const [captiuloActive, setDisponible] = useState(false);
  const [capitulo, setCapitulos] = useState("");
  const [mega, setMega] = useState("");
  const [mediafire, setMediafire] = useState("");
  const [megaEpub, setMegaEpub] = useState("");
  const [mediafireEpub, setMediafireEpub] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [inputValues, setInputValues] = useState([]);

  const tipo = "cards";
  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [volumen, imagen, selectedId];
    const camposVacios = campos.filter(
      (valor) => typeof valor === "string" && valor.trim() === ""
    );

    if (camposVacios.length > 0) {
      mostrarAlerta("Los siguientes campos están vacíos");
      return;
    }
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
        idNovel: selectedId.id,
        links: inputValues,
      },
      tipo
    );
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
            options={novelasInfo}
            placeholder="Selecciona la novela"
            onChange={(option) => setSelectedId(option)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 w-11/12 mx-auto">
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
              placeholder="Está disponible para leer"
              value={captiuloActive}
              onChange={(e) => setDisponible(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
              placeholder="Escribe si está disponible para leer"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
              placeholder="URL Portada"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>
          <FormAddContent onChange={(value) => setInputValues(value)} />
          <div className="grid grid-cols-1 gap-3 mt-2 w-11/12 mx-auto">
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
              placeholder="Link de Mega"
              value={mega}
              onChange={(e) => setMega(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
              placeholder="Link de Drive"
              value={mediafire}
              onChange={(e) => setMediafire(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
              placeholder="Link de Mega ePub"
              value={megaEpub}
              onChange={(e) => setMegaEpub(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 text-sm"
              placeholder="Link de Mediafire ePub"
              value={mediafireEpub}
              onChange={(e) => setMediafireEpub(e.target.value)}
            />
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
