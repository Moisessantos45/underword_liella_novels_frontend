import { Outlet } from "react-router-dom";
import NabvarPrincipal from "../components/NabvarPrincipal";
import Footer from "../components/Footer";
import Comentarios from "../components/Comentarios";
import { useEffect, useState } from "react";
import { useDataSiteHome } from "../Store/DataSiteHome";
import Loading from "../components/Loading";

const LayoutInicio = () => {
  const [loading, setLoading] = useState(true);
  const { fecthDataSite } = useDataSiteHome();
  useEffect(() => {
    const cargarDataSite = async () => {
      try {
        await fecthDataSite();
        setLoading(false);
      } catch (error) {
        <redirect to="/*" />;
      }
      setLoading(false);
    };
    cargarDataSite();
  }, []);
  if (loading) return <Loading />;
  return (
    <>
      <NabvarPrincipal />
      <Outlet />
      <Comentarios />
      <Footer />
    </>
  );
};

export default LayoutInicio;
