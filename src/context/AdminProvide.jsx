import { useState, createContext, useEffect } from "react";
import urlAxios from "../config/urlAxios.js";
import ApiRequester from "../config/ApiRequester.js";
import { obtenerConfig, toastify } from "../utils/Utils.js";
import { errorHandle } from "../Services/errorHandle.js";

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

  const TIPOS = {
    CARDS: "cards",
    CAPITULOS: "capitulos",
    NOVELA: "novela",
    USER: "user",
  };

  const URLS = {
    NOVELAS: "/novelas",
    VOLUMENES: "/novelas/cards",
    CAPITULOS: "/capitulos",
  };

  useEffect(() => {
    let mode_dark = JSON.parse(localStorage.getItem("modo_dark")) || false;
    setDark(mode_dark);
  }, []);

  const handleDeleteRequest = async (url, id) => {
    try {
      await urlAxios.delete(url);
      return { success: true };
    } catch (error) {
      errorHandle(error);
      return { success: false };
    }
  };

  const editarCard = (card) => {
    setEditarCard(card);
  };

  const actualizarEstado = (tipo, data) => {
    switch (tipo) {
      case TIPOS.CARDS:
        setCarsVol((prev) =>
          prev.map((vol) => (vol.id == data.id ? data : vol))
        );
        break;
      case TIPOS.CAPITULOS:
        setCapitulosInfo((prev) =>
          prev.map((capi) => (capi.id == data.id ? data : capi))
        );
        break;
      case TIPOS.NOVELA:
        setNovelasInfo((prev) =>
          prev.map((novela) => (novela.id == data.id ? data : novela))
        );
        break;
      default:
        break;
    }
  };

  const agregarEstado = (tipo, data) => {
    switch (tipo) {
      case TIPOS.CARDS:
        setCarsVol((prev) => [data, ...prev]);
        break;
      case TIPOS.CAPITULOS:
        setCapitulosInfo((prev) => [data, ...prev]);
        break;
      case TIPOS.NOVELA:
        setNovelasInfo((prev) => [data, ...prev]);
        break;
      default:
        break;
    }
  };

  const enviarDatos = async (dato, tipo) => {
    if (dato?.id) {
      let url = "";
      switch (tipo) {
        case TIPOS.CARDS:
          url = "/novelas/cards";
          break;
        case TIPOS.CAPITULOS:
          url = "/capitulo";
          break;
        case TIPOS.NOVELA:
          url = "/novelas";
          break;
        default:
          return;
      }

      const response = await ApiRequester("put", url, dato);
      if (response.success) {
        actualizarEstado(tipo, response.data);
        toastify(
          `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} actualizado`,
          true
        );
      } else {
        toastify(response.error.response.data.msg, false);
      }
    } else {
      const { id, ...newData } = dato;
      let url = "";
      switch (tipo) {
        case TIPOS.CARDS:
          url = "/novelas/cards";
          break;
        case TIPOS.CAPITULOS:
          url = "/capitulos";
          break;
        case TIPOS.NOVELA:
          url = "/novelas";
          break;
        default:
          return;
      }

      const response = await ApiRequester("post", url, newData);
      if (response.success) {
        agregarEstado(tipo, response.data);
        toastify(
          `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} agregado`,
          true
        );
      }
    }
  };

  const obtenerDatos = async (data) => {
    setDatos(data);
  };

  const obtenerDatosUser = (user) => {
    setDataUser(user);
  };

  const actualizarEstadoDespuesDeEliminar = (tipo, id) => {
    switch (tipo) {
      case TIPOS.CARDS:
        setCarsVol((prev) => prev.filter((item) => item.id !== id));
        break;
      case TIPOS.CAPITULOS:
        setCapitulosInfo((prev) => prev.filter((item) => item.id !== id));
        break;
      case TIPOS.NOVELA:
        setNovelasInfo((prev) => prev.filter((item) => item.id !== id));
        break;
      case TIPOS.USER:
        setUsers((prev) => prev.filter((item) => item.id !== id));
        break;
      default:
        break;
    }
  };

  const eliminarDatos = async (id, tipo) => {
    let url = "";
    switch (tipo) {
      case TIPOS.CARDS:
        url = `/novelas/cards/${id}`;
        break;
      case TIPOS.CAPITULOS:
        url = `/capitulos/${id}`;
        break;
      case TIPOS.NOVELA:
        url = `/novelas/${id}`;
        break;
      case TIPOS.USER:
        url = `/admin/eliminar-user/${id}`;
        break;
      default:
        return;
    }

    const response = await handleDeleteRequest(url, id);
    if (response.success) {
      actualizarEstadoDespuesDeEliminar(tipo, id);
      toastify(
        `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} eliminado`,
        true
      );
    }
  };

  const registrar = async (user) => {
    const { email, password, tipo, id, foto_perfil, name_user } = user;

    const dataUser = {
      email,
      password,
      tipo,
      foto_perfil,
      name_user,
    };

    const config = obtenerConfig();

    if (!user.id_user) {
      try {
        await urlAxios.post(
          `/admin/agregar-users`,
          { ...dataUser, id },
          config
        );
        toastify(`${tipo} registrado`, true);
      } catch (error) {
        errorHandle(error);
      }
    } else {
      try {
        await urlAxios.put(`/admin/actualizar-datos`, dataUser, config);
        toastify(`${tipo} actualizado`, true);
      } catch (error) {
        errorHandle(error);
      }
    }
  };

  const obtenerData = async (url, setData) => {
    try {
      const { data } = await urlAxios(url);
      setData(data);
    } catch (error) {
      errorHandle(error);
    }
  };

  const SesionLogout = async (email) => {
    try {
      await urlAxios.post("/admin/logout", {
        email,
      });
      return;
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    obtenerData(URLS.NOVELAS, setNovelasInfo);
    obtenerData(URLS.VOLUMENES, setCarsVol);
    obtenerData(URLS.CAPITULOS, setCapitulosInfo);
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
        setModalTime,
        SesionLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
