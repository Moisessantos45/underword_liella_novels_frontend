import { useState } from "react";
import useAdmin from "@/hooks/useAdmin.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import urlAxios from "@/config/urlAxios.js";
import NavbarSlider from "@/components/NavbarSlider.jsx";
import { toastify } from "@/utils/Utils.js";
import axios from "axios";
import { errorHandle } from "@/Services/errorHandle.js";
const apiKey = import.meta.env.VITE_URL_APIKEY;

const Perfil = () => {
  const { userAuth } = useAuth();
  const { activeDark } = useAdmin();
  const [email, setEmail] = useState(userAuth?.email);
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState([]);
  const [name_user, setName] = useState(userAuth?.name_user);
  const [tipo, setTipo] = useState(userAuth?.tipo);
  const [id, setId] = useState(userAuth?.id);
  const [foto_perfil, setFotoPerfil] = useState(userAuth?.foto_perfil);
  const [fotoRender, setFotoRender] = useState(foto_perfil);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    let img = URL.createObjectURL(selectedFile);
    setFotoRender(img);
    // console.log(e.target);
    setFoto(selectedFile);
  };
  
  const handlSubtmit = async (e) => {
    e.preventDefault();
    if ([email, name_user].includes("")) {
      toastify("Datos vacios", false);
      return;
    }
    if (foto.length >= 1) {
      if (foto.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append("image", foto);
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        setFotoPerfil(data.data.url);
      }
    }
    try {
      const { data } = await urlAxios.put("/admin/actulizar-datos", {
        email: userAuth.email,
        password,
        foto_perfil,
        name_user,
        tipo,
        id,
      });
      setEmail(data.email);
      setName(data.name_user);
      toastify("Datos actualizados", true);
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
        <div className="margin sm:w-10/12 bg-white w-11/12 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
          <form onSubmit={handlSubtmit}>
            <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
              <div className="shrink-0 mr-auto sm:py-3">
                <p className="font-medium">Datos Personales</p>
                <p className="text-sm text-gray-600">Actualiza tus datos</p>
              </div>
              <button
                className="sm:w-32 w-28 rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-blue-700"
                type="submit"
              >
                Save
              </button>
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">Name</p>
              <input
                placeholder="Name"
                className="mb-2 w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
                value={name_user}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Tipo"
                className="w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                value={tipo}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">Email</p>
              <input
                className="w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">Password</p>
              <input
                placeholder="password"
                className="w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 py-4  lg:flex-row">
              <div className="shrink-0 w-32  sm:py-4">
                <p className="mb-auto font-medium">Foto</p>
                <p className="text-sm text-gray-600">Sube tu perfil</p>
              </div>
              <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                {fotoRender && (
                  <img
                    src={fotoRender || foto_perfil}
                    className="h-24 w-24 rounded-lg shadow-lg"
                  />
                )}
                <p className="text-sm text-gray-600">
                  Selecciona su foto de perfil
                </p>
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
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Perfil;
