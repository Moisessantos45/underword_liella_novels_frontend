import { useState } from "react";
import "../css/slider.css";
import useAdmin from "../hooks/useAdmin";
import NavbarSlider from "./NavbarSlider";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Content_list = () => {
  const { activeDark, novelasInfo } = useAdmin();
  const { userCont, ultimosCapitulo, ultimosCards,visitas_actuales,userAuth } = useAuth();
  const fecha = (fecha) => {
    const fechaActual = new Date(fecha);
    const dia = fechaActual.getDate().toString().padStart(2, "0");
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
    const año = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;
    return fechaFormateada;
  };
  return (
    <>
      <section className={`content bg-zinc-100 ${activeDark ? "dark" : ""}`}>
        <NavbarSlider />
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <i className="fas fa-chevron-right"></i>
                <li>
                  <a href="#" className="actives">
                    Home
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="box-info">
            <li>
              <i className="fa-solid fa-users-viewfinder"></i>
              <span className="text">
                <h3>{visitas_actuales}</h3>
                <p>visitas</p>
              </span>
            </li>
            <li>
              <i className="fas fa-people-group"></i>
              <span className="text">
                <h3>{userCont}</h3>
                <p>Usuarios</p>
              </span>
            </li>
            <li>
              <i className="fa-solid fa-book-atlas"></i>
              <span className="text">
                <h3>{novelasInfo.length}</h3>
                <p>novelas</p>
              </span>
            </li>
          </div>

          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent chapters</h3>
                <i className="fas fa-search"></i>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Upload Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimosCapitulo.length > 0
                    ? ultimosCapitulo.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <p>{item.nombre}</p>
                          </td>
                          <td>{item?.createdAt}</td>
                          <td>
                            <span className="status complete">completo</span>
                          </td>
                        </tr>
                      ))
                    :null}
                </tbody>
              </table>
            </div>

            <div className="todo">
              <div className="head">
                <h3>Recent Volumenes</h3>
                <Link to="agregar-volumen">
                  <i className="fas fa-plus"></i>
                </Link>
              </div>

              <ul className="todo-list">
                {ultimosCards.length > 0
                  ? ultimosCards.map((item, i) => (
                      <li className="not-completed" key={i}>
                        <p
                          className={`${
                            activeDark ? "text-white" : "text-black"
                          }`}
                        >
                          {item.nombreClave} vol {item.volumen}
                        </p>
                        <i className="fas fa-ellipsis-vertical"></i>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Content_list;
