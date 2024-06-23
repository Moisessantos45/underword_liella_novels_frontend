import { useState } from "react";
import "@/css/ContainerAdmin.css";
import useAdmin from "@/hooks/useAdmin";
import NavbarSlider from "@/components/NavbarSlider";
import Alerta from "@/components/UI/Alerta";
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

const Container_card = () => {
  const { enviarDatos, novelasInfo, activeDark } = useAdmin();
  const [alerta, setAlerta] = useState({});
  const [nombreClave, setNombre] = useState("");
  const [volumen, setVolumen] = useState("");
  const [imagen, setImagen] = useState(
    "https://i.ibb.co/WvKyKrk/no-disponibles.jpg"
  );
  const [captiuloActive, setDisponible] = useState(false);
  const [capitulo, setCapitulos] = useState("");
  const [mega, setMega] = useState("");
  const [mediafire, setMediafire] = useState("");
  const [megaEpub, setMegaEpub] = useState("");
  const [mediafireEpub, setMediafireEpub] = useState("");
  const [clave, setClave] = useState("dato");
  const [open, setOpen] = useState(false);

  const tipo = "cards";
  const handelSubmit = async (e) => {
    e.preventDefault();
    const campos = [nombreClave, volumen, imagen, clave];
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
        nombreClave,
        volumen,
        imagen,
        captiuloActive,
        capitulo,
        mega,
        mediafire,
        megaEpub,
        mediafireEpub,
      },
      tipo
    );
    // setNombre("")
    setVolumen("");
    setImagen("https://i.ibb.co/WvKyKrk/no-disponibles.jpg");
    setCapitulos("");
    setMega("");
    setMediafire("");
    setMediafireEpub("");
    setMegaEpub("");
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
              value={nombreClave}
              label="Age"
              sx={{ width: "95%", height: 35, margin: "auto" }}
              onChange={(e) => setNombre(e.target.value)}
            >
              {novelasInfo.map((chart, i) => (
                <MenuItem
                  key={i}
                  value={`${chart.titulo.split(" ").slice(0, 4).join(" ")}`}
                  className=" overflow-hidden text-ellipsis whitespace-nowrap text-slate-600"
                >
                  {chart.titulo.split(" ").slice(0, 4).join(" ")}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="w-11/12 p-2 grid md:grid-cols-3 md:gap-2 m-auto">
            <input
              type="number"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Volumen"
              value={volumen}
              onChange={(e) => setVolumen(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Esta disponible para leer"
              value={captiuloActive}
              onChange={(e) => setDisponible(e.target.value)}
            />
            <input
              type="text"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              placeholder="Escribir si esta disponible para leer"
              value={capitulo}
              onChange={(e) => setCapitulos(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="imagen"
              className={` font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Url Portada
            </label>
            <input
              type="text"
              placeholder="imagen"
              id="imagen"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="mega"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Link de mega
            </label>
            <input
              type="text"
              placeholder="mega"
              id="mega"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={mega}
              onChange={(e) => setMega(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="mediafire"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Link de drive
            </label>
            <input
              type="text"
              placeholder="mediafire"
              id="mediafire"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={mediafire}
              onChange={(e) => setMediafire(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="megaEpub"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Link mega epub
            </label>
            <input
              type="text"
              placeholder="megaEpub"
              id="megaEpub"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={megaEpub}
              onChange={(e) => setMegaEpub(e.target.value)}
            />
          </div>
          <div className="form_add_content">
            <label
              htmlFor="mediafireEpub"
              className={`font-bold ${
                activeDark ? "text-white" : "text-slate-600"
              }`}
            >
              Link mediafire epub
            </label>
            <input
              type="text"
              placeholder="mediafire Epub"
              id="mediafireEpub"
              className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={mediafireEpub}
              onChange={(e) => setMediafireEpub(e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center pt-2">
            <button
              type="submit"
              className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
            >
              Agrega un volumen
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Container_card;
