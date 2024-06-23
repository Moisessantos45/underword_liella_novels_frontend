import { Outlet } from "react-router-dom";
import NabvarPrincipal from "../components/NabvarPrincipal";
import Footer from "../components/Footer";
import Comentarios from "../components/Comentarios";
import { useDataSiteHome } from "../Store/DataSiteHome";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const LayoutInicio = () => {
  const { fecthDataSite } = useDataSiteHome();

  const cargarDataSite = async () => {
    try {
      await fecthDataSite();
      return;
    } catch (error) {
      <redirect to="/*" />;
    }
  };

  const { isLoading } = useQuery({
    queryKey: ["fetchSite"],
    queryFn: cargarDataSite,
    refetchInterval: 60000,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <NabvarPrincipal />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Comentarios />
      <Footer />
    </>
  );
};

export default LayoutInicio;
