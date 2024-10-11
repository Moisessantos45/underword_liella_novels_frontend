import { create } from "zustand";
import ApiUsers from "../config/ApiUsers.js";
import { toastify } from "../utils/Utils.js";
import supabase from "../config/supabase.js";

const useDataSiteHome = create((set) => ({
  dataSite: {},
  isMaintenanceMode: "",
  setDataSite: (dataSite) => set({ dataSite }),
  setMaintenanceMode: (isMaintenanceMode) => set({ isMaintenanceMode }),
  fecthDataSite: async () => {
    try {
      let { data, error } = await supabase
        .from("InicioWebInfo")
        .select("*")
        .single();

      if (error) throw error;

      const dataSite = data;
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
