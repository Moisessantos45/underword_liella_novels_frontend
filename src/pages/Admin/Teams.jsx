import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { SelectPicker } from "rsuite";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading";
import NavbarSlider from "@/components/NavbarSlider";
import useAdmin from "@/hooks/useAdmin";
import { Link } from "react-router-dom";
import ModalConfirm from "@/components/ModalConfirm";
import { errorHandle } from "@/Services/errorHandle";
import { toastify } from "@/utils/Utils";
import supabase from "@/config/supabase";
import useInteractionStore from "@/Store/InteractionStore";

const data = ["user", "administrador", "colaborador"].map((item) => ({
  label: item,
  value: item,
}));

const Teams = () => {
  const { userAuth, cargando, setCargando } = useAuth();
  const { activeDark, obtenerDatosUser, users, setUsers } = useAdmin();
  const { isDrawerOpen, confirmDialog, setIsDrawerOpen, setConfirmDialog } =
    useInteractionStore();

  const [id, setId] = useState(null);

  const isConfirmDialog = useRef(false);

  useEffect(() => {
    const data_users = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*");
        if (error) throw error;
        setUsers(data);
      } catch (error) {
        errorHandle(error);
      }
      setCargando(false);
    };
    data_users();
  }, []);

  const changeDataUser = async (id, acceso, status = null, role = null) => {
    try {
      const query = {};
      const findUser = users.find((item) => item.id == id);

      if (acceso !== findUser.acceso) {
        query.acceso = acceso;
      }

      if (status && status !== findUser.status) {
        query.status = status;
      }

      if (role && role !== findUser.role) {
        query.role = role;
      }

      const { _, error } = await supabase
        .from("profiles")
        .update({ ...query })
        .eq("id", id)
        .select();

      if (error) throw error;

      const datosActualizados = users.map((item) =>
        item.id == id ? { ...item, ...query } : item
      );

      toastify(acceso ? "Activado" : "Desactivado", true);
      setUsers(datosActualizados);
    } catch (error) {
      toastify("Error al actualizar", false);
    }
    setConfirmDialog(false);
  };

  useEffect(() => {
    isConfirmDialog.current = isDrawerOpen;
    if (isConfirmDialog.current && userAuth.role === "administrador") {
      changeDataUser(id, false, true);
      setId(null);
      setConfirmDialog(false);
    }
  }, [confirmDialog]);

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
              <h2
                className={`font-semibold ${
                  activeDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                User Accounts
              </h2>
              <span
                className={`text-xs ${
                  activeDark ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Colaboradores registrados
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="ml-10 space-x-8 lg:ml-40">
                <Link
                  to={`/dashboard/${userAuth.id}/agregar-user`}
                  className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring hover:bg-green-700"
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
                  <tr className="bg-green-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    {/* <th className="px-5 py-3">ID</th> */}
                    <th className="px-5 py-3">Full Name</th>
                    <th className="px-5 py-3">User Role</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Firstsession</th>
                    <th className="px-5 py-3">Options</th>
                  </tr>
                </thead>
                <tbody
                  className={`text-${activeDark ? "gray-400" : "gray-700"}`}
                >
                  {users.length > 0 &&
                    users.map((item) => (
                      <tr key={item.id}>
                        <td
                          className={`border-b border-${
                            activeDark ? "gray-700" : "gray-200"
                          } bg-${
                            activeDark ? "gray-800" : "white"
                          } px-5 py-5 text-sm`}
                        >
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-full w-full rounded-full"
                                src={item.avatar_url}
                                alt="Imagen de perfil"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="whitespace-no-wrap">
                                {item.full_name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td
                          className={`border-b border-${
                            activeDark ? "gray-700" : "gray-200"
                          } bg-${
                            activeDark ? "gray-800" : "white"
                          } px-5 py-5 text-sm`}
                        >
                          {userAuth.role === "administrador" ? (
                            <SelectPicker
                              label="User"
                              data={data}
                              value={item.role}
                              style={{ width: 224 }}
                              onChange={(e) =>
                                changeDataUser(item.id, null, null, e)
                              }
                            />
                          ) : (
                            <p className="whitespace-no-wrap">{item.role}</p>
                          )}
                        </td>
                        <td
                          className={`border-b border-${
                            activeDark ? "gray-700" : "gray-200"
                          } bg-${
                            activeDark ? "gray-800" : "white"
                          } px-5 py-5 text-sm`}
                        >
                          <span
                            className={`rounded-full cursor-pointer ${
                              item.acceso ? "bg-green-200" : "bg-yellow-200"
                            } px-3 py-1 text-xs font-semibold text-green-900`}
                            onClick={() => {
                              setIsDrawerOpen(true);
                              if (confirmDialog) {
                                changeDataUser(item.id, !item.status);
                              }
                            }}
                          >
                            {item.acceso ? "Active" : "Suspended"}
                          </span>
                        </td>
                        <td
                          className={`border-b border-${
                            activeDark ? "gray-700" : "gray-200"
                          } bg-${
                            activeDark ? "gray-800" : "white"
                          } px-5 py-5 text-sm`}
                        >
                          <span
                            className={`rounded-full cursor-pointer ${
                              item.firstsession
                                ? "bg-green-200"
                                : "bg-yellow-200"
                            } px-3 py-1 text-xs font-semibold text-green-900`}
                          >
                            {item.firstsession ? "Yes" : "No"}
                          </span>
                        </td>
                        <td
                          className={`border-b border-${
                            activeDark ? "gray-700" : "gray-200"
                          } flex justify-center flex-wrap bg-${
                            activeDark ? "gray-800" : "white"
                          } px-0 py-6 text-sm`}
                        >
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
                              setIsDrawerOpen(true);
                              setId(item.id);
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
            <div
              className={`flex flex-col items-center border-t bg-${
                activeDark ? "gray-800" : "white"
              } px-5 py-5 sm:flex-row sm:justify-between`}
            >
              <span className="text-xs text-gray-600 sm:text-sm">
                Showing 1 to 5 of 12 Entries
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
      {isDrawerOpen && <ModalConfirm />}
    </>
  );
};

export default Teams;
