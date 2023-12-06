import { useState } from "react";
import "../css/uploadImg.css";
import useAdmin from "../hooks/useAdmin";
import axios from "axios";
import NavbarSlider from "./NavbarSlider";

const SubirImagenes = () => {
  const apiKey = import.meta.env.VITE_URL_APIKEY;
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const { active,activeDark } = useAdmin();

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Itera a través de los archivos seleccionados y realiza una solicitud para cada uno
    const uploadedUrls = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        return data.data.url;
      })
    );

    // Actualiza el estado con las URLs de las imágenes subidas
    setUrls(uploadedUrls);
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <>
     <section className={`content bg-zinc-100 text-black ${activeDark?"dark":""}`}>
      <NavbarSlider/>
        <section className="container bg-slate-200 shadow-md shadow-slate-100">
          <form
            className="gap-3 justify-center items-center flex flex-col form_file"
            onSubmit={handleSubmit}
          >
            <h1 className="title text-black">Subir imágenes a ImgBB</h1>
            <label
              htmlFor="file-input"
              className="label_file flex justify-center items-center rounded-lg"
            >
              Seleccionar imágenes
            </label>
            <input
              type="file"
              id="file-input"
              multiple
              onChange={handleFileChange}
            />
            <button id="upload-btn" type="submit">
              Subir imágenes
            </button>
          </form>
          <div id="output" className="container_url">
            {urls.map((url, index) => (
              <div key={index} className="container_url-links">
                <strong className=" text-black">URL {index + 1}:</strong>
                <p className="urlimg text-black">{url}</p>
                <button onClick={() => copyToClipboard(url)} className="copy text-black">Copiar URL</button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default SubirImagenes;
