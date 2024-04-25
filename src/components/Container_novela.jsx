import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import NavbarSlider from "./NavbarSlider";
import Alerta from "./Alerta";
import Swal from "sweetalert2";

const mostrarAlerta = (texto) => {
  Swal.fire({
    icon: "error",
    width: 300,
    title: texto,
    timer: 1500,
    customClass: {
      title: "mi-clase",
    },
  });
};

const Container_novela = () => {
  const { enviarDatos, datosEdit, activeDark, setDatos } = useAdmin();
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
  const [clave, setClave] = useState("dato");
  const [id, setId] = useState(null);
  const [dataTipo, setType] = useState("novela");
  const [numberOfInputs, setNumberOfInputs] = useState(0);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    if (datosEdit?.id && datosEdit?.sinopsis) {
      setTitulo(datosEdit.titulo);
      setTipo(datosEdit.tipo || "");
      setBackgroud(datosEdit.backgroud);
      setImagen(datosEdit.imagen);
      setIlustrador(datosEdit.ilustrador);
      setGeneros(datosEdit.generos);
      setAutor(datosEdit.autor);
      setEncargados(datosEdit.encargados);
      setActivo(datosEdit.activo);
      setSinopsis(datosEdit.sinopsis);
      setCapitulos(datosEdit.capitulos);
      setNumberOfInputs(JSON.parse(datosEdit.scans).length);
      setInputValues(JSON.parse(datosEdit.scans));
      setClave(datosEdit.clave);
      setId(datosEdit.id);
    }
  }, [datosEdit]);

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
    const camposVacios = Object.entries(campos)
      .filter(
        ([nombre, valor]) => typeof valor === "string" && valor.trim() === ""
      )
      .map(([nombre, valor]) => nombre)
      .join(", ");

    if (camposVacios.length > 0) {
      mostrarAlerta(`Los siguientes campos están vacíos: ${camposVacios}`);
      return;
    }
    enviarDatos(
      {
        ilustrador,
        titulo,
        tipo,
        sinopsis,
        clave,
        id,
        capitulos,
        backgroud,
        imagen,
        generos,
        autor,
        encargados,
        scans: JSON.stringify(inputValues),
        activo,
      },
      dataTipo
    );
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
    // setClave("");
    setId(null);
    setDatos({});
  };
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const { msg } = alerta;
  return (
    <>
      <section
        className={`content bg-zinc-100 text-slate-400   ${
          activeDark ? "dark" : ""
        }`}
      >
        <NavbarSlider />
        {msg && <Alerta alerta={alerta} />}
        <form
          className={`w-11/12 sm:w-8/12 p-2 md:mt-10 lg:mt-0 ${
            activeDark ? "bg-gray-800" : "bg-white"
          }  shadow-lg rounded-lg m-auto`}
          onSubmit={handelSubmit}
        >
          <div className="flex flex-row text-center justify-center items-center w-11/12">
            <h2 className="text-3xl text-center flex justify-center items-center text-green-400 font-bold">
              {id ? "Actulizar novela" : "Agregar novela"}
            </h2>
          </div>
          <div className="form_add_content">
            <label
              htmlFor="titulo"
              className={` font-bold w-12/12 ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              El titulo de la novela
            </label>
            <input
              type="text"
              placeholder="titulo"
              id="titulo"
              className="border rounded h-10 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value.replace(/´/g, ""))}
            />
          </div>
          <div className="w-12/12 p-2 grid md:grid-cols-3 md:gap-2 m-auto">
            <input
              type="text"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Activo"
              value={activo}
              onChange={(e) => setActivo(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Hay capitulos"
              value={capitulos}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="w-12/12 p-2 grid md:grid-cols-2 md:gap-2 m-auto">
            <input
              type="text"
              className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Url de la imagen"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Url backgroud"
              value={backgroud}
              onChange={(e) => setBackgroud(e.target.value)}
            />
          </div>
          <div className="w-12/12 p-2 grid md:grid-cols-2 md:gap-2 m-auto">
            <input
              type="text"
              className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Nombre del autor"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Encargados de la novela"
              value={encargados}
              onChange={(e) => setEncargados(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Generos de la novela"
              value={generos}
              onChange={(e) => setGeneros(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-12/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Ilustrador de la novel"
              value={ilustrador}
              onChange={(e) => setIlustrador(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <div className="sm:w-full px-4 flex items-center flex-wrap sm:justify-start justify-evenly gap-2">
              <span className="text-sm flex font-medium text-gray-100 textWidthFitContent">
                Agregar scans
              </span>
              <span className="flex font-medium text-gray-100 textWidthFitContent">
                <i
                  className="fa-solid fa-plus cursor-pointer text-xl"
                  onClick={handelClickAddInput}
                ></i>
              </span>
            </div>
            <div className=" w-full m-auto border-b border-gray-400 border-opacity-20">
              {Array.from({ length: numberOfInputs }, (item, index) => (
                <article
                  key={index}
                  className=" gap-2 w-full justify-evenly items-center p-3 grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 md:gap-2 m-auto relative"
                >
                  <i
                    className="fa-solid fa-minus font-bold text-slate-300 text-3xl absolute right-2 md:-top-3 -top-4 cursor-pointer"
                    onClick={() => handelClickDeleteInput(index)}
                  ></i>
                  <input
                    className="py-4 px-3 md:col-start-1 md:row-start-1 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                    id="formInput1-1"
                    type="text"
                    placeholder="Nombre del scan"
                    value={
                      (inputValues[index] && inputValues[index].nameScan) || ""
                    }
                    name="nameScan"
                    onChange={(e) =>
                      changeHandleInputs(index, "nameScan", e.target.value)
                    }
                  />
                  <input
                    className="py-4 px-3 md:col-start-2 md:col-span-2 md:row-start-1 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                    id="formInput1-1"
                    type="text"
                    placeholder="link del scan"
                    value={
                      (inputValues[index] && inputValues[index].linkScan) || ""
                    }
                    name="linkScan"
                    onChange={(e) =>
                      changeHandleInputs(index, "content", e.target.linkScan)
                    }
                  />
                  <input
                    className="py-4 px-3 md:col-span-3 md:row-start-2 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                    id="formInput1-1"
                    type="text"
                    placeholder="texto"
                    value={
                      (inputValues[index] && inputValues[index].content) || ""
                    }
                    name="content"
                    onChange={(e) =>
                      changeHandleInputs(index, "content", e.target.content)
                    }
                  />
                </article>
              ))}
            </div>
          </div>

          <div className="form_add_content">
            <label
              htmlFor="generos"
              className={`font-bold w-12/12 ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Sinopsis
            </label>
            <textarea
              type="text"
              placeholder="sinopsis"
              id="generos"
              className="border rounded h-32 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm scrollbar"
              value={sinopsis}
              onChange={(e) => setSinopsis(e.target.value)}
            />
          </div>
          {/* <div className="form_add_content">
            <label
              htmlFor="clave"
              className={`font-bold w-12/12 ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              No modificar
            </label>
            <input
              type="text"
              placeholder="clave"
              id="clave"
              className="border rounded h-10 w-12/12 focus:outline-none text-slate-400 focus:text-slate-700 focus:border-green-200 px-2 text-sm"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div> */}
          <div className="flex justify-center items-center pt-2">
            <button
              type="submit"
              value={id ? "Actulizar novela" : "Agrega un novela"}
              className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
            >
              {id ? "Actulizar novela" : "Agrega un novela"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Container_novela;
