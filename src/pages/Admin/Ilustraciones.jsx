import useAdmin from "@/hooks/useAdmin.jsx";
import NavbarSlider from "@/components/NavbarSlider.jsx";
import { useState } from "react";
import urlAxios from "@/config/urlAxios.js";
import Loading from "@/components/Loading.jsx";
import { useQuery } from "@tanstack/react-query";
import { toastify } from "@/utils/Utils.js";

const Ilustraciones = () => {
  const { activeDark } = useAdmin();
  const [imagenesWeb, setIlustraciones] = useState([]);
  // const [loading, setLoading] = useState(true);

  const solicitarIlustraciones = async () => {
    try {
      const { data } = await urlAxios("/admin/solicitud_ilustraciones");
      setIlustraciones(data);
      return data;
    } catch (error) {
      setIlustraciones([]);
      return [];
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["ilsutraciones"],
    queryFn: solicitarIlustraciones,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    retry: 0,
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
