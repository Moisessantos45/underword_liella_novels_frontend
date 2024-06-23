import { useEffect, useState } from "react";
import useAdmin from "@/hooks/useAdmin.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import NavbarSlider from "@/components/NavbarSlider.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { toastify } from "@/utils/Utils.js";

const apiKey = import.meta.env.VITE_URL_APIKEY;

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

const FormRegistrer = () => {
  const { registrar, activeDark, data_cuenta } = useAdmin();
  const { userAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [foto, setFoto] = useState(null);
  const [name_user, setName] = useState("");
  const [typeDataUser, setTypeDataUser] = useState("");
  const [open, setOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState();

  const [id, setId] = useState(null);
  const [id_user, setIdUser] = useState(null);

  useEffect(() => {
    if (data_cuenta?.id) {
      setEmail(data_cuenta.email);
      setTipo(data_cuenta.tipo);
      setTypeDataUser(data_cuenta.tipo);
      setName(data_cuenta.name_user);
      setIdUser(data_cuenta.id);
      setFotoPerfil(data_cuenta.foto_perfil);
    }
  }, [data_cuenta]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    let img = URL.createObjectURL(selectedFile);
    setFotoPerfil(img);
    setFoto(selectedFile);
  };

  const handelSubmit = async (e) => {
    let foto_perfil = "";
    const id = userAuth.id;
    e.preventDefault();
    if (foto !== null) {
      if (foto.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append("image", foto);
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        foto_perfil = data.data.url;
      }
    }
    const campos = [name_user, email, tipo, id];
    if (!email.endsWith("@gmail.com")) {
      mostrarAlerta(`Correo invalido`);
      mostrarAlerta("Direccion valida @gmail.com");
      return;
    }
    if (id_user === null && password === "") {
      mostrarAlerta("Password vacio");
      return;
    }
    const camposVacios = Object.entries(campos)
      .filter(
        ([nombre, valor]) => typeof valor === "string" && valor.trim() === ""
      )
      .map(([nombre, valor]) => nombre)
      .join(", ");

    if (camposVacios.length > 0) {
      mostrarAlerta(`Hay campos vacios`);
      return;
    }
    registrar({ email, password, tipo, id, foto_perfil, name_user, id_user });
    setEmail("");
    setPassword("");
    setName("");
    setFotoPerfil("");
    setTypeDataUser("");
    setFoto(null);
    setIdUser(null);
    setId(null);
    toastify("Usuario agregado", true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        <NavbarSlider />
        <section className="flex justify-center sm:items-start items-center m-auto main__container_perfil">
          <form
            className={`w-11/12 sm:w-8/12 p-2 ${
              activeDark ? "bg-gray-800" : "bg-white"
            }  shadow-lg rounded-lg m-auto`}
            onSubmit={handelSubmit}
          >
            <div className=" w-12/12 m-1 p-4 mx-auto">
              <h1 className=" text-2xl font-bold">
                {id_user ? "Actualizar Usuario" : "Agregar Usuario"}
              </h1>
            </div>
            <div className="form_add_content">
              <label
                htmlFor="name"
                className={`font-bold ${
                  activeDark ? "text-white" : "text-slate-700"
                }`}
              >
                Name
              </label>
              <input
                type="name"
                placeholder="name"
                id="name"
                className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                value={name_user}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form_add_content">
              <label
                htmlFor="email"
                className={`font-bold ${
                  activeDark ? "text-white" : "text-slate-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                id="email"
                className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_add_content">
              <label
                htmlFor="password"
                className={` font-bold ${
                  activeDark ? "text-white" : "text-slate-700"
                }`}
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="password"
                id="password"
                className="border rounded h-10 w-11/12 text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-12/12 m-auto p-1 flex-wrap relative justify-evenly flex items-center">
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  height: 25,
                  width: "25%",
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
                  color: "#475569",
                  fontWeight: "bold",
                  fontSize: "17px",
                  textAlign: "center",
                }}
                id="demo-controlled-open-select-label"
              >
                Tipo
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={typeDataUser ? typeDataUser : tipo}
                label="Age"
                sx={{
                  width: "90%",
                  height: 35,
                  margin: 1,
                  color: `${activeDark ? "white" : "black"}`,
                }}
                onChange={(e) => {
                  setTipo(e.target.value), setTypeDataUser(e.target.value);
                }}
              >
                <MenuItem value="administrador">Administrador</MenuItem>
                <MenuItem value="colaborador">Colaborador</MenuItem>
              </Select>
            </div>
            <div className="form_add_content">
              <label
                htmlFor="file-input"
                className={` ${
                  activeDark ? "text-white" : "text-white"
                } label_file flex justify-center items-center rounded-lg`}
              >
                Foto perfil
              </label>
              <input
                type="file"
                name="foto"
                id="file-input"
                onChange={handleFileChange}
              />
            </div>
            {fotoPerfil && (
              <div className="w-12/12 flex justify-center items-center p-2">
                <img
                  className=" rounded-md w-40 h-40"
                  src={fotoPerfil ? fotoPerfil : ""}
                  alt=""
                />
              </div>
            )}
            <div className="flex justify-center items-center pt-2">
              <button
                type="submit"
                className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
              >
                {id_user ? "Actulizar Usuario" : "Agrega un usuario"}
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default FormRegistrer;
