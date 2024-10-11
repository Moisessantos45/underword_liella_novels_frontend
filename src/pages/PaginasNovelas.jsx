import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore/lite";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import TablaInfo from "../components/TablaInfo";
import CardsVol from "../components/CardsVol";
import useAdmin from "../hooks/useAdmin";
import Loading from "../components/Loading";
import ContentCapit from "../components/ContentCapit";
import Recomendaciones from "../components/Recomendaciones";
import Comentarios from "../components/Comentarios";
import NavbarPage from "../components/NavbarPage";
import CardsScans from "../components/CardsScans";
import { dbFirebaseLite } from "../config/firebase.js";

const PaginasNovelas = () => {
  const novelData = useRef({});
  const { bgNovel, setBackg, setTitleNabvar } = useAdmin();
  const [cards, setCards] = useState([]);
  const params = useParams();
  const { idNovel } = params;

  const peticion = async () => {
    try {
      const q = doc(dbFirebaseLite, "Novelas", idNovel);
      const documents = await getDoc(q);

      if (!documents.exists()) return {};
      const data = documents.data();
      novelData.current = data;
      const bg = `${data.backgroud}`;
      setBackg(bg);
      setTitleNabvar({ title: data.titulo });
      setCards(data.scans);
      return data;
    } catch (error) {
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
    document.title = novelData.current?.titulo || "UnderWordLiellaNovels";
  }, [idNovel]);

  if (isLoading) return <Loading />;
  return (
    <>
      <TablaInfo
        key={novelData.current.idNovel || ""}
        datos={novelData.current}
      />
      <ContentCapit key={novelData.current.id} />
      {novelData.current?.id &&
      novelData.current?.backgroud.startsWith("https") ? (
        <figure className="backgraoud">
          <img src={bgNovel} alt="" />
        </figure>
      ) : (
        ""
      )}
      <CardsScans cards={cards} />
      <CardsVol />
      {/* <Recomendaciones /> */}
      {/* <Comentarios /> */}
      <NavbarPage />
    </>
  );
};

export default PaginasNovelas;
