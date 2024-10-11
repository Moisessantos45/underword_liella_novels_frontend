import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAdmin from "@/hooks/useAdmin";
import NavbarSlider from "@/components/NavbarSlider";
import Loading from "@/components/Loading";
import { toastify } from "@/utils/Utils.js";
import { errorHandle } from "@/Services/errorHandle.js";
import { useDataSiteHome } from "@/Store/DataSiteHome";
import supabase from "@/config/supabase";
import { isBoolean } from "@/utils/Utils";

const ConfiguracionSitio = () => {
  const { activeDark } = useAdmin();
  const { changeStatusSite } = useDataSiteHome();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
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
  const [isMaintenanceMode, setIsMaintenanceMode] = useState("true");

  const queryClient = useQueryClient();

  const redesSocialesIconos = {
    facebook: "fa-brands fa-facebook",
    instagram: "fa-brands fa-square-instagram",
    twitter: "fa-brands fa-square-x-twitter",
    discord: "fa-brands fa-discord",
  };
  const actulizatDatosSito = (data) => {
    setId(data.id);
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
    setActivoReclutamiento(JSON.stringify(data.activoReclutamiento));
    setIsMaintenanceMode(JSON.stringify(data.isMaintenanceMode));
  };

  useEffect(() => {
    const solicitarDatosSitio = async () => {
      try {
        let { data, error } = await supabase
          .from("InicioWebInfo")
          .select("*")
          .single();

        if (error) throw error;

        actulizatDatosSito(data);
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
      activoReclutamiento: isBoolean(activoReclutamiento),
      isMaintenanceMode: isBoolean(isMaintenanceMode),
    };
    try {
      const { data, error } = await supabase
        .from("InicioWebInfo")
        .update(datos)
        .eq("id", id)
        .single();

      if (error) throw error;

      actulizatDatosSito(data);
      toastify("Datos actualizados", true);
    } catch (error) {
      errorHandle(error);
    }
  };

  const changesStatus = async (e) => {
    if (e.target.value !== "") {
      setIsMaintenanceMode(e.target.value);
      await changeStatusSite(e.target.value);
      queryClient.invalidateQueries({
        queryKey: ["fetchSite"],
      });
    }
  };

  if (loading) return <Loading />;
  return (
    <section className={`content p-2 bg-zinc-100 ${activeDark ? "dark" : ""}`}>
      <NavbarSlider />
      <form
        className={`w-11/12 sm:w-8/12 p-2 ${
          activeDark ? "bg-gray-800" : "bg-white"
        } shadow-lg rounded-lg mx-auto`}
        onSubmit={handelSubmit}
      >
        <div className="flex justify-center items-center w-11/12">
          <h2 className="text-3xl text-center text-green-400 font-bold">
            Modificar datos del sitio
          </h2>
        </div>
        <div className=" w-11/12 mx-auto">
          <label
            htmlFor="titulo"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Nombre de la web
          </label>
          <input
            type="text"
            placeholder="Nombre"
            id="titulo"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={tituloPagina}
            onChange={(e) => setTituloPagina(e.target.value.replace(/´/g, ""))}
          />
        </div>
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="encabezado"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Encabezado
          </label>
          <input
            type="text"
            placeholder="Encabezado"
            id="encabezado"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={encabezado}
            onChange={(e) => setEncabezado(e.target.value.replace(/´/g, ""))}
          />
        </div>
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="detalles"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Detalles en inglés
          </label>
          <input
            type="text"
            placeholder="Detalles"
            id="detalles"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={detalles}
            onChange={(e) => setDetalles(e.target.value.replace(/´/g, ""))}
          />
        </div>
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="tituloNosotros"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Título sobre Nosotros
          </label>
          <input
            type="text"
            placeholder="Título Nosotros"
            id="tituloNosotros"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={tituloNosotros}
            onChange={(e) =>
              setTituloNosotros(e.target.value.replace(/´/g, ""))
            }
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-2 w-11/12 mx-auto py-2">
          <input
            type="text"
            placeholder="Fondo Nosotros"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={fondoNosotros}
            onChange={(e) => setFondoNosotros(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fondo Página"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={fondoPagina}
            onChange={(e) => setFondoPagina(e.target.value)}
          />
        </div>
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="acercaDeNosotros"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Acerca De Nosotros
          </label>
          <textarea
            placeholder="Acerca De Nosotros"
            id="acercaDeNosotros"
            className="border rounded h-36 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={acercaDeNosotros}
            onChange={(e) => setAcercaDeNosotros(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-2 w-11/12 mx-auto">
          <input
            type="text"
            placeholder="Imagen Reclutamiento"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={imagenReclutamiento}
            onChange={(e) => setImagenReclutamiento(e.target.value)}
          />
          <input
            type="text"
            placeholder="Imagen Facebook"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={imagenFacebook}
            onChange={(e) => setImagenFacebook(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre Red Social"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={nombreRedSocial}
            onChange={(e) => setNombreRedSocial(e.target.value)}
          />
          <input
            type="text"
            placeholder="Activo Reclutamiento"
            className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
            value={activoReclutamiento}
            onChange={(e) => setActivoReclutamiento(e.target.value)}
          />
        </div>
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="mensajeSeguirRedSocial"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Mensaje Seguir Red Social
          </label>
          <textarea
            placeholder="Mensaje Seguir Red Social"
            id="mensajeSeguirRedSocial"
            className="border rounded h-12 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={mensajeSeguirRedSocial}
            onChange={(e) => setMensajeSeguirRedSocial(e.target.value)}
          />
        </div>
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="mensajeReclutamiento"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Mensaje de Reclutamiento
          </label>
          <textarea
            placeholder="Mensaje de Reclutamiento"
            id="mensajeReclutamiento"
            className="border rounded h-16 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={MensajeReclutamiento}
            onChange={(e) => setMensajeReclutamiento(e.target.value)}
          />
        </div>
        <div className="w-11/12 mx-auto">
          <label
            htmlFor="linksRedesSociales"
            className={`font-bold w-full ${
              activeDark ? "text-white" : "text-slate-600"
            }`}
          >
            Links de las redes sociales
          </label>
          <textarea
            placeholder="Links de las redes sociales"
            id="linksRedesSociales"
            className="border rounded h-20 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
            value={linksRedesSociales}
            onChange={(e) => setLinksRedesSociales(e.target.value)}
          />
        </div>
        <div className="py-4 w-11/12 text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent focus:border-green-500 rounded-lg flex gap-4 items-center text-sm mx-auto">
          <div className="w-full">
            <h1
              className={` ${
                activeDark ? "text-slate-200" : "text-slate-900"
              } text-xs `}
            >
              Modo de mantenimiento
            </h1>
          </div>
          <input
            type="radio"
            name="maintenanceMode"
            id="disabledMode"
            value="false"
            checked={isMaintenanceMode === "false"}
            onChange={changesStatus}
            className="w-6 h-6 text-gray-50 border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
          />
          <label
            htmlFor="disabledMode"
            className={`${activeDark ? "text-slate-300" : "text-slate-900"} `}
          >
            Deshabilitado
          </label>
          <input
            type="radio"
            name="maintenanceMode"
            id="enabledMode"
            value="true"
            checked={isMaintenanceMode === "true"}
            onChange={changesStatus}
            className="w-6 h-6 text-gray-50 border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
          />
          <label
            htmlFor="enabledMode"
            className={`${activeDark ? "text-slate-300" : "text-slate-900"} `}
          >
            Habilitado
          </label>
        </div>
        <div className="flex justify-center items-center pt-2">
          <button
            type="submit"
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
