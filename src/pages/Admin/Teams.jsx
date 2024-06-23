import React from "react";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import urlAxios from "@/config/urlAxios.js";
import NavbarSlider from "@/components/NavbarSlider";
import useAdmin from "@/hooks/useAdmin";
import { Link } from "react-router-dom";
import ModalConfirm from "@/components/ModalConfirm";
import { errorHandle } from "@/Services/errorHandle";
import { obtenerConfig, toastify } from "@/utils/Utils";

const Teams = () => {
  const { userAuth, cargando, setCargando } = useAuth();
  const {
    activeDark,
    obtenerDatosUser,
    users,
    setUsers,
    eliminarDatos,
    confirmar_delate,
    mostrar_modal,
    setMostrar_modal,
  } = useAdmin();
  const type = "user";
  useEffect(() => {
    const data_users = async () => {
      const token = localStorage.getItem("token");
      // setCargando(true)
      if (!token) {
        setCargando(false);
        return;
      }
      const confi = obtenerConfig();
      
      try {
        const { data } = await urlAxios(
          `/admin/panel-administracion/colaboradores`,
          confi
        );
        // console.log(data);
        setUsers(data);
      } catch (error) {
        errorHandle(error);
      }
      setCargando(false);
    };
    data_users();
  }, []);

  const descativarUser = async (id, active) => {
    try {
      const { data } = await urlAxios.put(`/admin/desctivar-user`, {
        id,
        active,
      });
      const datosActualizados = users.map((item) =>
        item.id == data.id ? data : item
      );
      toastify(`Colaborador ${data.acceso}`, true);
      setUsers(datosActualizados);
    } catch (error) {
      toastify(error.response.data.msg, false);
    }
  };

  if (cargando) return <Loading />;
  return (
    <>
      <section
        className={`content bg-zinc-100 text-black ${activeDark ? "dark" : ""}`}
      >
        <NavbarSlider />
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">User Accounts</h2>
              <span className="text-xs text-gray-500">
                Colaboradores registrados
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="ml-10 space-x-8 lg:ml-40">
                <Link
                  to={`/dashboard/${userAuth.id}/agregar-user`}
                  className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4 rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                    />
                  </svg>
                  Registrar
                </Link>
              </div>
            </div>
          </div>
          <div className="overflow-y-hidden rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Full Name</th>
                    <th className="px-5 py-3">User Role</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Opcions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500">
                  {users.length > 0 &&
                    users.map((item) => (
                      <tr key={item.id}>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">{item.id}</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-full w-full rounded-full"
                                src={item.foto_perfil}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="whitespace-no-wrap">
                                {item.name_user}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                          <p className="whitespace-no-wrap">{item.tipo}</p>
                        </td>
                        <td className="border-b  border-gray-200 bg-white px-5 py-5 text-sm">
                          <span
                            className={`rounded-full cursor-pointer ${
                              item.acceso ? "bg-green-200" : "bg-yellow-200 "
                            }  px-3 py-1 text-xs font-semibold text-green-900`}
                            onClick={() => {
                              setMostrar_modal(true);
                              if (confirmar_delate) {
                                descativarUser(item.id, !item.acceso);
                              }
                            }}
                          >
                            {item.acceso ? "Active" : "Suspended"}
                          </span>
                        </td>
                        <td className="border-b border-gray-200 flex justify-center flex-wrap bg-white px-0 py-6 text-sm">
                          <Link
                            className="m-1 whitespace-no-wrap flex justify-center items-center text-white w-20 h-6 bg-blue-600 rounded-md"
                            to={`/dashboard/${userAuth.id}/agregar-user`}
                            onClick={() => obtenerDatosUser(item)}
                          >
                            Editar
                          </Link>
                          <button
                            className="m-1 whitespace-no-wrap flex justify-center items-center text-white w-20 h-6 bg-rose-700 rounded-md"
                            onClick={() => {
                              if (userAuth.tipo === "administrador") {
                                setMostrar_modal(true);
                                if (confirmar_delate) {
                                  eliminarDatos(item.id, type);
                                }
                              }
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  <tr></tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
              <span className="text-xs text-gray-600 sm:text-sm">
                {" "}
                Showing 1 to 5 of 12 Entries{" "}
              </span>
              <div className="mt-2 inline-flex sm:mt-0">
                <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                  Prev
                </button>
                <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {mostrar_modal && <ModalConfirm />}
    </>
  );
};

export default Teams;
