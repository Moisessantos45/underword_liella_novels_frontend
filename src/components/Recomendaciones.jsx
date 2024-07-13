import { Link, useParams } from "react-router-dom";
import urlAxios from "../config/urlAxios.js";
import { useQuery } from "@tanstack/react-query";

const Recomendaciones = () => {
  const params = useParams();
  const { idNovel } = params;

  const getRecomendation = async () => {
    try {
      const respuesta = await urlAxios(
        `/paginas/novela/recomendaciones/${idNovel}`
      );
      return respuesta.data;
    } catch (error) {
      return [];
    }
  };

  const { data: recomendacions } = useQuery({
    queryKey: ["recomendaciones", idNovel],
    queryFn: getRecomendation,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (recomendacions && recomendacions.length > 0)
    return (
      <section
        className={`sm:w-10/12 w-11/12 ${
          recomendacions.length > 0 ? "flex" : "hidden"
        } justify-center items-center flex-wrap text-center margin py-4 rounded-lg shadow-sm bg-[#2f2f2f]`}
      >
        <div className="w-full h-8 flex justify-center text-center text-2xl font-bold mb-4">
          <h1 className="text-center flex text-white">Recomendaciones</h1>
        </div>
        {recomendacions.map((item, i) => (
          <figure
            key={i}
            className="flex flex-col justify-center items-center sm:w-44 w-40 m-2 p-2 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              to={`/novela/${item.id}?nombre=${encodeURIComponent(
                item.titulo
              )}`}
              className="flex w-full"
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-full cursor-pointer rounded-lg"
              />
            </Link>
          </figure>
        ))}
      </section>
    );
};

export default Recomendaciones;
