import "../css/Ilustraciones.css";

const Ilustraciones = ({ datos }) => {
  const urls = datos.ilustraciones.split(",");
  return (
    <>
      {datos.ilustraciones ? (
        <section className="tours">
          <div className="col content-col">
            <div className="line4"></div>
            <h1 className="text-xl">Ilustraciones de la novela</h1>
            <div className="line4"></div>
          </div>
          <div className="col image-col">
            {urls.map((url, index) => (
              <img key={index} src={url} alt="" />
            ))}
          </div>
        </section>
      ) : (
        <h1 className="font-bold text-3xl text-center m-3">No hay ilustraciones</h1>
      )}
    </>
  );
};

export default Ilustraciones;
