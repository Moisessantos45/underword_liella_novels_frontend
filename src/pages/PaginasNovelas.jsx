import { useParams } from "react-router-dom";
import urlAxios from "../config/urlAxios";
import { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import CardsVol from "../components/CardsVol";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";
import ContentCapit from "../components/ContentCapit";
import Recomendaciones from "../components/Recomendaciones";3
import Comentarios from "../components/Comentarios";
import NavbarPage from "../components/NavbarPage";

const PaginasNovelas = () => {
  const [loader, setLoader] = useState(true);
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
        setLoader(false);
        // console.log(respuesta);
      } catch (error) {
        setNovela({});
      }
      setLoader(false);
    };
    peticion();
  }, [clave]);
  useEffect(() => {
    document.title = novela.info?.titulo || "UnderWordLiellaNovels";
  }, [clave]);
  if (loader) return <Loading />;
  return (
    <>
      <TablaInfo key={novela.info.nombre} datos={novela.info} />
      {capit ? <ContentCapit key={novela.info.id} capi={novela.capi} /> : ""}
      {novela.info?.id && novela.info?.backgroud.startsWith("https") ? (
        <figure className="backgraoud">
          <img src={bgNovel} alt="" />
        </figure>
      ) : (
        ""
      )}
      <CardsVol />
      <Recomendaciones />
      <Comentarios />
      <NavbarPage />
    </>
  );
};

export default PaginasNovelas;
