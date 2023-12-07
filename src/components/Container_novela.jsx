import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import NavbarSlider from "./NavbarSlider";
import Alerta from "./Alerta";
import Swal from "sweetalert2";

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

const Container_novela = () => {
  const { active, enviarDatos, datosEdit, activeDark } = useAdmin();
  const [alerta, setAlerta] = useState({});
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [backgroud, setBackgroud] = useState("");
  const [imagen, setImagen] = useState("");
  const [ilustrador, setIlustrador] = useState("?");
  const [generos, setGeneros] = useState("");
  const [autor, setAutor] = useState("?");
  const [encargados, setEncargados] = useState("");
  const [activo, setActivo] = useState(false);
  const [sinopsis, setSinopsis] = useState("");
  // const [ilustraciones, setIlustraciones] = useState("");
  const [capitulos, setCapitulos] = useState(false);
  const [clave, setClave] = useState("dato");
  const [id, setId] = useState(null);
  const [dataTipo, setType] = useState("novela");

  useEffect(() => {
    if (datosEdit?.id && datosEdit?.sinopsis) {
      setTitulo(datosEdit.titulo);
      setTipo(datosEdit.tipo || "");
      setBackgroud(datosEdit.backgroud);
      setImagen(datosEdit.imagen);
      setIlustrador(datosEdit.ilustrador);
      setGeneros(datosEdit.generos);
      setAutor(datosEdit.autor);
      setEncargados(datosEdit.encargados);
      setActivo(datosEdit.activo);
      setSinopsis(datosEdit.sinopsis);
      // setIlustraciones(datosEdit.ilustraciones);
      setCapitulos(datosEdit.capitulos);
      setClave(datosEdit.clave);
      setId(datosEdit.id);
    }
  }, [datosEdit]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [
      ilustrador,
      titulo,
      tipo,
      sinopsis,
      capitulos,
      imagen,
      generos,
      autor,
      encargados,
      activo,
      // ilustraciones,
    ];
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
        ilustrador,
        titulo,
        tipo,
        sinopsis,
        clave,
        id,
        capitulos,
        backgroud,
        imagen,
        generos,
        autor,
        encargados,
        activo,
        // ilustraciones,
      },
      dataTipo
    );
    setTitulo("");
    setTipo("");
    setBackgroud("");
    setImagen("");
    setIlustrador("?");
    setGeneros("");
    setAutor("?");
    setEncargados("");
    setActivo(false);
    setSinopsis("");
    // setIlustraciones("");
    setCapitulos(false);
    setClave("");
    setId(null);
  };
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const { msg } = alerta;
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black  ${
          activeDark ? "dark" : ""
        }`}
      >
        <NavbarSlider />
        {msg && <Alerta alerta={alerta} />}
        <form
          className="form_add font-bold form_add_novel"
          onSubmit={handelSubmit}
        >
          <div className="form_add_content">
            <label
              htmlFor="titulo"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El titulo de la novela
            </label>
            <input
              type="text"
              placeholder="titulo"
              id="titulo"
              className="input_from text-slate-700"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="tipo"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Tipo de novela
            </label>
            <input
              type="text"
              placeholder="tipo"
              id="tipo"
              className="input_from text-slate-700"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="backgroud"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El background de la novela
            </label>
            <input
              type="text"
              placeholder="backgroud"
              id="backgroud"
              className="input_from text-slate-700"
              value={backgroud}
              onChange={(e) => setBackgroud(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="imagen"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              La url de la imagen
            </label>
            <input
              type="text"
              placeholder="imagen"
              id="imagen"
              className="input_from text-slate-700"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="nombre"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Ilustrador
            </label>
            <input
              type="text"
              placeholder="nombre"
              id="nombre"
              className="input_from text-slate-700"
              value={ilustrador}
              onChange={(e) => setIlustrador(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="generos"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El genero de la novela
            </label>
            <input
              type="text"
              placeholder="generos"
              id="generos"
              className="input_from text-slate-700"
              value={generos}
              onChange={(e) => setGeneros(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="autor"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El nombre del autor
            </label>
            <input
              type="text"
              placeholder="autor"
              id="autor"
              className="input_from text-slate-700"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="volumen"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Encargados
            </label>
            <input
              type="text"
              placeholder="encargados"
              id="volumen"
              className="input_from text-slate-700"
              value={encargados}
              onChange={(e) => setEncargados(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="activo"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Esta activo
            </label>
            <input
              type="text"
              placeholder="activo"
              id="activo"
              className="input_from text-slate-700"
              value={activo}
              onChange={(e) => setActivo(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="sinopsis"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Sinopsis de la novela
            </label>
            <textarea
              type="text"
              placeholder="sinopsis"
              id="sinopsis"
              className="input_from text-slate-700 h-20 sm:h-14"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
            />
          </div>
          {/* <div className="form_add_content">
            <label htmlFor="ilustraciones" className={` ${activeDark?"text-white":"text-slate-600"}`}>
              Ilustraciones de la novela
            </label>
            <textarea
              type="text"
              placeholder="ilustraciones"
              id="ilustraciones"
              className="input_from text-slate-700"
              value={ilustraciones}
              onChange={(e) => setIlustraciones(e.target.value)}
            />
          </div> */}
          <div className="form_add_content">
            <label
              htmlFor="capitulos"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Hay capitiuos
            </label>
            <input
              type="text"
              placeholder="capitulos"
              id="capitulos"
              className="input_from text-slate-700"
              value={capitulos}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="clave"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              No modificar
            </label>
            <input
              type="text"
              placeholder="clave"
              id="clave"
              className="input_from text-slate-700"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value={id ? "Actulizar novela" : "Agrega un novela"}
            className="btn_submit "
          />
        </form>
      </section>
    </>
  );
};

export default Container_novela;
