import { useState } from "react";
import NavbarSlider from "../components/NavbarSlider";
import urlAxios from "../config/urlAxios";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";


const ContainerIlustraciones = () => {
  const {
    enviarDatos,
    novelasInfo,
    setNovelasInfo,
    activeDark,
  } = useAdmin();
  const { webIlustraciones } = useAuth();
  const [loader, setLoader] = useState(false);
  const [active, setEditar] = useState(false);
  const [index, setIndex] = useState(0);
  const [url_ilustracion, setUrl] = useState("");
  const tipo = "ilustraciones";
  // console.log(webIlustraciones);
  //   const imagenes = webIlustraciones
  //     .filter(Boolean)
  //     .flatMap((cadena) => cadena.split(",")).filter(item=>item.startsWith("https:"))

  //   console.log(imagenes);
  const ilustracionesConClaves = webIlustraciones.map((item) => ({
    clave: item.clave,
    urls: item.ilustraciones
      .split(",")
      .filter((url) => url.trim().startsWith("https:"))
      .map((url) => url.trim()),
    id: item.id,
  }));
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
  const habilitarEdicion = (url, i) => {
    setUrl(url);
    setIndex(i);
    setEditar(!active);
  };
  // if (!loader) return <Loading />;
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="flex justify-evenly flex-wrap gap-2 overflow-y-auto scroll_items">
          {ilustracionesConClaves.map(
            (ilustracion, i) =>
              ilustracion.urls.length > 0 && (
                <div
                  key={i}
                  className="flex gap-2 m-2 items-center justify-evenly w-full flex-wrap transition-all"
                >
                  {ilustracion.urls.map((url, j) => (
                    <div key={j} className="flex items-center flex-col">
                      <img src={url} alt="" className="w-auto h-44 shadow-xl" />
                      <p
                        className={`${
                          activeDark ? "text-white" : "text-black"
                        }`}
                      >
                        {ilustracion.clave}
                      </p>
                      <div className="flex justify-center items-center">
                        <button
                          className=" w-20 items-center justify-center m-1 h-7 bg-blue-600 rounded-lg flex "
                          onClick={() => habilitarEdicion(url, j)}
                        >
                          Editar
                        </button>
                        <button
                          className="  w-20 items-center justify-center m-1 h-7 bg-rose-700 rounded-lg flex "
                          onClick={() => handelDelete(url, ilustracion.clave)}
                        >
                          Eliminar
                        </button>
                      </div>
                      {active && index == j ? (
                        <div className=" w-full h-18 transition-all items-center flex m-1 flex-wrap justify-center text-white shadow-xl shadow-gray-300 rounded-lg ">
                          <input
                            type="text"
                            className="text-black outline m-1 border-none outline-1 outline-neutral-400 rounded-lg hover:outline-neutral-400"
                            value={url_ilustracion}
                            onChange={(e) => setUrl(e.target.value)}
                          />
                          <button
                            className=" w-20 items-center justify-center m-1 h-7 bg-blue-600 rounded-lg flex"
                            onClick={() =>
                              handelEditar(
                                url,
                                ilustracion.clave,
                                ilustracion.id
                              )
                            }
                          >
                            Actualizar
                          </button>
                          <button
                            className="  w-20 items-center justify-center m-1 h-7 bg-rose-600 rounded-lg flex "
                            onClick={() => setEditar(!active)}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              )
          )}
        </section>
      </section>
    </>
  );
};

export default ContainerIlustraciones;
