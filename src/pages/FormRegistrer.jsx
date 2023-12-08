import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import NavbarSlider from "../components/NavbarSlider";
import Alerta from "../components/Alerta";
import axios from "axios";
import Swal from "sweetalert2";
const apiKey = import.meta.env.VITE_URL_APIKEY;
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

const FormRegistrer = () => {
  const {
    active,
    registrar,
    activeDark,
    data_cuenta,
    setDataUser,
    obtenerDatosUser,
  } = useAdmin();
  const { userAuth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("administrador");
  const [foto, setFoto] = useState(null);
  const [name_user, setName] = useState("");
  const [open, setOpen] = useState(false);

  // const [foto_perfil,setFotoPerfil]=useState()

  const [id, setId] = useState(null);
  const [id_user, setIdUser] = useState(null);
  useEffect(() => {
    if (data_cuenta?.id) {
      console.log("si funciona el de capi");
      setEmail(data_cuenta.email);
      setTipo(data_cuenta.tipo);
      setName(data_cuenta.name_user);
      setIdUser(data_cuenta.id);
    }
  }, [data_cuenta]);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(e.target);
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
    const campos = [name_user, password, email, tipo, id];
    if (!email.endsWith("@gmail.com")) {
      mostrarAlerta(`Correo invalido`);
      mostrarAlerta("Direccion valida @gmail.com");
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
            className="form_add form_add-heigth-reg font-bold"
            onSubmit={handelSubmit}
          >
            <div className="form_add_content">
              <label
                htmlFor="name"
                className={` ${activeDark ? "text-white" : "text-slate-700"}`}
              >
                Name
              </label>
              <input
                type="name"
                placeholder="name"
                id="name"
                className="input_from h-9 outline-none bg-gray-100"
                value={name_user}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form_add_content">
              <label
                htmlFor="email"
                className={` ${activeDark ? "text-white" : "text-slate-700"}`}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                id="email"
                className="input_from h-9 outline-none bg-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_add_content">
              <label
                htmlFor="password"
                className={` ${activeDark ? "text-white" : "text-slate-700"}`}
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="password"
                id="password"
                className="input_from h-9 outline-none bg-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form_add_content p-1 flex-wrap justify-evenly items-center">
                <Button
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                  height: 25,
                  width: "25%",
                  // position: "absolute",
                  // top: 0,
                  // right: 1,
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
                  textAlign:"center"
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
                value={tipo}
                label="Age"
                sx={{ width: "90%", height: 35,margin:1,background:"#f3f4f6" }}
                onChange={(e) => setTipo(e.target.value)}
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
            <input
              type="submit"
              value={id_user ? "Actulizar Usuario" : "Agrega un usuario"}
              className="btn_submit"
            />
          </form>
        </section>
      </section>
    </>
  );
};

export default FormRegistrer;
