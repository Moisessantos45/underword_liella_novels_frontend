import { create } from "zustand";
import urlAxios from "../config/urlAxios.js";

const useDataSiteHome = create((set) => ({
  dataSite: {},
  setDataSite: (dataSite) => set((state) => ({ dataSite })),
  fecthDataSite: async () => {
    try {
      const res = await urlAxios.get(
        "/admin/configuracion-sitio"
      );
      const dataSite = res.data;
      set({ dataSite });
      return dataSite
    } catch (error) {
      return;
    }
  },
}));

export { useDataSiteHome };
