import "../css/Tabla.css";

const TablaInfo = ({ datos }) => {
  const {
    generos,
    autor,
    activo,
    imagen,
    sinopsis,
    ilustrador,
    titulo,
    tipo,
    encargados,
  } = datos;
  return (
    <>
      <div className="container mx-auto p-4">
        <section className="minfo bg-[#2f2f2f] p-4 rounded-lg shadow-sm">
          <div className="minfo_title flex items-center justify-between my-4">
            <div className="line3 bg-white h-1 w-10/12"></div>
            <h1 className="title sm:text-xl text-base font-bold text-white">
              {titulo}
            </h1>
            <div className="line2 bg-white h-1 w-10/12"></div>
          </div>
          <figure className="content_portada flex flex-col items-center">
            <img
              src={imagen}
              alt={titulo}
              className="w-64 rounded-lg shadow-md"
            />
            <div className="web mt-4 text-white">
              <h4 className="font-bold">Géneros: {generos}</h4>
            </div>
          </figure>
        </section>
        <section className="info mt-8 bg-[#2f2f2f] p-4 rounded-lg shadow-lg">
          <table className="w-full text-white">
            <caption className="text-xl font-bold mb-4">
              Información de la Novela
            </caption>
            <tbody>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left">Autor:</th>
                <td className="py-2">{autor}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left">Ilustrador:</th>
                <td className="py-2">{ilustrador}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left">Tipo:</th>
                <td className="py-2">{tipo}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left" colSpan={2}>
                  Encargados de la Traducción:
                </th>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left">
                  Traductor del Inglés al Español:
                </th>
                <td className="py-2">{encargados}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left">Activo:</th>
                <td className="py-2">{activo ? "Sí" : "No"}</td>
              </tr>
              <tr className="border-b border-gray-700">
                <th className="py-2 text-left" colSpan={2}>
                  Sinopsis:
                </th>
              </tr>
              <tr>
                <td className="py-2" colSpan={2}>
                  {sinopsis}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default TablaInfo;
