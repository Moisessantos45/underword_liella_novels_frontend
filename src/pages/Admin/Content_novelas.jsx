import { useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import NavbarSlider from "@/components/NavbarSlider";
import urlAxios from "@/config/urlAxios.js";
import ModalConfirm from "@/components/ModalConfirm";
import { errorHandle } from "@/Services/errorHandle.js";
import NovelaCard from "@/components/NovelaCard";

const Content_novelas = () => {
  const {
    novelasInfo,
    obtenerDatos,
    eliminarDatos,
    setNovelasInfo,
    activeDark,
    confirmar_delate,
    mostrar_modal,
    setMostrar_modal,
  } = useAdmin();
  const { userType, userAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(null);
  const type = "novelas";

  const toggleAccordion = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };

  const handelClick = async (clave, active) => {
    try {
      const { data } = await urlAxios.put("/novelas/estado", { clave, active });
      const novelasActulizados = novelasInfo.map((novela) =>
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
          {novelasInfo.map((item, index) => (
            <NovelaCard
              key={index}
              item={item}
              index={index}
              isOpen={isOpen}
              toggleAccordion={toggleAccordion}
              handelClick={handelClick}
              userType={userType}
              userAuth={userAuth}
              obtenerDatos={obtenerDatos}
              setMostrar_modal={setMostrar_modal}
              confirmar_delate={confirmar_delate}
              eliminarDatos={eliminarDatos}
              type={type}
            />
          ))}
        </section>
        <div className="max-w-md mx-auto p-4"></div>
      </section>
      {mostrar_modal && <ModalConfirm />}
    </>
  );
};

export default Content_novelas;
