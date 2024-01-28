import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Cards.css";
import Banner_inferior from "./Banner_inferior";
import urlAxios from "../config/urlAxios";
import Loading from "./Loading";
import Nosotros from "./Nosotros";

const Cards = () => {
  const [datos, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const peticion = async () => {
      const { data } = await urlAxios("/paginas");
      setData(data);
      setFilteredData(data);
      setLoader(true);
    };
    peticion();
  }, []);
  useEffect(() => {
    document.title =  "UnderWordLiellaNovels";
  }, []);
  if (!loader) return <Loading />;

  return (
    <>
      <Nosotros />
      <section className="col-novels">
        <div className=" w-full flex justify-center items-center text-2xl">
          <h1 className="title1">Novelas Ligeras en Traduccion</h1>
        </div>
        {datos.length > 0 &&
          datos.map((item) => (
            <figure key={item.id} className="cards">
              <span className=" flex justify-center items-center h-5 w-9 bg-red-600 absolute top-1 left-1 rounded-md">
                {item.tipo}
              </span>
              <Link to={`/novela/${item.clave}`}>
                <img src={item.imagen} alt="" className="img_bg" />
              </Link>
              <h4 className=" font-bold">
                {item.titulo}
              </h4>
            </figure>
          ))}
      </section>

      <Banner_inferior />
    </>
  );
};

export default Cards;
