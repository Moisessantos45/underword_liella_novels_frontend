import { useEffect, useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import NavbarSlider from "@/components/NavbarSlider";
import Swal from "sweetalert2";
import CustomSelect from "../../../components/UI/CustomSelect";

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

const Container_captitulo = () => {
  const { novelasInfo, enviarDatos, datosEdit, activeDark, setDatos } =
    useAdmin();

  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [capitulo, setCapitulos] = useState(0);
  const [id, setId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (datosEdit?.id && datosEdit?.contenido) {
      setTitulo(datosEdit.titulo);
      setContenido(datosEdit.contenido);
      setCapitulos(datosEdit.capitulo);
      setNombre(datosEdit.nombre);
      setId(datosEdit.id);
      setSelectedId(datosEdit.idNovel);
    }
  }, [datosEdit]);

  const tipo = "capitulos";
  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [nombre, titulo, contenido, capitulo, selectedId.id];
    const camposVacios = Object.entries(campos)
      .filter(
        ([nombre, valor]) => typeof valor === "string" && valor.trim() === ""
      )
      .map(([nombre, valor]) => nombre)
      .join(", ");

    if (camposVacios.length > 0) {
      mostrarAlerta(`Los siguientes campos están vacíos: ${camposVacios}`);
      return;
    }
    enviarDatos(
      {
        nombre,
        titulo,
        contenido,
        capitulo,
        id,
        idNovel: id ? selectedId : selectedId.id,
      },
      tipo
    );
    setTitulo("");
    setContenido("");
    setCapitulos(0);
    setNombre("");
    setSelectedId(null);
    setId(null);
    setDatos({});
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
          <div className="w-full m-auto p-1 flex-col relative justify-center items-center">
            <CustomSelect
              options={novelasInfo}
              placeholder="Selecciona la novela"
              onChange={(option) => setSelectedId(option)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="titulo"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Título del capítulo
            </label>
            <input
              type="text"
              placeholder="Título"
              id="titulo"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value.replace(/´/g, ""))}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="capitulo"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Número de capítulo
            </label>
            <input
              type="number"
              placeholder="Capítulo"
              id="capitulo"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="contenido"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              } `}
            >
              Contenido del capítulo
            </label>
            <textarea
              cols="30"
              rows="5"
              placeholder="Contenido"
              id="contenido"
              className="border rounded sm:h-40 h-84 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm scrollbar"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center pt-2">
            <button
              type="submit"
              className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
            >
              {id ? "Actualizar capítulo" : "Agregar capítulo"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Container_captitulo;
