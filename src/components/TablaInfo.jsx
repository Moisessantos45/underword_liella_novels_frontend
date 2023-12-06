import "../css/Tabla.css";

const TablaInfo = ({ datos }) => {
  console.log(datos);
  const {
    nombre,
    generos,
    autor,
    activo,
    imagen,
    sinopsis,
    ilustrador,
    titulo,
    tipo
  } = datos;
  return (
    <>
      <section className="minfo">
        <div className="minfo_title">
          <div className="line3 bg-white"></div>
          <h1 className="title sm:text-xl text-base font-bold">{titulo}</h1>
          <div className="line2 bg-white"></div>
        </div>
        <figure className="content_portada">
          <img src={imagen} alt="" />
          <div className="web">
            <h4 className=" font-bold">Generos: {generos}</h4>
            {/* <p className="text-1">Novela en proceso</p> */}
          </div>
        </figure>
      </section>
      <section className="info">
        <table>
          <caption>Informacion de la novelas</caption>
          <thead>
            <tr>
              <th>Créditos:</th>
            </tr>
            <tr>
              <th>Autor</th>
              <td>{autor}</td>
            </tr>
            <tr>
              <th>Ilustrador:</th>
              <td>{ilustrador}</td>
            </tr>
            <tr>
              <th>Tipo:</th>
              <td>{tipo}</td>
            </tr>
            <tr>
              <th>Encargados de la Traducción:</th>
            </tr>
            <tr>
              <th>Traductor del Inglés al Español:</th>
              <td>TornanV / Frikigami</td>{" "}
            </tr>
            <tr>
              <th>activo:</th>
              <td>{activo ? "si" : "no"}</td>
            </tr>
            <tr>
              <th className="sinop" colSpan={2}>
                Sinopsis:
              </th>
            </tr>
            <tr>
              <td colSpan={2}>{sinopsis}</td>
            </tr>
          </thead>
        </table>
      </section>
    </>
  );
};

export default TablaInfo;
