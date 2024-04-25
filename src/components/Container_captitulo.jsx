import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import NavbarSlider from "./NavbarSlider";
import Alerta from "./Alerta";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

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

const Container_captitulo = () => {
  const { novelasInfo, enviarDatos, datosEdit, activeDark, setDatos } =
    useAdmin();
  const [alerta, setAlerta] = useState({});
  const [nombre, setNombre] = useState("");
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [capitulo, setCapitulos] = useState(0);
  const [nameData, setNameData] = useState("");
  const [clave, setClave] = useState("dato");
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (datosEdit?.id && datosEdit?.contenido) {
      setTitulo(datosEdit.titulo);
      setContenido(datosEdit.contenido);
      setCapitulos(datosEdit.capitulo);
      setNombre(datosEdit.nombre);
      setNameData(datosEdit.nombre);
      setClave(datosEdit.clave);
      setId(datosEdit.id);
    }
  }, [datosEdit]);

  const tipo = "capitulos";
  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [nombre, titulo, contenido, capitulo, clave];
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
    enviarDatos({ nombre, titulo, contenido, capitulo, id }, tipo);
    setTitulo("");
    setContenido("");
    setCapitulos(0);
    setNombre("");
    setNameData("");
    // setClave("");
    setId(null);
    setDatos({});
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const { msg } = alerta;
  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        {msg && <Alerta alerta={alerta} />}
        <NavbarSlider />
        <form
          className={`w-11/12 sm:w-8/12 p-2 md:mt-10 lg:mt-0 ${
            activeDark ? "bg-gray-800" : "bg-white"
          }  shadow-lg rounded-lg m-auto`}
          onSubmit={handelSubmit}
        >
          <div className="w-12/12 m-auto p-1 flex-col relative justify-center flex items-center">
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 1,
                height: 25,
                width: "20%",
                position: "absolute",
                top: 0,
                right: 1,
                background: "dodgerblue",
                color: "white",
              }}
              onClick={handleOpen}
            >
              Open
            </Button>
            <InputLabel
              sx={{
                m: 1,
                width: "50%",
                color: "#4ADE80",
                fontWeight: "bold",
                fontSize: "23px",
              }}
              id="demo-controlled-open-select-label"
            >
              Nombre de la novela
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={nameData ? nameData : nombre}
              label="Age"
              sx={{
                width: "93%",
                height: 35,
                color: `${activeDark ? "white" : "black"}`,
              }}
              onChange={(e) => {
                setNombre(e.target.value), setNameData(e.target.value);
              }}
            >
              {novelasInfo.map((chart, i) => (
                <MenuItem
                  key={i}
                  value={`${chart.titulo.split(" ").slice(0, 4).join(" ")}`}
                  className={`overflow-hidden text-ellipsis whitespace-nowrap ${
                    activeDark ? "text-white" : "text-slate-600"
                  } `}
                >
                  {chart.titulo.split(" ").slice(0, 4).join(" ")}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="form_add_content">
            <label
              htmlFor="titulo"
              className={` font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Titulo del capitulo
            </label>
            <input
              type="text"
              placeholder="titulo"
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
              El capitulo
            </label>
            <input
              type="number"
              placeholder="capitulo"
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
              El contenido
            </label>
            <textarea
              type="text"
              cols="30"
              rows="5"
              placeholder="contenido"
              id="contenido"
              className="border rounded sm:h-40 h-84 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm scrollbar"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="clave"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              No modificar
            </label>
            <input
              type="text"
              placeholder="clave"
              id="clave"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
            />
          </div>
          <div className="flex justify-center items-center pt-2">
            <button
              type="submit"
              value={id ? "Actulizar novela" : "Agrega un novela"}
              className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
            >
              {id ? "Actulizar capitulo" : "Agrega el capitulo"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Container_captitulo;
