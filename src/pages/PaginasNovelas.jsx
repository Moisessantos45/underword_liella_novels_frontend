import { useParams } from "react-router-dom";
import urlAxios from "../config/urlAxios.js";
import { useEffect, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import CardsVol from "../components/CardsVol";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";
import ContentCapit from "../components/ContentCapit";
import Recomendaciones from "../components/Recomendaciones";
import Comentarios from "../components/Comentarios";
import NavbarPage from "../components/NavbarPage";
import { useQuery } from "@tanstack/react-query";
import CardsScans from "../components/CardsScans";

const PaginasNovelas = () => {
  const [novela, setNovela] = useState({});
  const { bgNovel, setBackg, setTitleNabvar } = useAdmin();
  const [capit, setCapi] = useState(false);
  const [cards, setCards] = useState([]);
  const params = useParams();
  const { idNovel } = params;

  const peticion = async () => {
    try {
      const respuesta = await urlAxios(`/paginas/novela/${idNovel}`);
      // console.log(respuesta.data);
      setNovela(respuesta.data);
      const bg = `${respuesta.data.info.backgroud}`;
      setBackg(bg);
      setTitleNabvar({ title: respuesta.data.info.titulo });
      setCapi(respuesta.data.capi.length > 0);
      setCards(respuesta.data.info.scans);

      return respuesta.data;
    } catch (error) {
      setNovela({});
      return {};
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["pageNovel", idNovel],
    queryFn: peticion,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    document.title = novela.info?.titulo || "UnderWordLiellaNovels";
  }, [idNovel]);

  if (isLoading) return <Loading />;
  return (
    <>
      <TablaInfo key={novela.info.nombre || ""} datos={novela.info} />
      {capit ? <ContentCapit key={novela.info.id} capi={novela.capi} /> : ""}
      {novela.info?.id && novela.info?.backgroud.startsWith("https") ? (
        <figure className="backgraoud">
          <img src={bgNovel} alt="" />
        </figure>
      ) : (
        ""
      )}
      <CardsScans cards={cards} />
      <CardsVol />
      <Recomendaciones />
      <Comentarios />
      <NavbarPage />
    </>
  );
};

export default PaginasNovelas;
