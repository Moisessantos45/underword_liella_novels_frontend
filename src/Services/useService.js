const fromToJsonMapNovel = (data) => {
  return {
    id: data["id"] || "",
    activo: data["activo"],
    autor: data["autor"] || "",
    backgroud: data["backgroud"] || "",
    capitulos: data["capitulos"] || [],
    encargados: data["encargados"] || [],
    generos: data["generos"] || [],
    ilustrador: data["ilustrador"] || "",
    imagen: data["imagen"] || "",
    scans: data["scans"] || [],
    sinopsis: data["sinopsis"] || "",
    tipo: data["tipo"] || "",
    titulo: data["titulo"] || "",
  };
};

const fromToJsonMapVolumen = (data) => {
  return {
    id: data["id"] || "",
    idNovel: data["idNovel"] || "",
    capitulo: data["capitulo"] || "",
    captiuloActive: data["captiuloActive"],
    createdAt: data["createdAt"] || "",
    imagen: data["imagen"] || "",
    link: data["link"] || "",
    links: data["links"] || [],
    mediafire: data["mediafire"] || "",
    mediafireEpub: data["mediafireEpub"] || "",
    mega: data["mega"] || "",
    megaEpub: data["megaEpub"] || "",
    volumen: data["volumen"] || "",
  };
};

const fromToJsonMapChapter = (data) => {
  return {
    id: data["id"] || "",
    idNovel: data["idNovel"] || "",
    capitulo: data["capitulo"] || "",
    contenido: data["contenido"] || "",
    createdAt: data["createdAt"] || "",
    nombre: data["nombre"] || "",
    titulo: data["titulo"] || "",
  };
};

const fromToJsonMapSite = async (data) => {
  return {
    MensajeReclutamiento: data["MensajeReclutamiento"] || "",
    acercaDeNosotros: data["acercaDeNosotros"] || "",
    activoReclutamiento: data["activoReclutamiento"],
    detalles: data["detalles"] || [],
    encabezado: data["encabezado"] || "",
    enlacesRedesSociales: data["enlacesRedesSociales"] || [],
    fondoNosotros: data["fondoNosotros"] || "",
    fondoPagina: data["fondoPagina"] || "",
    imagenFacebook: data["imagenFacebook"] || "",
    imagenReclutamiento: data["imagenReclutamiento"] || "",
    isMaintenanceMode: data["isMaintenanceMode"],
    mensajeSeguirRedSocial: data["mensajeSeguirRedSocial"] || "",
    nombreRedSocial: data["nombreRedSocial"] || "",
    tituloNosotros: data["tituloNosotros"] || "",
    tituloPagina: data["tituloPagina"] || "",
  };
};

// Función para convertir la cadena de fecha en un objeto Date
const convertirADate = (fechaStr) => {
  const [dia, mes, año, horas, minutos, segundos] = fechaStr
    .split("-")
    .map(Number);
  return new Date(año, mes - 1, dia, horas, minutos, segundos); // mes - 1 porque los meses en JavaScript son 0-indexados
};

const sortDate = (fechas) => {
  // Ordenar el array de fechas
  const fechasOrdenadas = fechas.sort((a, b) => {
    return convertirADate(b) - convertirADate(a); // Ordenar del más reciente al más antiguo
  });

  return fechasOrdenadas;
};

const extractIllustrations = (items) => {
  return items.reduce((ilustraciones, item) => {
    ["imagen", "backgroud"].forEach((key) => {
      if (
        item[key] &&
        (key !== "backgroud" ||
          item[key].startsWith("https://i.ibb.co") ||
          item[key].startsWith("https://res.cloudinary"))
      ) {
        ilustraciones.push({ imagen: item[key] });
      }
    });
    return ilustraciones;
  }, []);
};

export { sortDate, convertirADate, extractIllustrations };
