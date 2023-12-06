import "../css/ContainerPrincipal.css";
import useAdmin from "../hooks/useAdmin";
import img from "../img/icon_user.png";
import img_visit from "../img/icon-post.jpg";
import useAuth from "../hooks/useAuth";

const ContainerPrincipal = () => {
  const { active } = useAdmin();
  const { userAuth, setAuth, cargando } = useAuth();
  return (
    <>
      <main
        className={`container_principal ${active ? "active_container" : ""}`}
      >
        <section className="flex w-full justify-evenly h-52 margin">
          <figure className="card flex justify-center h-32 w-44 flex-wrap items-center m-1 shadow-lg rounded-lg text-center">
            <h2 className="w-full h-6 font-bold text-slate-600">TOTAL VISIT</h2>
            <div className="w-full flex justify-evenly flex-wrap">
              <h1 className="w-full h-6">2000</h1>
              <p className="text-gray-400">30 last</p>
              <img src={img} alt="" className="h-12 w-12 rounded-lg" />
            </div>
          </figure>
          <figure className="flex justify-center h-32 w-44 flex-wrap items-center m-1 shadow-lg rounded-lg text-center">
            <h2 className="w-full h-6 font-bold text-slate-600">TOTAL USER</h2>
            <div className="w-full flex justify-evenly flex-wrap">
              <h1 className="w-full text-gray-600 h-6">2</h1>
              <p className="text-gray-400">Adminis</p>
              <img src={img_visit} alt="" className="h-10 w-10 rounded-lg" />
            </div>
          </figure>
        </section>
        {/* <section className="flex w-full m-auto scroll-post">
        <table className="flex justify-center w-full flex-col">
          <caption className="w-full font-bold capitalize">Ultimos comentarios</caption>
          <thead className="flex justify-evenly w-full">
            <tr>
              <th>Usuario</th>
              <td>Date</td>
              <td>comentarios</td>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>moy@correo.com</td>
            <td>12/23/2392</td>
            <td>excelente</td>
          </tr>
        </tbody>
        </table>
        
        </section> */}
      </main>
    </>
  );
};

export default ContainerPrincipal;
