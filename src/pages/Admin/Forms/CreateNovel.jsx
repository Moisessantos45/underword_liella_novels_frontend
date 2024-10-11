import { useEffect, useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import NavbarSlider from "@/components/NavbarSlider";
import Alerta from "@/components/UI/Alerta";
import { isBoolean } from "@/utils/Utils";
import useNovelasStore from "@/Store/NovelasStore";
import { showAlert } from "@/utils/Utils";

const Container_novela = () => {
  const { ItemNovela, addNovela, updateNovela } = useNovelasStore();
  const { activeDark, setDatos } = useAdmin();
  const [alerta, setAlerta] = useState({});
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [backgroud, setBackgroud] = useState("?");
  const [imagen, setImagen] = useState(
    "https://i.ibb.co/WvKyKrk/no-disponibles.jpg"
  );
  const [ilustrador, setIlustrador] = useState("?");
  const [generos, setGeneros] = useState("");
  const [autor, setAutor] = useState("?");
  const [encargados, setEncargados] = useState("");
  const [activo, setActivo] = useState(false);
  const [sinopsis, setSinopsis] = useState("");
  const [capitulos, setCapitulos] = useState(false);
  const [id, setId] = useState(null);
  const [numberOfInputs, setNumberOfInputs] = useState(0);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    if (ItemNovela?.id && ItemNovela?.titulo) {
      setTitulo(ItemNovela.titulo);
      setTipo(ItemNovela.tipo || "");
      setBackgroud(ItemNovela.backgroud);
      setImagen(ItemNovela.imagen);
      setIlustrador(ItemNovela.ilustrador);
      setGeneros(ItemNovela.generos);
      setAutor(ItemNovela.autor);
      setEncargados(ItemNovela.encargados);
      setActivo(ItemNovela.activo);
      setSinopsis(ItemNovela.sinopsis);
      setCapitulos(ItemNovela.capitulos);
      setNumberOfInputs(JSON.parse(ItemNovela.scans).length);
      setInputValues(JSON.parse(ItemNovela.scans));
      setId(ItemNovela.id);
    }
  }, [ItemNovela]);

  const handelClickAddInput = () => {
    setNumberOfInputs((prev) => prev + 1);
  };

  const changeHandleInputs = (index, fileName, value) => {
    setNumberOfInputs((prev) => {
      const newState = [...prev];
      let newStateIndex = newState[index];

      if (newStateIndex === undefined) {
        newStateIndex = {};
        newState[fileName] = newStateIndex;
      }

      newStateIndex[fileName] = value;
      return newState;
    });
  };

  const handelClickDeleteInput = (index) => {
    setNumberOfInputs((prev) => prev - 1);
    const newInputs = inputValues.filter((_, i) => i !== index);
    setInputValues(newInputs);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const campos = [
      ilustrador,
      titulo,
      tipo,
      sinopsis,
      capitulos,
      imagen,
      generos,
      autor,
      encargados,
      activo,
    ];

    const camposVacios = Object.entries(campos).filter(
      ([_, valor]) => typeof valor === "string" && valor.trim() === ""
    );

    if (camposVacios.length > 0) {
      showAlert(`Los siguientes campos están vacíos: ${camposVacios}`);
      return;
    }

    const newClave = titulo.split(" ").slice(0, 3).join("_").toLowerCase();
    const validateActive = isBoolean(activo);
    const validateCapitulos = isBoolean(capitulos);

    const newData = {
      ilustrador,
      titulo,
      tipo,
      sinopsis,
      clave: newClave,
      capitulos: validateCapitulos,
      backgroud,
      imagen,
      generos,
      autor,
      encargados,
      scans: JSON.stringify(inputValues),
      activo: validateActive,
    };
    if (ItemNovela?.id) {
      await addNovela(newData);
    } else {
      await updateNovela(newData);
    }

    setTitulo("");
    setTipo("");
    setBackgroud("?");
    setImagen("https://i.ibb.co/WvKyKrk/no-disponibles.jpg");
    setIlustrador("?");
    setGeneros("");
    setAutor("?");
    setEncargados("");
    setActivo(false);
    setSinopsis("");
    setCapitulos(false);
    setId(null);
    setDatos({});
  };

  const { msg } = alerta;
  return (
    <>
      <section
        className={`content bg-zinc-100 text-slate-400 ${
          activeDark ? "dark" : ""
        }`}
      >
        <NavbarSlider />
        {msg && <Alerta alerta={alerta} />}
        <form
          className={`w-11/12 sm:w-8/12 p-2 md:mt-10 lg:mt-0 ${
            activeDark ? "bg-gray-800" : "bg-white"
          } shadow-lg rounded-lg m-auto`}
          onSubmit={handelSubmit}
        >
          <div className="flex flex-row justify-center items-center w-11/12">
            <h2 className="text-3xl text-center text-green-400 font-bold">
              {id ? "Actualizar novela" : "Agregar novela"}
            </h2>
          </div>

          <div className="mx-auto w-11/12">
            <label
              htmlFor="titulo"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Título de la novela
            </label>
            <input
              type="text"
              placeholder="Título"
              id="titulo"
              className="border rounded h-10 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 mt-2 text-sm"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value.replace(/´/g, ""))}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 w-11/12 mx-auto">
            <div>
              <label
                htmlFor="tipo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tipo
              </label>
              <input
                id="tipo"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese el tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="activo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Activo
              </label>
              <input
                id="activo"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese si está activo"
                value={activo}
                onChange={(e) => setActivo(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="capitulos"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tiene capítulos
              </label>
              <input
                id="capitulos"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese el número de capítulos"
                value={capitulos}
                onChange={(e) => setCapitulos(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="imagen"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL de la imagen
              </label>
              <input
                id="imagen"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese la URL de la imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="background"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL del background
              </label>
              <input
                id="background"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese la URL del background"
                value={backgroud}
                onChange={(e) => setBackgroud(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="autor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre del autor
              </label>
              <input
                id="autor"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese el nombre del autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="encargados"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Encargados de la novela
              </label>
              <input
                id="encargados"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese los encargados de la novela"
                value={encargados}
                onChange={(e) => setEncargados(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="generos"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Géneros de la novela
              </label>
              <input
                id="generos"
                type="text"
                className="border rounded h-10 w-full focus:outline-none text-slate-700 focus:border-green-200 px-2 text-sm"
                placeholder="Ingrese los géneros de la novela"
                value={generos}
                onChange={(e) => setGeneros(e.target.value)}
              />
            </div>

            <div className=" col-span-2">
              <div className="sm:w-full px-4 flex items-center flex-wrap sm:justify-start justify-evenly gap-2">
                <span
                  className={`text-sm flex font-medium ${
                    activeDark ? "text-gray-100 " : "text-gray-900"
                  } textWidthFitContent`}
                >
                  Agregar scans
                </span>
                <span
                  className={`flex font-medium ${
                    activeDark ? "text-gray-200" : "text-gray-900"
                  } textWidthFitContent`}
                >
                  <i
                    className="fa-solid fa-plus cursor-pointer text-xl"
                    onClick={handelClickAddInput}
                  ></i>
                </span>
              </div>
              <div className="w-full m-auto mt-5 border-b border-gray-400 border-opacity-20">
                {Array.from({ length: numberOfInputs }, (_, index) => (
                  <article
                    key={index}
                    className="gap-2 w-full justify-evenly items-center p-3 grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 md:gap-2 m-auto relative"
                  >
                    <i
                      className="fa-solid fa-minus font-bold text-slate-300 text-3xl absolute right-2 md:-top-3 -top-4 cursor-pointer"
                      onClick={() => handelClickDeleteInput(index)}
                    ></i>

                    {/* Input para Nombre del scan */}
                    <div className="md:col-start-1 md:row-start-1 w-full">
                      <label
                        htmlFor={`nameScan-${index}`}
                        className={`${
                          activeDark ? "text-slate-200" : "text-slate-900"
                        } sr-only`}
                      >
                        Nombre del scan
                      </label>
                      <input
                        className="py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                        id={`nameScan-${index}`}
                        type="text"
                        placeholder="Nombre del scan"
                        value={inputValues[index]?.nameScan || ""}
                        name="nameScan"
                        onChange={(e) =>
                          changeHandleInputs(index, "nameScan", e.target.value)
                        }
                      />
                    </div>

                    {/* Input para link del scan */}
                    <div className="md:col-start-2 md:col-span-2 md:row-start-1 w-full">
                      <label htmlFor={`linkScan-${index}`} className="sr-only">
                        Link del scan
                      </label>
                      <input
                        className="py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                        id={`linkScan-${index}`}
                        type="text"
                        placeholder="Link del scan"
                        value={inputValues[index]?.linkScan || ""}
                        name="linkScan"
                        onChange={(e) =>
                          changeHandleInputs(index, "linkScan", e.target.value)
                        }
                      />
                    </div>

                    {/* Input para texto */}
                    <div className="md:col-span-3 md:row-start-2 w-full">
                      <label htmlFor={`content-${index}`} className="sr-only">
                        Texto
                      </label>
                      <input
                        className="py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                        id={`content-${index}`}
                        type="text"
                        placeholder="Texto"
                        value={inputValues[index]?.content || ""}
                        name="content"
                        onChange={(e) =>
                          changeHandleInputs(index, "content", e.target.value)
                        }
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="mx-auto w-11/12">
            <textarea
              type="text"
              className="border rounded h-32 max-h-36 w-full focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar p-2"
              placeholder="Sinopsis"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center pt-2">
            <button
              type="submit"
              className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
            >
              {id ? "Actualizar novela" : "Agregar novela"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Container_novela;
