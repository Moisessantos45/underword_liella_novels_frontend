import { create } from "zustand";
import ApiUsers from "../config/ApiUsers.js";
import { toastify } from "../utils/Utils.js";

const useDataSiteHome = create((set) => ({
  dataSite: {},
  isMaintenanceMode: "",
  setDataSite: (dataSite) => set({ dataSite }),
  setMaintenanceMode: (isMaintenanceMode) => set({ isMaintenanceMode }),
  fecthDataSite: async () => {
    try {
      const res = await ApiUsers.get("/site/configuracion-sitio");
      const dataSite = res.data.data;
      set({ dataSite });
      set({ isMaintenanceMode: JSON.stringify(dataSite.isMaintenanceMode) });
      return dataSite;
    } catch (error) {
      return;
    }
  },
  changeStatusSite: async (status) => {
    try {
      await ApiUsers.patch(`/site/configuracion-sitio?status=${status}`);
      toastify("Se cambio el estado del sitio", true);
      set({ isMaintenanceMode: status });
    } catch (error) {
      return;
    }
  },
}));

export { useDataSiteHome };
