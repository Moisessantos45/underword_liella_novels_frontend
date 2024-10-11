import { useEffect, useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import NavbarSlider from "@/components/NavbarSlider";
import CustomSelect from "@/components/UI/CustomSelect";
import useNovelasStore from "@/Store/NovelasStore";
import useChaptersStore from "@/Store/ChaptersStore";
import { isNumber } from "@/utils/Utils";
import { showAlert } from "@/utils/Utils";

const Container_captitulo = () => {
  const { listNovelas } = useNovelasStore();
  const { itemChapter, setIsChanging, addChapter, updateChapter } =
    useChaptersStore();
  const { activeDark, setDatos } = useAdmin();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [capitulo, setCapitulos] = useState(0);
  const [id, setId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const findNovel = listNovelas.find(
      (novel) => novel.id === itemChapter.idNovel
    );
    setSelectedId(findNovel);
  }, []);

  useEffect(() => {
    if (itemChapter?.id && itemChapter?.idNovel) {
      setTitulo(itemChapter.titulo);
      setContenido(itemChapter.contenido);
      setCapitulos(itemChapter.capitulo);
      setId(itemChapter.id);
    }
  }, [itemChapter]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [titulo, contenido, capitulo, selectedId.id];
    const camposVacios = Object.entries(campos).filter(
      ([_, valor]) => typeof valor === "string" && valor.trim() === ""
    );

    if (camposVacios.length > 0) {
      showAlert(`Los siguientes campos están vacíos: ${camposVacios}`);
      return;
    }
    const isValidNumber = isNumber(capitulo);
    if (isValidNumber) {
      showAlert("El campo capitulo debe ser un número");
      return;
    }

    const newName = selectedId.titulo
      .split(" ")
      .slice(0, 4)
      .join(" ")
      .toLowerCase();
    const clave = selectedId.titulo
      .split(" ")
      .slice(0, 3)
      .join("_")
      .toLowerCase();
    const newData = {
      idNovel: selectedId.id,
      id,
      nombre: newName,
      clave,
      titulo,
      contenido,
      capitulo: Number(capitulo),
    };
    
    if (!itemChapter?.id) {
      await addChapter(newData);
    } else {
      await updateChapter(newData);
    }

    setTitulo("");
    setContenido("");
    setCapitulos(0);
    setSelectedId(null);
    setId(null);
    setDatos({});
    setIsChanging(false);
  };

  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        <NavbarSlider />
        <form
          className={`w-11/12 sm:w-8/12 p-2 md:mt-10 lg:mt-5 ${
            activeDark ? "bg-gray-800" : "bg-white"
          } shadow-lg rounded-lg m-auto`}
          onSubmit={handelSubmit}
        >
          <div className="w-full m-auto p-1 flex-col relative justify-center items-center">
            <CustomSelect
              options={listNovelas}
              placeholder="Selecciona la novela"
              onChange={(option) => setSelectedId(option)}
              initValue={selectedId}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="titulo"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Título del capítulo
            </label>
            <input
              type="text"
              placeholder="Título"
              id="titulo"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value.replace(/´/g, ""))}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="capitulo"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Número de capítulo
            </label>
            <input
              type="number"
              placeholder="Capítulo"
              id="capitulo"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="contenido"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              } `}
            >
              Contenido del capítulo
            </label>
            <textarea
              cols="30"
              rows="5"
              placeholder="Contenido"
              id="contenido"
              className="border rounded sm:h-40 h-84 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm scrollbar"
              value={contenido}
              onChange={(e) => {
                setContenido(e.target.value);
                setIsChanging(true);
              }}
            />
          </div>

          <div className="flex justify-center items-center pt-2">
            <button
              type="submit"
              className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
            >
              {id ? "Actualizar capítulo" : "Agregar capítulo"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Container_captitulo;
