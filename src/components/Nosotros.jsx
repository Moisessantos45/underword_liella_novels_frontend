import { useDataSiteHome } from "../Store/DataSiteHome";
import bg from "../img/Otonari_1.jpg";

const Nosotros = () => {
  const {dataSite}=useDataSiteHome()
  return (
    <section className=" w-11/12 flex-col flex-wrap justify-center gap-2 flex text-center margin">
      <h1 className=" sm:text-xl">{dataSite.encabezado}</h1>
      <p>{dataSite.detalles}</p>
      <img
        className=" sm:w-7/12 w-11/12 self-center m-2 sm:h-80 h-64"
        src={bg}
        alt=""
      />
      <h1 className=" text-xl">{dataSite.tituloNosotros}</h1>
      <pre className=" whitespace-pre-line font-bold text-sm w-11/12 margin lineHeigth">
        {dataSite.acercaDeNosotros}
      </pre>
    </section>
  );
};

export default Nosotros;
