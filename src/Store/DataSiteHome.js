import { create } from "zustand";
import urlAxios from "../config/urlAxios";

const useDataSiteHome = create((set, get) => ({
  dataSite: {},
  setDataSite: (dataSite) => set((state) => ({ dataSite })),
  fecthDataSite: async () => {
    try {
      const res = await urlAxios.get(
        "/underwordliellanovels/configuracion-sitio"
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
