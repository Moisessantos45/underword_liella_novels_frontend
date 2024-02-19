import { createBrowserRouter } from "react-router-dom";
import LayoutLogin from "./layout/LayoutLogin";
import LayoutInicio from "./layout/LayoutInicio";
import PaginasNovelas from "./pages/PaginasNovelas";
import Cards from "./components/Cards";
import FormLogin from "./pages/FormLogin";
import LayoutAdmin from "./layout/LayoutAdmin";

import Container_card from "./components/Container_card";
import Container_captitulo from "./components/Container_captitulo";
import Container_novela from "./components/Container_novela";
import Content_cards from "./components/Content_cards";
import Content_novelas from "./components/Content_novelas";
import Content_capitulos from "./components/Content_capitulos";
import FormRegistrer from "./pages/FormRegistrer";
import SubirImagenes from "./components/SubirImagenes";
import PaginasCapitulos from "./pages/PaginasCapitulos";
import Perfil from "./pages/Perfil";
import Content_list from "./components/Content_list";
import Teams from "./pages/Teams";
import UploadsFiles from "./pages/UploadsFiles";
import Ilustraciones from "./components/Ilustraciones";
import ConfiguracionSitio from "./pages/ConfiguracionSitio";
import PageError from "./pages/PageError";

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
    path: "novela/:clave",
    element: <PaginasNovelas />,
  },
  {
    path: "capitulo/:clave/:capitulo",
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
]);
