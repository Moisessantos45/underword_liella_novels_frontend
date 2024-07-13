import { create } from "zustand";
import urlAxios from "../config/urlAxios.js";
import { toastify } from "../utils/Utils.js";

const useDataSiteHome = create((set) => ({
  dataSite: {},
  isMaintenanceMode: "",
  setDataSite: (dataSite) => set({ dataSite }),
  setMaintenanceMode: (isMaintenanceMode) => set({ isMaintenanceMode }),
  fecthDataSite: async () => {
    try {
      const res = await urlAxios.get("/admin/configuracion-sitio");
      const dataSite = res.data;
      set({ dataSite });
      set({ isMaintenanceMode: JSON.stringify(dataSite.isMaintenanceMode)});
      return dataSite;
    } catch (error) {
      return;
    }
  },
  changeStatusSite: async (status) => {
    try {
      await urlAxios.patch(`/admin/configuracion-sitio?status=${status}`);
      toastify("Se cambio el estado del sitio", true);
      set({ isMaintenanceMode: status });
    } catch (error) {
      console.log(error);
      return;
    }
  },
}));

export { useDataSiteHome };
