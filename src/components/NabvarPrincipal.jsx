import "../css/MenuHeader.css";
import "../css/styles.css";
import icon_logo from "../img/Marca.png";
import { useDataSiteHome } from "../Store/DataSiteHome";

const NabvarPrincipal = () => {
  const { dataSite } = useDataSiteHome();
  return (
    <>
      <img
        src={icon_logo}
        alt=""
        className="absolute w-32 h-20 cursor-pointer hover:scale-105 btn_logo"
      />
      <header
        className="header m-auto relative top-0 left-0"
        style={{
          backgroundImage: `url(${dataSite.fondoPagina})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="header-content">
          <h1 className="flex sm:text-2xl text-xl">{dataSite.tituloPagina}</h1>
        </div>
      </header>
    </>
  );
};

export default NabvarPrincipal;
