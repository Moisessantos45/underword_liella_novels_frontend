import { useState } from "react";
import "../css/ContainerAdmin.css";
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

const Container_card = () => {
  const { active, enviarDatos, novelasInfo, activeDark } = useAdmin();
  const [alerta, setAlerta] = useState({});
  const [nombreClave, setNombre] = useState("");
  const [volumen, setVolumen] = useState("");
  const [imagen, setImagen] = useState("");
  const [captiuloActive, setDisponible] = useState(false);
  const [capitulo, setCapitulos] = useState("");
  const [mega, setMega] = useState("");
  const [mediafire, setMediafire] = useState("");
  const [megaEpub, setMegaEpub] = useState("");
  const [mediafireEpub, setMediafireEpub] = useState("");
  const [clave, setClave] = useState("dato");

  const tipo = "cards";
  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [nombreClave, volumen, imagen, clave];
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
      },
      tipo
    );
    // setNombre("")
    setVolumen("");
    setImagen("");
    setCapitulos("");
    setMega("");
    setMediafire("");
    setMediafireEpub("");
    setMegaEpub("");
  };
  const { msg } = alerta;
  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        {msg && <Alerta alerta={alerta} />}
        <NavbarSlider />
        <form className="form_add font-bold" onSubmit={handelSubmit}>
          <div className="form_add_content">
            <label
              htmlFor="nombre"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Nombre de la novela
            </label>
            {/* <input
              type="text"
              placeholder="titulo"
              id="nombre"
              className="input_from"
              value={nombreClave}
              onChange={(e) => setNombre(e.target.value)}
            /> */}
            <select
              id="nombre"
              type="text"
              className="input_from text-black h-8"
              value={nombreClave}
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
              htmlFor="volumen"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              El volumen
            </label>
            <input
              type="number"
              placeholder="volumen"
              id="volumen"
              className="input_from text-slate-700"
              value={volumen}
              onChange={(e) => setVolumen(e.target.value)}
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
              htmlFor="disponible"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Esta para descarga
            </label>
            <input
              type="text"
              placeholder="disponible"
              id="disponible"
              className="input_from text-slate-700"
              value={captiuloActive}
              onChange={(e) => setDisponible(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="captitulo"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Texto de disponible
            </label>
            <input
              type="text"
              placeholder="captitulo"
              id="capitulo"
              className="input_from text-slate-700"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="mega"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Link de mega
            </label>
            <input
              type="text"
              placeholder="mega"
              id="mega"
              className="input_from text-slate-700"
              value={mega}
              onChange={(e) => setMega(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="mediafire"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Link de drive
            </label>
            <input
              type="text"
              placeholder="mediafire"
              id="mediafire"
              className="input_from text-slate-700"
              value={mediafire}
              onChange={(e) => setMediafire(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="megaEpub"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              Link de mega epub
            </label>
            <input
              type="text"
              placeholder="megaEpub"
              id="megaEpub"
              className="input_from text-slate-700"
              value={megaEpub}
              onChange={(e) => setMegaEpub(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="mediafireEpub"
              className={` ${activeDark ? "text-white" : "text-slate-600"}`}
            >
              link de epub mediafire
            </label>
            <input
              type="text"
              placeholder="mediafire Epub"
              id="mediafireEpub"
              className="input_from text-slate-700"
              value={mediafireEpub}
              onChange={(e) => setMediafireEpub(e.target.value)}
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
            value="Agrega un volumen"
            className="btn_submit"
          />
        </form>
      </section>
    </>
  );
};

export default Container_card;
