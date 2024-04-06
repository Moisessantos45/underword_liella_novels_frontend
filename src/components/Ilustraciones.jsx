import useAdmin from "../hooks/useAdmin";
import NavbarSlider from "./NavbarSlider";
import { useState } from "react";
import urlAxios from "../config/urlAxios";
import Loading from "./Loading";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useQuery } from "@tanstack/react-query";

const toastify = (text, type) => {
  Toastify({
    text: `${text}`,
    duration: 3000,
    newWindow: true,
    // close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: type
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      borderRadius: "10px",
    },
  }).showToast();
};

const Ilustraciones = () => {
  const { activeDark } = useAdmin();
  const [imagenesWeb, setIlustraciones] = useState([]);
  // const [loading, setLoading] = useState(true);

  const solicitarIlustraciones = async () => {
    try {
      const { data } = await urlAxios(
        "/underwordliellanovels/solicitud_ilustraciones"
      );
      setIlustraciones(data);
      return data
    } catch (error) {
      setIlustraciones([]);
      return [];
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["ilsutraciones"],
    queryFn: solicitarIlustraciones,
    refetchInterval: 3000000,
    staleTime: 3000000,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toastify("Imagen copiada", true);
  };

  if (isLoading) return <Loading />;
  return (
    <section
      className={`content bg-zinc-100 text-black ${
        activeDark ? "dark" : ""
      } overflow-y-auto`}
    >
      <NavbarSlider />
      <div className="grid grid-cols-3 md:grid-cols-5 p-3 sm:p-2 gap-4 w-11/12 m-auto sm:h-auto h-screen">
        {imagenesWeb.length > 0 ? (
          imagenesWeb.map(({ imagen }, i) => (
            <div key={i} className="grid gap-4 relative">
              <img
                onClick={() => copyUrl(imagen)}
                className="h-auto max-w-full rounded-lg cursor-pointer"
                src={imagen}
                alt=""
              />
              <span className=" absolute font-bold text-[10px] bg-pink-600 w-10 rounded-md h-5 items-center justify-center flex text-white">
                Click
              </span>
            </div>
          ))
        ) : (
          <h1>No se lograron cargar</h1>
        )}
      </div>
    </section>
  );
};

export default Ilustraciones;
