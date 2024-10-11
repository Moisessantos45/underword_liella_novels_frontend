import useAdmin from "@/hooks/useAdmin.jsx";
import NavbarSlider from "@/components/NavbarSlider.jsx";
import { useState } from "react";
import Loading from "@/components/Loading.jsx";
import { useQuery } from "@tanstack/react-query";
import { toastify } from "@/utils/Utils.js";
import useNovelasStore from "@/Store/NovelasStore";
import useVolumensStore from "@/Store/VolumensStore";
import { extractIllustrations } from "@/Services/useService";

const Ilustraciones = () => {
  const { activeDark } = useAdmin();
  const { novelas } = useNovelasStore();
  const { volumens } = useVolumensStore();

  const [imagenesWeb, setIlustraciones] = useState([]);

  const solicitarIlustraciones = async () => {
    try {
      const illustrationsList = [
        ...extractIllustrations(novelas),
        ...extractIllustrations(volumens),
      ];
      setIlustraciones(illustrationsList);

      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(1000);
      return illustrationsList;
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
            <div key={i + 1} className="grid gap-4 relative">
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
