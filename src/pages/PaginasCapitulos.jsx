import useAdmin from "../hooks/useAdmin";
import urlAxios from "../config/urlAxios";
import { Link, useParams } from "react-router-dom";
import home from "../img/home.png";
import previuos from "../img/previuos.png";
import next from "../img/next.png";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "../css/capitulos.css";
import NavbarChapters from "../components/NavbarChapters";

// function formatearTextoConImagenes(texto) {
//   const fragmentos = texto.split('<img src="');
//   return fragmentos.flatMap((fragmento, i) => {
//     if (i === 0) {
//       return [<pre key={i}>{fragmento}</pre>];
//     } else {
//       const [url, resto] = fragmento.split('" alt="">');
//       return [
//         <figure key={i}>
//           <img src={url} alt="" />
//         </figure>,
//         <pre key={i + 1}>{resto}</pre>,
//       ];
//     }
//   });
// }

function formatearTextoConImagenes(texto) {
  // console.log(texto)
  const fragmentos = texto.split("\nhttps://i.ibb.co");
  return fragmentos.flatMap((fragmento, i) => {
    if (i === 0) {
      return [<pre key={i}>{fragmento}</pre>];
    } else {
      const indiceEspacio = fragmento.indexOf("\n");
      const url = `https://i.ibb.co${
        indiceEspacio !== -1 ? fragmento.slice(0, indiceEspacio) : fragmento
      }`;
      const resto = indiceEspacio !== -1 ? fragmento.slice(indiceEspacio) : "";
      return [
        <figure key={i}>
          <img src={url.trim()} alt="" />
        </figure>,
        <pre key={i + 1}>{resto.trim()}</pre>,
      ];
    }
  });
}

const PaginasCapitulos = () => {
  const { bgNovel, setBackg, setTitleNabvar } = useAdmin();
  const [capit, setCapi] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cont, setCont] = useState();
  const [tamanio, setTamanio] = useState();
  const [primero, setPrimer] = useState();
  const params = useParams();
  const { clave, capitulo } = params;
  // setTitleNabvar({title:capit[cont]?.titulo})
  const obtenerCapitulo = async (clave, capitulo) => {
    try {
      const { data } = await urlAxios(`/pagina/capitulo/${clave}/${capitulo}`);
      console.log(data);
      setTitleNabvar({ title: `${data.data?.titulo}` });
      setCapi(data.data);
      setCont(data.data.capitulo);
      setTamanio(data.cont);
      setPrimer(data.primer);
      setLoader(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = capit.titulo || "UnderWordLiellaNovels";
    // document.querySelector("body").classList.toggle("color");
  }, []);

  useEffect(() => {
    obtenerCapitulo(clave, capitulo);
    setCont(capitulo);
    setBackg("https://i.ibb.co/HVhttGK/texto-degradado.jpg");
  }, [clave, capitulo]);

  if (!loader) return <Loading />;
  const contenidoFormateado = formatearTextoConImagenes(capit.contenido);
  console.log(cont, tamanio);
  return (
    <>
      <NavbarChapters />
      <section className="margin w-11/12 flex justify-center color flex-col items-center">
        <div className="line bg-white"></div>
        <h1 className=" text-center sm:text-xl font-bold">{capit.titulo}</h1>
        <div className="line bg-white"></div>
      </section>
      <section className="container_capi color">
        {/* <pre>{capit[cont]?.contenido}</pre> */}
        {contenidoFormateado}
        <div className="line"></div>
        <div className="naveg">
          {tamanio == 0 ? (
            cont > 0
          ) : cont > 1 ? (
            <div className="previuos">
              <img src={previuos} alt="" />
              <Link
                className="btn_naveg font-bold"
                to={`/capitulo/${clave}/${cont - 1}`}
              >
                Previous
              </Link>
            </div>
          ) : (
            ""
          )}
          <div className="home">
            <Link className="btn_naveg btn_naveg-link font-bold" to={`/`}>
              Inicio
              <img src={home} alt="" />
            </Link>
          </div>
          {cont !== tamanio ? (
            <div className="next">
              <Link
                className="btn_naveg font-bold"
                to={`/capitulo/${clave}/${cont + 1}`}
              >
                Previous
              </Link>
              <img src={next} alt="" />
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default PaginasCapitulos;
