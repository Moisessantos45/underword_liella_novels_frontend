import { Navigate, Outlet } from "react-router-dom";
import NabvarPrincipal from "../components/NabvarPrincipal";
import Footer from "../components/Footer";
import Comentarios from "../components/Comentarios";
import { useDataSiteHome } from "../Store/DataSiteHome";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const LayoutInicio = () => {
  const { fecthDataSite, isMaintenanceMode } = useDataSiteHome();

  const cargarDataSite = async () => {
    try {
      await fecthDataSite();
      return;
    } catch (error) {
      <Navigate to="/error" />;
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
      {isMaintenanceMode === "false" ? (
        <Navigate to="/mantenimiento" replace={true}/>
      ) : (
        <>
          <NabvarPrincipal />
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
          <Comentarios />
          <Footer />
        </>
      )}
    </>
  );
};

export default LayoutInicio;
