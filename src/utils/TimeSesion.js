import ModalTime from "../components/ModalTime";

const timeSesion = () => {
  setInterval(function () {
    // Obtiene la hora de inicio desde localStorage
    let horaInicio = localStorage.getItem("horaInicio");
    let tiempoTranscurrido = Date.now() - horaInicio;
    
    // Si han pasado 10 minutos (600000 milisegundos)
    if (tiempoTranscurrido > 600000) {
      // Muestra una alerta al usuario
      if (confirm("¿Deseas seguir navegando en tu cuenta?")) {
        // Si el usuario dice que sí, reinicia el contador
        localStorage.setItem("horaInicio", Date.now());
      } else {
        // Si el usuario dice que no o no responde en 10 segundos, cierra la sesión
        setTimeout(function () {
          window.location.href = "ruta_para_cerrar_sesion"; // Reemplaza esto con la ruta para cerrar la sesión
        }, 10000);
      }
    }
  }, 60000);
};
