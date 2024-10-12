import { useDataSiteHome } from "../Store/DataSiteHome";
import bg from "../img/Otonari_1.jpg";

const Nosotros = () => {
  const { dataSite } = useDataSiteHome();
  return (
    <section className="w-11/12 flex flex-col justify-center items-center gap-2 text-center mx-auto my-4">
      <h1 className="sm:text-2xl text-xl">{dataSite.encabezado}</h1>
      <p>{dataSite.detalles}</p>
      <img
        className="sm:w-7/12 w-11/12 self-center m-2 h-80 sm:h-80 object-cover rounded-lg shadow-lg"
        src={bg}
        alt="Imagen de fondo de la sección Nosotros"
      />
      <h1 className="text-xl mt-4">{dataSite.tituloNosotros}</h1>
      <p className="whitespace-pre-line font-bold text-sm leading-loose sm:w-10/12 w-11/12 mx-auto my-4 text-white">
        {dataSite.acercaDeNosotros}
      </p>
    </section>
  );
};

export default Nosotros;
