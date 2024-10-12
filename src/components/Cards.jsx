import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { dbFirebaseLite } from "../config/firebase";
import "@/css/Cards.css";
import Banner_inferior from "./Banner_inferior";
import Loading from "./Loading";
import Nosotros from "./Nosotros";
import { useQuery } from "@tanstack/react-query";

const Cards = () => {
  const [datos, setData] = useState([]);

  const getCards = async () => {
    try {
      const docs = await getDocs(collection(dbFirebaseLite, "Novelas"));
      const data = docs.docs.map((doc) => doc.data());
      setData(data);
      return data;
    } catch (error) {
      setData([]);
      return [];
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["getCards"],
    queryFn: getCards,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  useEffect(() => {
    document.title = "UnderWordLiellaNovels";
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Nosotros />
      <section className="col-novels">
        <div className=" w-full flex justify-center items-center text-center">
          <h1 className=" text-3xl sm:text-4xl">Novelas Ligeras en Traduccion</h1>
        </div>

        {datos.length > 0 &&
          datos.map((item) => (
            <figure key={item.id} className="cards">
              <span className=" flex justify-center items-center h-5 w-9 bg-red-600 absolute top-1 left-1 rounded-md">
                {item.tipo}
              </span>
              <Link
                to={`/novela/${item.id}?nombre=${encodeURIComponent(
                  item.titulo
                )}`}
              >
                <img src={item.imagen} alt="" className="img_bg" />
              </Link>
              <h4 className=" font-bold">{item.titulo}</h4>
            </figure>
          ))}
      </section>
      <Banner_inferior />
    </>
  );
};

export default Cards;
