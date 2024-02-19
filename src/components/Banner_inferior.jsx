import { Link } from "react-router-dom";
import { useDataSiteHome } from "../Store/DataSiteHome";

const Banner_inferior = () => {
  const { dataSite } = useDataSiteHome();
  const back = dataSite.imagenFacebook.toString();
  const linksRedesSociales = JSON.parse(dataSite.enlacesRedesSociales);
  return (
    <>
      <section className=" w-full m-auto">
        <figure className="recluta">
          <img
            className="recluta_img"
            src={dataSite.imagenReclutamiento}
            alt=""
          />
          <p>{dataSite.MensajeReclutamiento}</p>
        </figure>
        <div className="explore" style={{ backgroundImage: `url(${back})` }}>
          <div className="explore-content">
            <h1>{dataSite.nombreRedSocial}</h1>
            <h3>{dataSite.mensajeSeguirRedSocial}</h3>
          </div>
        </div>
        <section className="redes_sociales gap-2">
          {linksRedesSociales.map((link, i) => (
            <figure className="redes__content" key={i}>
              <Link to={`${link.enlace}`}>
                <i className={` text-5xl ${link.icon}`}></i>
              </Link>
            </figure>
          ))}
        </section>
      </section>
    </>
  );
};

export default Banner_inferior;
