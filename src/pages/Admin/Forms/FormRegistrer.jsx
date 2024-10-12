import { useEffect, useState } from "react";
import useAdmin from "@/hooks/useAdmin.jsx";
import Swal from "sweetalert2";
import { toastify } from "@/utils/Utils.js";
import supabase from "@/config/supabase";
import uploadFileImg from "@/Services/uploadImg";
import NavbarSlider from "@/components/NavbarSlider";

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
  const { activeDark, data_cuenta } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [foto, setFoto] = useState(null);
  const [name_user, setName] = useState("");
  const [typeDataUser, setTypeDataUser] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState();

  const [id, setId] = useState(null);
  const [id_user, setIdUser] = useState(null);

  useEffect(() => {
    if (data_cuenta?.idUser) {
      setEmail(data_cuenta.email);
      setTipo(data_cuenta.tipo);
      setTypeDataUser(data_cuenta.tipo);
      setName(data_cuenta.name_user);
      setIdUser(data_cuenta.idUser);
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
    e.preventDefault();

    if (foto !== null) {
      const response = await uploadFileImg(foto);
      foto_perfil = response;
    }

    const campos = [name_user, email, id];

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

    const { _, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name_user,
          avatar_url: foto_perfil,
        },
      },
    });

    if (error) {
      mostrarAlerta("Error al registrar el usuario");
      return;
    }

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

  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        <NavbarSlider />
        <section className="flex justify-center sm:items-start items-center m-auto main__container_perfil">
          <form
            className={`w-11/12 sm:w-8/12 p-2 ${
              activeDark ? "bg-gray-800 text-white" : "bg-white text-black"
            } shadow-lg rounded-lg m-auto`}
            onSubmit={handelSubmit}
          >
            <div className="w-11/12 m-1 p-4 mx-auto">
              <h1 className="text-2xl font-bold">
                {id_user ? "Actualizar Usuario" : "Agregar Usuario"}
              </h1>
            </div>
            <div className="form_add_content w-11/12 mx-auto">
              <label
                htmlFor="name"
                className={`font-bold ${
                  activeDark ? "text-white" : "text-slate-700"
                }`}
              >
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre"
                id="name"
                className={`border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${
                  activeDark ? "bg-gray-700" : "bg-gray-50"
                }`}
                value={name_user}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form_add_content w-11/12 mx-auto">
              <label
                htmlFor="email"
                className={`font-bold ${
                  activeDark ? "text-white" : "text-slate-700"
                }`}
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="Correo Electrónico"
                id="email"
                className={`border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${
                  activeDark ? "bg-gray-700" : "bg-gray-50"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form_add_content w-11/12 mx-auto">
              <label
                htmlFor="password"
                className={`font-bold ${
                  activeDark ? "text-white" : "text-slate-700"
                }`}
              >
                Contraseña
              </label>
              <input
                type="password"
                placeholder="Contraseña"
                id="password"
                className={`border rounded h-10 w-full text-slate-400 focus:text-slate-700 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${
                  activeDark ? "bg-gray-700" : "bg-gray-50"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form_add_content w-11/12 mx-auto">
              <label
                htmlFor="file-input"
                className={`font-bold flex justify-center items-center rounded-lg ${
                  activeDark ? "text-white" : "text-black"
                } mb-2`}
              >
                Foto de Perfil
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-input"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                    activeDark
                      ? "border-gray-500 bg-gray-800 text-white"
                      : "border-gray-300 bg-gray-50 text-gray-700"
                  } hover:bg-gray-100 hover:border-gray-400`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V12M7 12V8m0 4h4m6 0a2 2 0 100-4 2 2 0 000 4zm2 8h2a2 2 0 002-2v-2a2 2 0 00-2-2h-4a2 2 0 00-2 2v4M7 16h10M4 16H2a2 2 0 00-2 2v2a2 2 0 002 2h4a2 2 0 002-2v-2a2 2 0 00-2-2H4z"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">
                        Click para subir una foto
                      </span>
                      o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, hasta 10MB
                    </p>
                  </div>
                  <input
                    type="file"
                    id="file-input"
                    name="foto"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            {fotoPerfil && (
              <div className="w-full flex justify-center items-center p-2">
                <img
                  className="rounded-md w-40 h-40"
                  src={fotoPerfil}
                  alt="Foto de Perfil"
                />
              </div>
            )}
            <div className="flex justify-center items-center pt-2">
              <button
                type="submit"
                className="h-10 w-72 rounded font-medium text-xs bg-blue-500 text-white"
              >
                {id_user ? "Actualizar Usuario" : "Agregar Usuario"}
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
};

export default FormRegistrer;
