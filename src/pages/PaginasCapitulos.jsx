import useAdmin from "../hooks/useAdmin";
import urlAxios from "../config/urlAxios.js";
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
  const { setBackg, setTitleNabvar } = useAdmin();
  const [capit, setCapi] = useState([]);
  const [loader, setLoader] = useState(true);
  const [tamanio, setTamanio] = useState();

  const params = useParams();
  const { idNovel, capitulo } = params;

  const obtenerCapitulo = async (idNovel, capitulo) => {
    try {
      const { data } = await urlAxios(`/capitulo/${idNovel}/${capitulo}`);
      setTitleNabvar({ title: `${data.data?.titulo}` });
      setCapi(data.data);
      setTamanio(+data.cont);

      setLoader(false);
    } catch (error) {
      setCapi([]);
    }
    setLoader(false);
  };
  useEffect(() => {
    document.title = capit.titulo || "UnderWordLiellaNovels";
  }, [capitulo]);

  useEffect(() => {
    obtenerCapitulo(idNovel, capitulo);
    setBackg("https://i.ibb.co/HVhttGK/texto-degradado.jpg");
  }, [idNovel, capitulo]);

  if (loader) return <Loading />;
  const contenidoFormateado = capit.titulo
    ? formatearTextoConImagenes(capit.contenido)
    : "";
  return (
    <>
      {capit.titulo ? (
        <>
          <NavbarChapters />
          <section className="margin w-11/12 flex justify-center flex-col items-center">
            <div className="line bg-white"></div>
            <h1 className=" text-center sm:text-xl font-bold">
              {capit.titulo}
            </h1>
            <div className="line bg-white"></div>
          </section>
          <section className="container_capi">
            {contenidoFormateado || <h1>Capitulo no disponible</h1>}
            <div className="line"></div>
            <div className="naveg">
              {+capitulo > 1 && (
                <button className="previuos">
                  <img src={previuos} alt="" />
                  <Link
                    className="btn_naveg font-bold"
                    to={`/capitulo/${idNovel}/${
                      +capitulo - 1
                    }?novela=${encodeURIComponent(capit.titulo)}`}
                  >
                    Previous
                  </Link>
                </button>
              )}
              <button className="home">
                <Link className="btn_naveg btn_naveg-link font-bold" to={`/`}>
                  Inicio
                  <img src={home} alt="" />
                </Link>
              </button>
              {+capitulo < tamanio && (
                <button className="next">
                  <Link
                    className="btn_naveg font-bold"
                    to={`/capitulo/${idNovel}/${
                      +capitulo + 1
                    }?novela=${encodeURIComponent(capit.titulo)}`}
                  >
                    Previous
                  </Link>
                  <img src={next} alt="" />
                </button>
              )}
            </div>
          </section>
        </>
      ) : (
        <h1 className=" text-center">Capitulo no disponible</h1>
      )}
    </>
  );
};

export default PaginasCapitulos;
