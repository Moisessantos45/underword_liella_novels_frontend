import { Link } from "react-router-dom";
import { useDataSiteHome } from "../Store/DataSiteHome";

const Banner_inferior = () => {
  const { dataSite } = useDataSiteHome();
  const back = dataSite.imagenFacebook.toString();
  const linksRedesSociales = JSON.parse(dataSite.enlacesRedesSociales);
  return (
    <>
      <section className="w-full m-auto">
        <figure className="recluta rounded-lg overflow-hidden shadow-lg">
          <img
            className="recluta_img w-full"
            src={dataSite.imagenReclutamiento}
            alt="Imagen de reclutamiento"
          />
          <p className="p-4">{dataSite.MensajeReclutamiento}</p>
        </figure>

        <div
          className="explore mt-4 rounded-lg overflow-hidden shadow-lg"
          style={{ backgroundImage: `url(${back})` }}
        >
          <div className="explore-content p-4 text-center text-white">
            <h1 className="text-2xl font-bold">{dataSite.nombreRedSocial}</h1>
            <h3 className="mt-2">{dataSite.mensajeSeguirRedSocial}</h3>
          </div>
        </div>

        <section className="redes_sociales mt-4 flex justify-center gap-4">
          {linksRedesSociales.map((link, i) => (
            <figure className="redes__content" key={i}>
              <Link to={`${link.enlace}`}>
                <i className={`text-5xl ${link.icon}`}></i>
              </Link>
            </figure>
          ))}
        </section>
      </section>
    </>
  );
};

export default Banner_inferior;
