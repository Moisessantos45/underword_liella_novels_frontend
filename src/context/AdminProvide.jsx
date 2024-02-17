import { useState, createContext, useEffect } from "react";
import urlAxios from "../config/urlAxios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ApiRequester from "../config/ApiRequester";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [active, setActive] = useState(false);
  const [bgNovel, setBackg] = useState(
    "https://i.ibb.co/p3B8t4d/nueva-portda-shigatsu.png"
  );
  const [titleNavbat, setTitleNabvar] = useState({
    title: "Traducciones de novelas ligeras",
    descripcion: "Por amor a la lectura",
  });
  const [activeDark, setDark] = useState(false);
  const [modal, setModal] = useState(false);
  const [novelasInfo, setNovelasInfo] = useState([]);
  const [cardsVol, setCarsVol] = useState([]);
  const [capitulosInfo, setCapitulosInfo] = useState([]);
  //edicion
  const [cardEditar, setEditarCard] = useState({});
  const [datosEdit, setDatos] = useState({});
  const [data_cuenta, setDataUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [confirmar_delate, setConfirmar] = useState(false);
  const [mostrar_modal, setMostrar_modal] = useState(false);
  const [modalTime, setModalTime] = useState(false);

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

  useEffect(() => {
    let mode_dark = JSON.parse(localStorage.getItem("modo_dark")) || false;
    setDark(mode_dark);
  }, []);

  const editarCard = (card) => {
    setEditarCard(card);
  };

  const enviarDatos = async (dato, tipo) => {
    console.log("enviarDatos", dato, tipo);
    if (dato?.id) {
      if (tipo == "cards") {
        // const { id, ...newData } = dato;
        try {
          const data = await ApiRequester("put", "/novelas/cards", dato);
          // const { data } = await urlAxios.put("/novelas/cards", dato);
          const volActulizados = cardsVol.map((vol) =>
            vol.id == data.id ? data : vol
          );
          setCarsVol(volActulizados);
          toastify("Volumen actualizado", true);
        } catch (error) {
          toastify(error.response.data.msg, false);
          // console.log(error);
        }
      } else if (tipo == "capitulos") {
        // const { id, ...newData } = dato;
        // console.log("actalizar",dato);
        try {
          const { data } = await urlAxios.put("/capitulo", dato);
          const capitulosActualizados = capitulosInfo.map((capi) =>
            capi.id == data.id ? data : capi
          );
          setCapitulosInfo(capitulosActualizados);
          toastify("Capitulo actualizado", true);
        } catch (error) {
          toastify(error.response.data.msg, false);
          // console.log(error);
        }
      } else if (tipo == "novela") {
        // const { id, ...newData } = dato;
        try {
          const { data } = await urlAxios.put("/novelas", dato);
          // console.log(data)
          const novelasActulizados = novelasInfo.map((novela) =>
            novela.id == data.id ? data : novela
          );
          setNovelasInfo(novelasActulizados);
          toastify("Novela actulizada", true);
        } catch (error) {
          toastify(error.response.data.msg, false);
          // console.log(error);
        }
      }
    } else {
      if (tipo == "cards") {
        const { id, ...newData } = dato;
        try {
          const { data } = await urlAxios.post("/novelas/cards", newData);
          setCarsVol([data, ...cardsVol]);
          toastify("Volumen agregado", true);
        } catch (error) {
          toastify(error.response.data.msg, false);
          // console.log(error);
        }
      } else if (tipo == "capitulos") {
        const { id, ...newData } = dato;
        try {
          const data = await ApiRequester("post", "/capitulo", newData);
          // const { data } = await urlAxios.post("/capitulo", newData);
          setCapitulosInfo([data, ...capitulosInfo]);
          toastify("Capitulo agregado", true);
        } catch (error) {
          toastify(error.response.data.msg, false);
          // console.log(error);
        }
      } else if (tipo == "novela") {
        const { id, ...newData } = dato;
        try {
          const { data } = await urlAxios.post("/novelas", newData);
          setNovelasInfo([data, ...novelasInfo]);
          toastify("Novela agregada", true);
        } catch (error) {
          toastify(error.response.data.msg, false);
          // console.log(error);
        }
      }
    }
  };

  const obtenerDatos = async (data) => {
    // console.log("data de novel o capi", data);
    setDatos(data);
  };

  const obtenerDatosUser = (user) => {
    setDataUser(user);
  };

  const eliminarDatos = async (id, tipo) => {
    if (tipo == "cards") {
      // console.log("tipo", tipo);
      try {
        await urlAxios.delete(`/novelas/cards/${id}`);
        const datosActulizados = cardsVol.filter((itens) => itens.id !== id);
        setCarsVol(datosActulizados);
        toastify("Volumen eliminado", true);
      } catch (error) {
        toastify(error.response.data.msg, false);
        // console.log(error);
      }
    } else if (tipo == "capitulos") {
      try {
        await urlAxios.delete(`/capitulo/${id}`);
        const datosActulizados = capitulosInfo.filter(
          (itens) => itens.id !== id
        );
        setCapitulosInfo(datosActulizados);
        toastify("Capitulo eliminado", true);
      } catch (error) {
        toastify(error.response.data.msg, false);
        // console.log(error);
      }
    } else if (tipo == "novelas") {
      // console.log(tipo);
      try {
        await urlAxios.delete(`/novelas/${id}`);
        const datosActulizados = novelasInfo.filter((itens) => itens.id !== id);
        setNovelasInfo(datosActulizados);
        toastify("Novela eliminada", true);
      } catch (error) {
        toastify(error.response.data.msg, false);
        // console.log(error);
      }
    } else if (tipo == "user") {
      try {
        await urlAxios.delete(`/underwordliellanovels/eliminar-user/${id}`);
        const datosActualizados = users.filter((itens) => itens.id !== id);
        setUsers(datosActualizados);
        toastify(`${tipo} eliminado`, true);
      } catch (error) {
        toastify(error.response.data.msg, false);
        // console.log(error);
      }
    }
  };

  const registrar = async (user) => {
    const { email, password, tipo, id, foto_perfil, name_user } = user;
    const token = localStorage.getItem("token");
    const confi = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { token },
    };
    if (!user.id_user) {
      try {
        await urlAxios.post(
          `/underwordliellanovels/agregar-users`,
          {
            email,
            password,
            tipo,
            id,
            foto_perfil,
            name_user,
          },
          confi
        );
        toastify(`${tipo} registrado`, true);
      } catch (error) {
        toastify(error.response.data.msg, false);
        // console.log(error);
      }
    } else {
      try {
        const { data } = await urlAxios.put(
          `/underwordliellanovels/actulizar-datos`,
          {
            email,
            password,
            tipo,
            foto_perfil,
            name_user,
          },
          confi
        );
        toastify(`${tipo} registrado`, true);
      } catch (error) {
        toastify(error.response.data.msg, false);
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    const obtenerNovelas = async () => {
      try {
        const { data } = await urlAxios("/novelas");
        setNovelasInfo(data);
      } catch (error) {
        toastify(error.response.data.msg, false);
      }
    };
    const obtenerVolumenes = async () => {
      try {
        const { data } = await urlAxios("/novelas/cards");
        setCarsVol(data);
      } catch (error) {
        toastify(error.response.data.msg, false);
      }
    };
    const obtenerCaptiulos = async () => {
      try {
        const { data } = await urlAxios("/capitulo");
        setCapitulosInfo(data);
      } catch (error) {
        toastify(error.response.data.msg, false);
      }
    };
    obtenerNovelas();
    obtenerVolumenes();
    obtenerCaptiulos();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        setActive,
        active,
        bgNovel,
        setBackg,
        titleNavbat,
        setTitleNabvar,
        novelasInfo,
        setNovelasInfo,
        cardsVol,
        setCarsVol,
        capitulosInfo,
        setCapitulosInfo,
        modal,
        setModal,
        editarCard,
        cardEditar,
        setEditarCard,
        enviarDatos,
        obtenerDatosUser,
        obtenerDatos,
        datosEdit,
        setDatos,
        eliminarDatos,
        registrar,
        activeDark,
        setDark,
        data_cuenta,
        setDataUser,
        users,
        setUsers,
        setConfirmar,
        confirmar_delate,
        mostrar_modal,
        setMostrar_modal,
        modalTime,
        setModalTime
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
