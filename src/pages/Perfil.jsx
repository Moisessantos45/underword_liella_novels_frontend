import { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import urlAxios from "../config/urlAxios";
import NavbarSlider from "../components/NavbarSlider";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import axios from "axios";
const apiKey = import.meta.env.VITE_URL_APIKEY;

const toastify = (text, type) => {
  Toastify({
    text: `${text}`,
    duration: 3000,
    newWindow: true,
    // close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: type
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
      borderRadius: "10px",
    },
  }).showToast();
};

const Perfil = () => {
  const { userAuth } = useAuth();
  const { activeDark } = useAdmin();
  const [email, setEmail] = useState(userAuth.email);
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState([]);
  const [name_user, setName] = useState(userAuth.name_user);
  const [datos_actuales, setDatos] = useState({});
  const [tipo, setTipo] = useState(userAuth.tipo);
  let foto_perfil = userAuth?.foto_perfil || "";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // console.log(e.target);
    setFoto(selectedFile);
  };
  const handlSubtmit = async (e) => {
    e.preventDefault();
    if ([password, email, name_user].includes("")) {
      toastify("Password vacio", false);
      return;
    }
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
    try {
      const { data } = await urlAxios.put(
        "/underwordliellanovels/actulizar-datos",
        {
          email: userAuth.email,
          password,
          foto_perfil,
          name_user,
          tipo,
        }
      );
      setEmail(data.email);
      setName(data.name_user);
      toastify("Datos actualizados", true);
    } catch (error) {
      toastify(error.response.data.msg, false);
      console.log(error);
    }
  };
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <section className="w-full flex flex-wrap sm:justify-center justify-evenly sm:items-start items-center main__container_perfil">
          <div className="w-full flex justify-center h-11">
            <span className="text-indigo-600 font-bold text-2xl m-3">
              Informacion Personal
            </span>
          </div>
          <div
            className={`sm:w-10/12 w-11/12 flex shadow rounded-lg heigth-div ${
              activeDark ? "bg-slate-950" : "bg-white "
            }`}
          >
            <form
              onSubmit={handlSubtmit}
              className="w-full items-center flex justify-center flex-col"
            >
              <div className="my-3 w-10/12 flex justify-center flex-wrap items-center">
                <label
                  className={`"uppercase font-bold ${
                    activeDark ? "text-white" : "text-gray-600"
                  }`}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  className={`"border bg-gray-50 sm:w-8/12 w-11/12 p-2 mt-5 rounded-lg ${
                    activeDark ? "text-white" : "text-black"
                  }"`}
                  value={name_user}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-3 sm:w-10/12 w-11/12 flex justify-center flex-wrap items-center">
                <label
                  className={`"uppercase font-bold ${
                    activeDark ? "text-white" : "text-gray-600"
                  }`}
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  className={`"border bg-gray-50 sm:w-8/12 w-11/12 p-2 mt-5 rounded-lg ${
                    activeDark ? "text-white" : "text-black"
                  }"`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-3 sm:w-10/12  w-11/12 flex justify-center flex-wrap items-center">
                <label
                  className={`"uppercase font-bold ${
                    activeDark ? "text-white" : "text-gray-600"
                  }`}
                >
                  Passsword
                </label>
                <input
                  type="password"
                  name="web"
                  className="border bg-gray-50 text-black w-7/12 p-2 mt-5 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                value="Guardar cambios"
                className="bg-indigo-700 px-10 py-3 font-bold text-white uppercase rounded-lg w-full mt-5 hover:cursor-pointer hover:bg-indigo-600 hover:shadow-lg flex"
              />
            </form>
          </div>
        </section>
      </section>
    </>
  );
};

export default Perfil;
