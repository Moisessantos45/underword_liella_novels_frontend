import { useState } from "react";
import { Link } from "react-router-dom";

const Recomendaciones = ({ recomendacions }) => {
  const [datos, setDatos] = useState([]);
  return (
    <>
      <section className="w-10/12 flex justify-center items-center flex-wrap text-center margin">
        <div className="w-full h-8 flex text-center text-2xl font-bold m-2">
          <h1 className="text-center flex">Recomendaciones</h1>
        </div>
        {recomendacions.map((item, i) => (
          <figure
            key={i}
            className="flex flex-col justify-center items-center w-44 m-2"
          >
            <Link to={`/novela/${item.clave}`} className="flex w-full">
              {" "}
              <img src={item.imagen} alt="" className="w-full cursor-pointer" />
            </Link>
          </figure>
        ))}
      </section>
    </>
  );
};

export default Recomendaciones;
