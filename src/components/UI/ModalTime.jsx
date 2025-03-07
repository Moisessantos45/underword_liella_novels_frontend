import { useEffect } from "react";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toastify } from "@/utils/Utils";
import supabase from "@/config/supabase";

const ModalConfirm = () => {
  const { setModalTime } = useAdmin();
  const { setCount, setAuth } = useAuth();
  const navigate = useNavigate();

  const handelConfirmar = async (sesion) => {
    setCount(0);
    try {
      if (sesion) {
        localStorage.setItem("horaInicio", Date.now().toString());
        setModalTime(false);
        return;
      }

      await supabase.auth.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("horaInicio");
      setAuth({});
      setModalTime(false);
      navigate("/login-admin");
    } catch (error) {
      toastify("Error al cerrar sesión", false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalTime(false);
      handelConfirmar(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [setModalTime]);
  return (
    <>
      <section className=" flex justify-center items-center top-0 left-0 modal_confirm">
        <div className="p-4 w-full max-w-md max-h-full m-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 m-auto">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setModalTime(false), handelConfirmar(true);
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Deseas seguir en la sesión?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                onClick={() => {
                  setModalTime(false), handelConfirmar(true);
                }}
              >
                Yes
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  setModalTime(false), handelConfirmar(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalConfirm;
