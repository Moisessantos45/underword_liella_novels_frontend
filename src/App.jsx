import {
  Route,
  BrowserRouter,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import LayoutLogin from "./layout/LayoutLogin";
import LayoutInicio from "./layout/LayoutInicio";
import PaginasNovelas from "./pages/PaginasNovelas";
import Cards from "./components/Cards";
import FormLogin from "./pages/FormLogin";
import LayoutAdmin from "./layout/LayoutAdmin";

import { AuthProvider } from "./context/AuthProvider";
import Container_admin from "./components/Container_admin";
import ContainerPrincipal from "../src/pages/ContainerPrincipal";
import { AdminProvider } from "./context/AdminProvide";
import Container_card from "./components/Container_card";
import Container_captitulo from "./components/Container_captitulo";
import Container_novela from "./components/Container_novela";
import Content_cards from "./components/Content_cards";
import Content_novelas from "./components/Content_novelas";
import Content_capitulos from "./components/Content_capitulos";
import FormRegistrer from "./pages/FormRegistrer";
import SubirImagenes from "./components/SubirImagenes";
import ContainerIlustraciones from "./pages/ContainerIlustraciones";
import PaginasCapitulos from "./pages/PaginasCapitulos";
import Perfil from "./pages/Perfil";
import Prueba from "./components/prueba";
// import LayoutSlider from "./layout/LayoutSlider";
import ContentCapit from "./components/ContentCapit";
import Slider from "./components/Slider";
import Content_list from "./components/content_list";
import Teams from "./pages/Teams";

// function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <AdminProvider>
//           <Routes>
//             <Route path="/" element={<LayoutInicio />}>
//               <Route index element={<Cards />} />
//               <Route path="novela/:clave" element={<PaginasNovelas />} />
//             </Route>
//             <Route path="/login-admin" element={<LayoutLogin />}>
//               <Route index element={<FormLogin />} />
//             </Route>
//             <Route path="/dashboard" element={<LayoutAdmin />}>
//               <Route index element={<ContainerPrincipal />} />
//               <Route path="agregar" element={<Container_admin />} />
//               <Route path="agregar-volumen" element={<Container_card />} />
//               <Route
//                 path="agregar-capitulo"
//                 element={<Container_captitulo />}
//               />
//               <Route path="agregar-novela" element={<Container_novela/>} />
//             </Route>
//           </Routes>
//         </AdminProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;

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
  // {
  //   path:"/slider",
  //   element:<ContentCapit/>
  // },
  {
    path: "/dashboard",
    element: <LayoutAdmin />,
    children: [
      // {
      //   index: true,
      //   element: <ContainerPrincipal />,
      // },
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
        path: "subir_imagenes",
        element: <SubirImagenes />,
      },
      {
        path: "Ilustraciones_web",
        element: <ContainerIlustraciones />,
      },
      {
        path: "prueba",
        element: <Prueba />,
      },
      {
        path: "colaboradores",
        element: <Teams />,
      },
    ],
  },
  {
    path: "slider",
    element: <Slider />,
  },
]);
