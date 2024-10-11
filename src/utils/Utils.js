import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from "sweetalert2";

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

const showAlert = (texto) => {
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

const obtenerConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // data: { token },
  };
};

const getFormattedDate = () => {
  const ahora = new Date();

  const dia = ahora.getDate();
  const mes = ahora.getMonth() + 1;
  const año = ahora.getFullYear();

  return `${dia}-${mes}-${año}`;
};

const getCurrentTime = () => {
  const ahora = new Date();
  const horas = ahora.getHours();
  const minutos = ahora.getMinutes();
  const segundos = ahora.getSeconds();

  return `${horas}-${minutos}-${segundos}`;
};

const getCurrentDateWithTime = () => {
  return `${getFormattedDate()}-${getCurrentTime()}`;
};

const isBoolean = (value) => typeof value === "string" && value === "true";
const isNumber = (value) =>
  typeof value === "string" && Number.isNaN(Number(value));

export {
  toastify,
  showAlert,
  obtenerConfig,
  getFormattedDate,
  getCurrentTime,
  getCurrentDateWithTime,
  isBoolean,
  isNumber,
};
