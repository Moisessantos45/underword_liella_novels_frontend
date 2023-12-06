import "../css/ContainerAdmin.css";
import useAdmin from "../hooks/useAdmin";

const Container_admin = () => {
  const { active, bgNovel, setBg } = useAdmin();
  const bt = "../img/nueva_portda_shigatsu_v2.png";
  return (
    <>
      <main
        className={`main_container mt-16 ${active ? "active_container" : ""}`}
      >
        <h1 className="text-white font-bold text-xl">hola si funcion</h1>
        
      </main>
    </>
  );
};

export default Container_admin;
