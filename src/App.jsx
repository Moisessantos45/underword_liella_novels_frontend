import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import LayoutInicio from "./layout/LayoutInicio";
import Cards from "./components/Cards";
import Matenimiento from "./pages/Matenimiento";
import PaginasNovelas from "./pages/PaginasNovelas";
import PaginasCapitulos from "./pages/PaginasCapitulos";

const LayoutLogin = lazy(() => import("./layout/LayoutLogin"));
const FormLogin = lazy(() => import("./pages/Admin/Forms/FormLogin"));
const LayoutAdmin = lazy(() => import("./layout/LayoutAdmin"));
const Container_card = lazy(() => import("./pages/Admin/Forms/CreateVolume"));
const Container_captitulo = lazy(() =>
  import("./pages/Admin/Forms/CreateChapter")
);
const Container_novela = lazy(() => import("./pages/Admin/Forms/CreateNovel"));

const Content_cards = lazy(() => import("./pages/Admin/Content_cards"));
const Content_novelas = lazy(() => import("./pages/Admin/Content_novelas"));
const Content_capitulos = lazy(() => import("./pages/Admin/Content_capitulos"));
const FormRegistrer = lazy(() => import("./pages/Admin/Forms/FormRegistrer"));
const SubirImagenes = lazy(() => import("./pages/Admin/Forms/SubirImagenes"));
const Perfil = lazy(() => import("./pages/Admin/Perfil"));
const Content_list = lazy(() => import("./pages/Admin/Content_list"));
const Teams = lazy(() => import("./pages/Admin/Teams"));
const UploadsFiles = lazy(() => import("./pages/Admin/UploadsFiles"));
const Ilustraciones = lazy(() => import("./pages/Admin/Ilustraciones"));
const ConfiguracionSitio = lazy(() =>
  import("./pages/Admin/ConfiguracionSitio")
);
const PageError = lazy(() => import("./pages/PageError"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutInicio />,
    children: [
      {
        index: true,
        element: <Cards />,
      },
    ],
  },
  {
    path: "novela/:idNovel",
    element: <PaginasNovelas />,
  },
  {
    path: "capitulo/:idNovel/:capitulo",
    element: <PaginasCapitulos />,
  },
  {
    path: "/login-admin",
    element: <LayoutLogin />,
    children: [
      {
        index: true,
        element: <FormLogin />,
      },
    ],
  },
  {
    path: "/dashboard/:id",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Content_list />,
      },
      {
        path: "perfil",
        element: <Perfil />,
      },
      {
        path: "agregar-user",
        element: <FormRegistrer />,
      },
      {
        path: "agregar-volumen",
        element: <Container_card />,
      },
      {
        path: "agregar-capitulo",
        element: <Container_captitulo />,
      },
      {
        path: "agregar-novela",
        element: <Container_novela />,
      },
      {
        path: "actulizar-novelas",
        element: <Content_novelas />,
      },
      {
        path: "volumenes-activos",
        element: <Content_cards />,
      },
      {
        path: "capitulos-activos",
        element: <Content_capitulos />,
      },
      {
        path: "ilustraciones_activas",
        element: <Ilustraciones />,
      },
      {
        path: "subir_imagenes",
        element: <SubirImagenes />,
      },
      {
        path: "subir_file_mega",
        element: <UploadsFiles />,
      },
      {
        path: "colaboradores",
        element: <Teams />,
      },
      {
        path: "configuracion-sitio",
        element: <ConfiguracionSitio />,
      },
    ],
  },
  {
    path: "*",
    element: <PageError />,
  },
  {
    path: "/mantenimiento",
    element: <Matenimiento />,
  },
]);
