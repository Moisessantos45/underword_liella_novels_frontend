import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import NavbarSlider from "../components/NavbarSlider";
import urlAxios from "../config/urlAxios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Loading from "../components/Loading";

const toastify = (text, type) => {
  Toastify({
    text: `${text}`,
    duration: 3000,
    newWindow: true,
    // close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: type
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      borderRadius: "10px",
    },
  }).showToast();
};

const ConfiguracionSitio = () => {
  const { activeDark } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [tituloPagina, setTituloPagina] = useState("");
  const [encabezado, setEncabezado] = useState("");
  const [detalles, setDetalles] = useState("");
  const [tituloNosotros, setTituloNosotros] = useState("");
  const [fondoNosotros, setFondoNosotros] = useState("");
  const [fondoPagina, setFondoPagina] = useState("");
  const [acercaDeNosotros, setAcercaDeNosotros] = useState("");
  const [imagenReclutamiento, setImagenReclutamiento] = useState("");
  const [imagenFacebook, setImagenFacebook] = useState("");
  const [nombreRedSocial, setNombreRedSocial] = useState("");
  const [mensajeSeguirRedSocial, setMensajeSeguirRedSocial] = useState("");
  const [MensajeReclutamiento, setMensajeReclutamiento] = useState("");
  const [linksRedesSociales, setLinksRedesSociales] = useState("");
  const [activoReclutamiento, setActivoReclutamiento] = useState(true);
  const redesSocialesIconos = {
    facebook: "fa-brands fa-facebook",
    instagram: "fa-brands fa-square-instagram",
    twitter: "fa-brands fa-square-x-twitter",
    discord: "fa-brands fa-discord",
  };
  const actulizatDatosSito = (data) => {
    setTituloPagina(data.tituloPagina);
    setEncabezado(data.encabezado);
    setDetalles(data.detalles);
    setTituloNosotros(data.tituloNosotros);
    setFondoNosotros(data.fondoNosotros);
    setFondoPagina(data.fondoPagina);
    setAcercaDeNosotros(data.acercaDeNosotros);
    setImagenReclutamiento(data.imagenReclutamiento);
    setImagenFacebook(data.imagenFacebook);
    setNombreRedSocial(data.nombreRedSocial);
    setMensajeSeguirRedSocial(data.mensajeSeguirRedSocial);
    setMensajeReclutamiento(data.MensajeReclutamiento);
    const convertirLinks =
      data.enlacesRedesSociales !== ""
        ? JSON.parse(data.enlacesRedesSociales)
            .map(({ enlace }) => enlace)
            .join("\n")
        : "";
    setLinksRedesSociales(convertirLinks);
    setActivoReclutamiento(data.activoReclutamiento);
  };
  useEffect(() => {
    const solicitarDatosSitio = async () => {
      try {
        const res = await urlAxios.get(
          "/underwordliellanovels/configuracion-sitio"
        );
        actulizatDatosSito(res.data);
      } catch (error) {
        toastify(error.response.data.msg, false);
      }
      setLoading(false);
    };
    solicitarDatosSitio();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const enlacesRedesSocialesArr = [];
    const actulizarLinks = linksRedesSociales.split("\n");
    actulizarLinks.forEach((link) => {
      for (const redSocial in redesSocialesIconos) {
        if (link.includes(redSocial)) {
          enlacesRedesSocialesArr.push({
            enlace: link,
            icon: redesSocialesIconos[redSocial],
          });
          break;
        }
      }
    });
    const enlacesRedesSociales = JSON.stringify(enlacesRedesSocialesArr);
    const datos = {
      tituloPagina,
      encabezado,
      detalles,
      tituloNosotros,
      fondoNosotros,
      fondoPagina,
      acercaDeNosotros,
      imagenReclutamiento,
      imagenFacebook,
      nombreRedSocial,
      mensajeSeguirRedSocial,
      MensajeReclutamiento,
      enlacesRedesSociales,
      activoReclutamiento,
    };
    try {
      const res = await urlAxios.put(
        "/underwordliellanovels/configuracion-sitio",
        { datos }
      );
      actulizatDatosSito(res.data);
      toastify("Datos actualizados", true);
    } catch (error) {
      toastify(error.response.data.msg, false);
    }
  };
  if (loading) return <Loading />;
  return (
    <section className={`content p-2 bg-zinc-100 ${activeDark ? "dark" : ""}`}>
      <NavbarSlider />
      <form
        className={`w-11/12 sm:w-8/12 p-2 ${
          activeDark ? "bg-gray-800" : "bg-white"
        }  shadow-lg rounded-lg m-auto`}
        onSubmit={handelSubmit}
      >
        <div className="flex flex-row text-center justify-center items-center w-11/12">
          <h2 className="text-3xl text-center flex justify-center items-center text-green-400 font-bold">
            Modificar datos del sitio
          </h2>
        </div>
        <div className="form_add_content">
          <label
            htmlFor="titulo"
            className={` font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Nombre de la web
          </label>
          <input
            type="text"
            placeholder="nombre"
            id="titulo"
            className="border rounded h-10 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={tituloPagina}
            onChange={(e) => setTituloPagina(e.target.value.replace(/´/g, ""))}
          />
        </div>
        <div className="form_add_content">
          <label
            htmlFor="titulo"
            className={` font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Encabezado
          </label>
          <input
            type="text"
            placeholder="encabezado"
            id="titulo"
            className="border rounded h-10 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={encabezado}
            onChange={(e) => setEncabezado(e.target.value.replace(/´/g, ""))}
          />
        </div>
        <div className="form_add_content">
          <label
            htmlFor="titulo"
            className={` font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Detalles en ingles
          </label>
          <input
            type="text"
            placeholder="detalles"
            id="titulo"
            className="border rounded h-10 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value.replace(/´/g, ""))}
          />
        </div>
        <div className="form_add_content">
          <label
            htmlFor="titulo"
            className={` font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Titulo sobre Nosotros
          </label>
          <input
            type="text"
            placeholder="tituloNosotros"
            id="titulo"
            className="border rounded h-10 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={tituloNosotros}
            onChange={(e) => tituloNosotros(e.target.value.replace(/´/g, ""))}
          />
        </div>
        <div className="w-12/12 p-2 grid md:grid-cols-2 md:gap-2 m-auto">
          <input
            type="text"
            className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
            placeholder="fondo Nosotros"
            value={fondoNosotros}
            onChange={(e) => setFondoNosotros(e.target.value)}
          />
          <input
            type="text"
            className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
            placeholder="fondo Pagina"
            value={fondoPagina}
            onChange={(e) => setFondoPagina(e.target.value)}
          />
        </div>
        <div className="form_add_content">
          <label
            htmlFor="generos"
            className={`font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            AcercaDeNosotros
          </label>
          <textarea
            type="text"
            placeholder="acercaDeNosotros"
            id="generos"
            className="border rounded h-36 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={acercaDeNosotros}
            onChange={(e) => setAcercaDeNosotros(e.target.value)}
          />
        </div>

        <div className="w-12/12 p-2 grid md:grid-cols-2 md:gap-2 m-auto">
          <input
            type="text"
            className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
            placeholder="imagen Reclutamiento"
            value={imagenReclutamiento}
            onChange={(e) => setImagenReclutamiento(e.target.value)}
          />
          <input
            type="text"
            className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
            placeholder="imagen Facebook"
            value={imagenFacebook}
            onChange={(e) => setImagenFacebook(e.target.value)}
          />
          <input
            type="text"
            className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
            placeholder="nombreRedSocial"
            value={nombreRedSocial}
            onChange={(e) => setNombreRedSocial(e.target.value)}
          />
          <input
            type="text"
            className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
            placeholder="activoReclutamiento"
            value={activoReclutamiento}
            onChange={(e) => setActivoReclutamiento(e.target.value)}
          />
        </div>
        <div className="form_add_content">
          <label
            htmlFor="generos"
            className={`font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Mensaje Seguir RedSocial
          </label>
          <textarea
            type="text"
            placeholder="mensajeSeguirRedSocial"
            id="generos"
            className="border rounded h-12 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={mensajeSeguirRedSocial}
            onChange={(e) => setMensajeSeguirRedSocial(e.target.value)}
          />
        </div>

        <div className="form_add_content">
          <label
            htmlFor="generos"
            className={`font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Mensaje de Reclutamiento
          </label>
          <textarea
            type="text"
            placeholder="MensajeReclutamiento"
            id="generos"
            className="border rounded h-16 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={MensajeReclutamiento}
            onChange={(e) => setMensajeReclutamiento(e.target.value)}
          />
        </div>
        <div className="form_add_content">
          <label
            htmlFor="generos"
            className={`font-bold w-12/12 ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Links de la redes sociales
          </label>
          <textarea
            type="text"
            placeholder="LinksRedesSociales"
            id="generos"
            className="border rounded h-20 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={linksRedesSociales}
            onChange={(e) => setLinksRedesSociales(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center pt-2">
          <button
            type="submit"
            value="Actualizar datos"
            className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
          >
            Actualizar datos
          </button>
        </div>
      </form>
    </section>
  );
};

export default ConfiguracionSitio;
