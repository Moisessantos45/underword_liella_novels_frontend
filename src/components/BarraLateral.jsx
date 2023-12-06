import { NavLink } from "react-router-dom";
import "../css/BarraLateral.css";
import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const BarraLateral = () => {
  const { active, setActive } = useAdmin();
  const [addClass, setClass] = useState(false);
  const { userType } = useAuth();
  const handelClick = () => {
    setClass(!addClass);
    setActive(!active);
  };

  return (
    <>
      <img
        src="../src/img/bars.png"
        alt="" 
        className={`logo ${addClass ? "active_clas" : ""}`}
        onClick={handelClick}
      />
      <nav className={`menu_lateral ${addClass ? "active" : ""}`}>
        <ul className="menu_lateral-list">
          <li className="list_item">
            <img src="../src/img/icon_casita.png" className="icon_logo" />
            <NavLink to="/dashboard" className="list_item_navlink">
              Inicio
            </NavLink>
          </li>
          {userType === "administrador" ? (
            <li className="list_item">
              <img src="../src/img/icon_user.png" className="icon_logo" />
              <NavLink to="agregar-user" className="list_item_navlink">
                {!addClass ? "Add" : "Add User"}
              </NavLink>
            </li>
          ) : (
            ""
          )}
          <li className="list_item">
            <img src="../src/img/agregar_icon.png" className="icon_logo" />
            <NavLink to="agregar-novela" className="list_item_navlink">
              {!addClass ? "Add" : "Add novela"}
            </NavLink>
          </li>
          <li className="list_item">
            <img src="../src/img/agregar_icon.png" className="icon_logo" />
            <NavLink className="list_item_navlink" to="agregar-volumen">
              {!addClass ? "Add" : "Add volumen"}
            </NavLink>
          </li>
          <li className="list_item">
            <img src="../src/img/agregar_icon.png" className="icon_logo" />
            <NavLink className="list_item_navlink" to="agregar-capitulo">
              {!addClass ? "Add " : "Add capitulo"}
            </NavLink>
          </li>
          <li className="list_item">
            <img src="../src/img/actualizar_icon.png" className="icon_logo" />
            <NavLink className="list_item_navlink" to="actulizar-novelas">
              {!addClass ? "Update" : "Update Novela"}
            </NavLink>
          </li>
          <li className="list_item">
            <img src="../src/img/actualizar_icon.png" className="icon_logo" />
            <NavLink className="list_item_navlink" to="volumenes-activos">
              {!addClass ? "Update" : "Update Volumen"}
            </NavLink>
          </li>
          <li className="list_item">
            <img src="../src/img/actualizar_icon.png" className="icon_logo" />
            <NavLink className="list_item_navlink" to="capitulos-activos">
              {!addClass ? "Update" : "Update Capitulo"}
            </NavLink>
          </li>
          <li className="list_item">
            <img src="../src/img/subir-archivos.png" className="icon_logo" />
            <NavLink className="list_item_navlink" to="subir_imagenes">
              {!addClass ? "upload" : "upload imagen"}
            </NavLink>
          </li>
          <li className="list_item">
            <img src="../src/img/icon_image.png" className="icon_logo" />
            <NavLink className="list_item_navlink" to="Ilustraciones_web">
              {!addClass ? "Ilustraciones" : "Ilustraciones"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BarraLateral;
