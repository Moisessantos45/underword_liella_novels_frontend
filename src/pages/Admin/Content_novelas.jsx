import { useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import NavbarSlider from "@/components/NavbarSlider";
import urlAxios from "@/config/urlAxios.js";
import ModalConfirm from "@/components/ModalConfirm";
import { errorHandle } from "@/Services/errorHandle.js";
import NovelaCard from "@/components/NovelaCard";
import useInteractionStore from "@/Store/InteractionStore";
import useNovelasStore from "@/Store/NovelasStore";

const Content_novelas = () => {
  const { novelas } = useNovelasStore();
  const { obtenerDatos, eliminarDatos, setNovelasInfo, activeDark } =
    useAdmin();

  const [isOpen, setIsOpen] = useState(null);
  const { isDrawerOpen } = useInteractionStore();

  const toggleAccordion = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const handelClick = async (id, active) => {
    try {
      const { data } = await urlAxios.put("/novelas/estado", {
        id,
        active,
      });
      const novelasActulizados = novelas.map((novela) =>
        novela.id == data.id ? data : novela
      );
      setNovelasInfo(novelasActulizados);
    } catch (error) {
      errorHandle(error);
    }
  };

  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="justify-evenly flex flex-wrap overflow-y-auto scroll_vertical scrollbar">
          {novelas.map((item, index) => (
            <NovelaCard
              key={index}
              item={item}
              index={index}
              isOpen={isOpen}
              toggleAccordion={toggleAccordion}
              handelClick={handelClick}
              obtenerDatos={obtenerDatos}
              eliminarDatos={eliminarDatos}
            />
          ))}
        </section>
        <div className="max-w-md mx-auto p-4"></div>
      </section>
      {isDrawerOpen && <ModalConfirm />}
    </>
  );
};

export default Content_novelas;
