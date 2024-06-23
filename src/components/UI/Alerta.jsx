import Swal from "sweetalert2";

const Alerta = ({ alerta }) => {
  return Swal.fire({
    icon: "error",
    width: 300,
    title: alerta.msg,
    timer: 1500,
    customClass: {
      title: "mi-clase",
    },
  });
};
export default Alerta;
