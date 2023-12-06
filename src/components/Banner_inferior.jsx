import { Link } from "react-router-dom";
import bg from "../img/Recluta.png";
import x from "../img/twitter.png";
import face from "../img/face.png";
import discor from "../img/discor.png";
import links from "../img/links.png";

const Banner_inferior = () => {
  return (
    <>
      <section className=" w-full m-auto">
        <figure className="recluta">
          <img className="recluta_img" src={bg} alt="" />
          <p>
            Siempre estamos abiertos a reclutamiento. Para mas informacion
            escribir a la pagina de facebook a nuestro servidor de discor
          </p>
        </figure>
        <div className="explore">
          <div className="explore-content">
            <h1>Facebook</h1>
            <h3>
              Siguenos en nuestra pagian de facebook donde se suben noticias
            </h3>
          </div>
        </div>
        <section className="redes_sociales">
          <figure className="redes__content">
            <Link to="https://twitter.com/ULNovels">
              <img className="img_redes" src={x} alt="" />
            </Link>
          </figure>
          <figure className="redes__content">
            <Link to="https://www.facebook.com/ShLiellaNovels">
              <img className="img_redes" src={face} alt="" />
            </Link>
          </figure>
          <figure className="redes__content">
            <Link to="https://discord.com/invite/v5wVGbG4up">
              <img className="img_redes" src={discor} alt="" />
            </Link>
          </figure>
          <figure className="redes__content">
            <Link to="">
              <img className="img_redes" src={links} alt="" />{" "}
            </Link>
          </figure>
        </section>
      </section>
    </>
  );
};

export default Banner_inferior;
