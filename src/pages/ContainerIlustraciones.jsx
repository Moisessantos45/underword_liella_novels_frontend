import { useState } from "react";
import urlAxios from "../config/urlAxios";
import useAdmin from "../hooks/useAdmin";

const ContainerIlustraciones = () => {
  const { enviarDatos, novelasInfo, setNovelasInfo, activeDark } = useAdmin();
  const [active, setEditar] = useState(false);
  const tipo = "ilustraciones";

  const handelEditar = (url, clave, id) => {
    const confir = confirm("si deseas actulizat la img");
    if (confir) {
      // console.log("eliminar", confir, url, clave, id);
      enviarDatos({ clave, url, id }, tipo);
    }
  };
  const handelDelete = async (url, clave) => {
    const confir = confirm("si deseas eliminar la img");
    if (!confir) {
      return;
    }
    console.log("eliminar", confir, url, clave);
    const urlCodificada = encodeURIComponent(url);
    try {
      const { data } = await urlAxios.delete(
        `novelas/ilustraciones/${urlCodificada}/${clave}`
      );
      const datosActulizados = novelasInfo.filter(
        (itens) => itens.id !== data.id
      );
      setNovelasInfo(datosActulizados);
    } catch (error) {
      // console.log(error);
    }
  };
  // if (!loader) return <Loading />;
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      ></section>
    </>
  );
};

export default ContainerIlustraciones;
