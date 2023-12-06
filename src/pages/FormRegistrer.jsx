import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import NavbarSlider from "../components/NavbarSlider";
import Alerta from "../components/Alerta";
import axios from "axios";
import Swal from "sweetalert2";
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
  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        <NavbarSlider />
        <section className="flex justify-center m-auto">
          <form
            className="form_add form_add-heigth-reg font-bold"
            onSubmit={handelSubmit}
          >
            <div className="form_add_content">
              <label
                htmlFor="name"
                className={` ${activeDark ? "text-white" : "text-black"}`}
              >
                Email
              </label>
              <input
                type="name"
                placeholder="name"
                id="name"
                className="input_from h-8"
                value={name_user}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form_add_content">
              <label
                htmlFor="email"
                className={` ${activeDark ? "text-white" : "text-black"}`}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="email"
                id="email"
                className="input_from h-8"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_add_content">
              <label
                htmlFor="password"
                className={` ${activeDark ? "text-white" : "text-black"}`}
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="password"
                id="password"
                className="input_from h-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form_add_content">
              <label
                htmlFor="tipo"
                className={` ${activeDark ? "text-white" : "text-black"}`}
              >
                Tipo
              </label>
              <select
                type="text"
                placeholder="capitulo"
                id="tipo"
                className="input_from text-black h-8"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="administrador" className="text-black">
                  Administrador
                </option>
                <option value="colaborador" className="text-black">
                  Colaborador
                </option>
              </select>
            </div>
            <div className="form_add_content">
              <label
                htmlFor="file-input"
                className={` ${
                  activeDark ? "text-white" : "text-black"
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
              value={id ? "Actulizar capitulo" : "Agrega un capitulo"}
              className="btn_submit"
            />
          </form>
        </section>
      </section>
    </>
  );
};

export default FormRegistrer;
