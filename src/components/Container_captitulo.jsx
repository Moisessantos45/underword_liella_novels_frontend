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

const Container_captitulo = () => {
  const { active, novelasInfo, enviarDatos, datosEdit, activeDark } =
    useAdmin();
  const [alerta, setAlerta] = useState({});
  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [capitulo, setCapitulos] = useState(0);
  const [clave, setClave] = useState("dato");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (datosEdit?.id && datosEdit?.contenido) {
      console.log("si funciona el de capi");
      setTitulo(datosEdit.titulo);
      setContenido(datosEdit.contenido);
      setCapitulos(datosEdit.capitulo);
      setNombre(datosEdit.nombre);
      setClave(datosEdit.clave);
      setId(datosEdit.id);
    }
  }, [datosEdit]);
  const tipo = "capitulos";
  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [nombre, titulo, contenido, capitulo, clave];
    const camposVacios = Object.entries(campos)
      .filter(
        ([nombre, valor]) => typeof valor === "string" && valor.trim() === ""
      )
      .map(([nombre, valor]) => nombre)
      .join(", ");

    if (camposVacios.length > 0) {
      mostrarAlerta(`Los siguientes campos están vacíos: ${camposVacios}`);
      return
    }
    enviarDatos({ nombre, titulo, contenido, capitulo, clave, id }, tipo);
    setTitulo("");
    setContenido("");
    setCapitulos(0);
    setNombre("");
    setClave("");
    setId(null);
  };
  const { msg } = alerta;
  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        {msg && <Alerta alerta={alerta} />}
        <NavbarSlider />
        <form
          className="form_add form_add-heigth font-bold"
          onSubmit={handelSubmit}
        >
          <div className="form_add_content">
            <label
              htmlFor="nombre"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El nombre de la novela
            </label>
            {/* <input
              type="text"
              placeholder="nombre"
              id="nombre"
              className="input_from"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            /> */}
            <select
              id="nombre"
              type="text"
              className="input_from text-black h-8"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            >
              {novelasInfo.map((chart, i) => (
                <option
                  key={i}
                  value={`${chart.titulo.split(" ").slice(0, 4).join(" ")}`}
                  className=" overflow-hidden text-ellipsis whitespace-nowrap text-slate-600"
                >
                  {chart.titulo.split(" ").slice(0, 4).join(" ")}
                </option>
              ))}
            </select>
          </div>
          <div className="form_add_content">
            <label
              htmlFor="titulo"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El titulo del capitulo
            </label>
            <input
              type="text"
              placeholder="titulo"
              id="titulo"
              className="input_from h-8 text-slate-700"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="capitulo"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El capitulo
            </label>
            <input
              type="number"
              placeholder="capitulo"
              id="capitulo"
              className="input_from h-8 text-slate-700"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="contenido"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El contenido
            </label>
            <textarea
              type="text"
              cols="30"
              rows="5"
              placeholder="contenido"
              id="contenido"
              className="input_from h-20 w-11/12 text-slate-700"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
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
              className="input_from h-8 text-slate-700"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value={id ? "Actulizar capitulo" : "Agrega un capitulo"}
            className="btn_submit"
          />
        </form>
      </section>
    </>
  );
};

export default Container_captitulo;
