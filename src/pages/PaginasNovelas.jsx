import { useParams } from "react-router-dom";
import urlAxios from "../config/urlAxios";
import { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import Ilustraciones from "../components/Ilustraciones";
import CardsVol from "../components/CardsVol";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";
import NavbarPaginas from "../components/NavbarPaginas";
import ContentCapit from "../components/ContentCapit";
import Recomendaciones from "../components/Recomendaciones";
import Personajes from "../components/Personajes";
import Comentarios from "../components/Comentarios";
import NavbarPage from "../components/NavbarPage";

const PaginasNovelas = () => {
  const [loader, setLoader] = useState(false);
  const [novela, setNovela] = useState({});
  const { bgNovel, setBackg, setTitleNabvar } = useAdmin();
  const [capit, setCapi] = useState(false);
  const params = useParams();
  const { clave } = params;
  useEffect(() => {
    const peticion = async () => {
      try {
        const respuesta = await urlAxios(`/paginas/novela/${clave}`);
        setNovela(respuesta.data);
        // console.log(respuesta);
        const bg = `${respuesta.data.info.backgroud}`;
        setBackg(bg);
        setTitleNabvar({ title: respuesta.data.info.titulo });
        setCapi(respuesta.data.capi.length > 0);
        setLoader(true);
        console.log(respuesta);
      } catch (error) {
        console.log(error);
      }
    };
    peticion();
  }, [clave]);
  useEffect(() => {
    document.title = novela.info?.titulo || "UnderWordLiellaNovels";
    // document.querySelector("body").classList.toggle("color");
  }, [clave]);
  if (!loader) return <Loading />;
  return (
    <>
      {/* <NavbarPaginas /> */}
      <TablaInfo key={novela.info.nombre} datos={novela.info} />
      {/* {novela.info.titulo.split(" ").includes("Refined") ? <Personajes /> : ""} */}
      {capit ? <ContentCapit key={novela.info.id} capi={novela.capi} /> : ""}
      {/* <Ilustraciones key={novela.info.clave} datos={novela.info} /> */}
      {novela.info?.id && novela.info?.backgroud.startsWith("https") ? (
        <figure className="backgraoud">
          <img src={bgNovel} alt="" />
        </figure>
      ) : (
        ""
      )}
      {novela.card.length > 0 ? (
        <CardsVol key={novela.card.id} datos={novela.card} info={novela.capi} />
      ) : (
        ""
      )}
      {novela.recomendaciones.length ? (
        <Recomendaciones
          key={novela.recomendaciones.id}
          recomendacions={novela.recomendaciones}
        />
      ) : (
        ""
      )}
      <Comentarios />
      <NavbarPage/>
    </>
  );
};

export default PaginasNovelas;
