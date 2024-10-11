import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useQuery } from "@tanstack/react-query";
import "../css/CardsVol.css";
import { dbFirebaseLite } from "../config/firebase.js";
import Loading from "./Loading.jsx";

const CardsVol = () => {
  const params = useParams();
  const { idNovel } = params;

  const getCards = async () => {
    try {
      const q = query(
        collection(dbFirebaseLite, "Volumenes"),
        where("idNovel", "==", idNovel)
      );
      const documents = await getDocs(q);
      const data = documents.docs.map((doc) => doc.data());
      if (data.length === 0) return [];

      return data;
    } catch (error) {
      return [];
    }
  };

  const { isLoading, data: volumen } = useQuery({
    queryKey: ["cardsVol"],
    queryFn: getCards,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (isLoading) return <Loading />;
  if (volumen && volumen.length > 0)
    return (
      <section className="flex flex-wrap justify-center items-start bg-[#2f2f2f] p-4 rounded-lg shadow-sm">
        {volumen
          .sort((a, b) => Number(a.volumen) - Number(b.volumen))
          .map((vol) => (
            <figure
              className="bg-gray-800 m-4 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-60"
              key={vol.id}
            >
              <img
                src={vol.imagen}
                alt="imagen-volumen"
                className="w-full rounded-lg max-h-80"
              />
              <div className="text-white mt-4">
                <h4 className="text-center text-lg font-bold mb-2">
                  Volumen {vol.volumen}
                </h4>
                {vol.captiuloActive && (
                  <div className="flex items-center justify-center flex-wrap mb-2">
                    <p className="mr-2">{vol.capitulo}</p>
                    <Link
                      to={`/capitulo/${vol.idNovel}/1`}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      Leer
                    </Link>
                  </div>
                )}
                {vol.mega && (
                  <a
                    href={vol.mega}
                    className="block text-blue-500 hover:text-blue-400 mb-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mega
                  </a>
                )}
                {vol.mediafire && (
                  <a
                    href={vol.mediafire}
                    className="block text-blue-500 hover:text-blue-400 mb-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mediafire
                  </a>
                )}
                {vol.megaEpub && (
                  <a
                    href={vol.megaEpub}
                    className="block text-blue-500 hover:text-blue-400 mb-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mega Epub
                  </a>
                )}
                {vol.mediafireEpub && (
                  <a
                    href={vol.mediafireEpub}
                    className="block text-blue-500 hover:text-blue-400 mb-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mediafire Epub
                  </a>
                )}
              </div>
            </figure>
          ))}
      </section>
    );
};

export default CardsVol;
