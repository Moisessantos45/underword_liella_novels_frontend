import { Link } from "react-router-dom";
import "../css/CardsVol.css";

const CardsVol = ({ datos, info }) => {
  return (
    <>
      {datos && info.length==0 || info ? (
        <section className="volumes">
          {/* <div className="volumen_title">
            <div className="line3"></div>
            <h1 className="title">Volumenes</h1>
            <div className="line2"></div>
          </div> */}
          {datos.sort((a, b) => Number(a.volumen) - Number(b.volumen)).map((vol) => (
            <figure className="volumes_content" key={vol.id}>
              <img src={vol.imagen} alt="" />
              <div className="vol">
                <h4 className="w-full text-center h-5">Volumen {vol.volumen}</h4>
                {/* <p className="text-1">
                  {vol.captiuloActive ? vol.capitulo[0] : ""}
                </p> */}
                {vol.captiuloActive && (
                  <div className="flex items-center justify-center flex-wrap">
                    {" "}
                    <p>{vol.capitulo}</p>
                    {info.map((capi,i) => (
                      <Link key={i}
                        to={`/capitulo/${vol.clave}/${capi.capitulo}`}
                        className="link-url"
                      >
                        {capi.capitulo}
                      </Link>
                    ))}
                  </div>
                )}
                {vol.mega && (
                  <Link to={`${vol.mega}`} className="link-url">
                    Mega
                  </Link>
                )}
                {vol.mediafire && (
                  <Link to={`${vol.mediafire}`} className="link-url">
                    Mediafire
                  </Link>
                )}
                {vol.megaEpub && (
                  <Link to={`${vol.megaEpub}`} className="link-url">
                    Mega Epub
                  </Link>
                )}
                {vol.mediafireEpub && (
                  <Link to={`${vol.mediafireEpub}`} className="link-url">
                    Mediafire Epub
                  </Link>
                )}
              </div>
            </figure>
          ))}
        </section>
      ) : (
        <h1 className="font-bold text-3xl text-center m-3">No hay Volumenes</h1>
      )}
    </>
  );
};

export default CardsVol;
