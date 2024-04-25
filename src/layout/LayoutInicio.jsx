import { Outlet } from "react-router-dom";
import NabvarPrincipal from "../components/NabvarPrincipal";
import Footer from "../components/Footer";
import Comentarios from "../components/Comentarios";
import { useDataSiteHome } from "../Store/DataSiteHome";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";

const LayoutInicio = () => {
  // const [loading, setLoading] = useState(true);
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
    refetchInterval: 3000000,
    staleTime: 3000000,
    retry: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
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
