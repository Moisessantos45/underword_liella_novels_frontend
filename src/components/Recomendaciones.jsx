import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import urlAxios from "../config/urlAxios";
import { useQuery } from "@tanstack/react-query";

const Recomendaciones = () => {
  const [recomendacions, setRecomendaciones] = useState([]);
  const [loader, setLoader] = useState(true);
  const params = useParams();
  const { clave } = params;

  const getRecomendation = async () => {
    try {
      const respuesta = await urlAxios(
        `/paginas/novela/recomendaciones/${clave}`
      );
      // console.log(respuesta)
      setRecomendaciones(respuesta.data);
      setLoader(false);
      return respuesta.data;
    } catch (error) {
      setRecomendaciones([]);
      return [];
    }
  };
  useQuery({
    queryKey: ["recomendaciones", clave],
    queryFn: getRecomendation,
    refetchInterval: 3000000,
    staleTime: 3000000,
    retry: 0,
    refetchOnWindowFocus: false,
  });
  // if (loader) return <Loading />;
  return (
    <>
      <section
        className={`sm:w-10/12 w-11/12 ${
          recomendacions.length > 0 ? "flex" : "hidden"
        } justify-center items-center flex-wrap text-center margin`}
      >
        <div className="w-full h-8 flex justify-center text-center text-2xl font-bold m-2">
          <h1 className="text-center flex">Recomendaciones</h1>
        </div>
        {recomendacions.map((item, i) => (
          <figure
            key={i}
            className="flex flex-col justify-center items-center sm:w-44 w-40 m-2"
          >
            <Link to={`/novela/${item.clave}`} className="flex w-full">
              <img src={item.imagen} alt="" className="w-full cursor-pointer" />
            </Link>
          </figure>
        ))}
      </section>
    </>
  );
};

export default Recomendaciones;
