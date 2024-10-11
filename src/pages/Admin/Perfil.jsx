import { useState } from "react";
import { Uploader } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import useAdmin from "@/hooks/useAdmin.jsx";
import useAuth from "@/hooks/useAuth.jsx";
import NavbarSlider from "@/components/NavbarSlider.jsx";
import { toastify } from "@/utils/Utils.js";
import { errorHandle } from "@/Services/errorHandle.js";
import supabase from "@/config/supabase";
import uploadFileImg from "@/Services/uploadImg";

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Perfil = () => {
  const { userAuth } = useAuth();
  const { activeDark } = useAdmin();
  const [email, setEmail] = useState(userAuth?.email);
  const [password, setPassword] = useState("");
  const [foto, setFoto] = useState([]);
  const [name_user, setName] = useState(userAuth?.full_name);
  const [role, setTipo] = useState(userAuth?.role);
  const [id, setId] = useState(userAuth?.id);
  const [foto_perfil, setFotoPerfil] = useState(userAuth?.avatar_url);
  const [fotoRender, setFotoRender] = useState(foto_perfil);

  const handleChange = (fileList) => {
    if (fileList.length > 0) {
      const file = fileList[0]; // Obtén el primer archivo
      previewFile(file.blobFile, (value) => {
        setFotoRender(value);
      });
      setFoto(file.blobFile);
    }
  };

  const handlSubtmit = async (e) => {
    e.preventDefault();
    if ([email, name_user].includes("")) {
      toastify("Datos vacios", false);
      return;
    }
    if (foto.length >= 1) {
      const uploadImg = await uploadFileImg(foto);
      setFotoPerfil(uploadImg);
    }

    const query = {
      full_name: name_user,
      avatar_url: foto_perfil,
      role,
    };

    const newDataUser = {};
    if (email !== userAuth?.email) newDataUser.email = email;
    if (password.length >= 7) newDataUser.password = password;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(query)
        .eq("id", userAuth?.id)
        .single();

      if (error) throw error;

      if (newDataUser.email || newDataUser.password) {
        const { _, error } = await supabase.auth.updateUser(newDataUser);
        if (error) throw error;
      }
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
        <div
          className={`margin sm:w-10/12 ${
            activeDark ? "bg-gray-800 text-white" : "bg-white text-black"
          } w-11/12 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto`}
        >
          <form onSubmit={handlSubtmit}>
            <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
              <div className="shrink-0 mr-auto sm:py-3">
                <p className="font-medium">Datos Personales</p>
                <p className="text-sm text-gray-600">Actualiza tus datos</p>
              </div>
              <button
                className="sm:w-32 w-28 rounded-lg border-2 border-transparent bg-green-600 px-4 py-2 font-medium text-white sm:inline focus:outline-none focus:ring hover:bg-green-700"
                type="submit"
              >
                Save
              </button>
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">Name</p>
              <input
                placeholder="Name"
                className="mb-2 w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-green-600 sm:mr-4 sm:mb-0 focus:ring-1"
                value={name_user}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                placeholder="Tipo"
                className="w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-green-600 focus:ring-1"
                value={role}
                // readOnly={userAuth?.role !== "administrador"}
                // onChange={(e) => setTipo(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">Email</p>
              <input
                className="w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-green-600 focus:ring-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 border-b py-4 sm:flex-row">
              <p className="shrink-0 w-32 font-medium">Password</p>
              <input
                placeholder="password"
                className="w-full rounded-md border bg-gray-50 px-2 py-2 outline-none ring-green-600 focus:ring-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 py-4 lg:flex-row">
              <div className="shrink-0 w-32 sm:py-4">
                <p className="mb-auto font-medium">Foto</p>
                <p className="text-sm text-gray-600">Sube tu perfil</p>
              </div>
              <div className="flex h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 p-5 text-center">
                <Uploader
                  fileListVisible={false}
                  listType="picture"
                  action=""
                  onChange={handleChange} // Maneja el cambio de archivo
                >
                  <button style={{ width: 150, height: 150 }}>
                    {fotoRender ? (
                      <img
                        src={fotoRender}
                        width="100%"
                        height="100%"
                        alt="Preview"
                      />
                    ) : (
                      <AvatarIcon style={{ fontSize: 80 }} />
                    )}
                  </button>
                </Uploader>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Perfil;
