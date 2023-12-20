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

const unirSimbolos = (texto) => {
  const symbols = ["◊◊◊", "◊◊", "◊", "$$$", "$$", "$", "**", "*"];
  let result = [];
  let preBlock = "";

  for (let line of texto.split("\n")) {
    let isSymbol = symbols.includes(line.trim());
    if (isSymbol) {
      if (preBlock !== "") {
        result.push(
          <pre key={result.length} className="whitespace-pre-line">
            {preBlock}
          </pre>
        );
        preBlock = "";
      }
      result.push(
        <span key={result.length} className="m-auto flex justify-center w-12">
          {line}
        </span>
      );
    } else {
      preBlock += line + "\n";
    }
  }

  if (preBlock !== "") {
    result.push(
      <pre key={result.length} className="whitespace-pre-line">
        {preBlock}
      </pre>
    );
  }

  return result;
};

function formatearTextoConImagenes(texto) {
  if (!new RegExp("https://i.ibb.co", "i").test(texto)) {
    return unirSimbolos(texto);
  }
  const fragmentos = texto.split("\nhttps://i.ibb.co");
  return fragmentos.flatMap((fragmento, i) => {
    if (i === 0) {
      return [unirSimbolos(fragmento)];
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
        unirSimbolos(resto),
      ];
    }
  });
}

const PaginasCapitulos = () => {
  const { bgNovel, setBackg, setTitleNabvar } = useAdmin();
  const [capit, setCapi] = useState([]);
  const [loader, setLoader] = useState(true);
  const [cont, setCont] = useState();
  const [tamanio, setTamanio] = useState();
  const params = useParams();
  const { clave, capitulo } = params;
  const obtenerCapitulo = async (clave, capitulo) => {
    try {
      const { data } = await urlAxios(
        `/pagina/capitulo/${clave}/${capitulo.toString()}`
      );
      setTitleNabvar({ title: `${data.data?.titulo}` });
      setCapi(data.data);
      setCont(Number(data.data.capitulo));
      setTamanio(Number(data.cont));
      setLoader(false);
    } catch (error) {
      setCapi([]);
      console.log(error);
    }
    setLoader(false);
  };
  useEffect(() => {
    document.title = capit.titulo || "UnderWordLiellaNovels";
  }, []);

  useEffect(() => {
    obtenerCapitulo(clave, capitulo);
    setCont(capitulo);
    setBackg("https://i.ibb.co/HVhttGK/texto-degradado.jpg");
  }, [clave, capitulo]);

  if (loader) return <Loading />;
  const contenidoFormateado = formatearTextoConImagenes(capit.contenido);
  return (
    <>
      <NavbarChapters />
      <section className="margin w-11/12 flex justify-center flex-col items-center">
        <div className="line bg-white"></div>
        <h1 className=" text-center sm:text-xl font-bold">{capit.titulo}</h1>
        <div className="line bg-white"></div>
      </section>
      <section className="container_capi">
        {/* <div dangerouslySetInnerHTML={{ __html: contenidoFormateado }} /> */}
        {contenidoFormateado || <h1>Ocurrion un error</h1>}
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
