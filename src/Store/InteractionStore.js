import { create } from "zustand";

const useInteractionStore = create((set) => ({
  isDrawerOpen: false,
  isVisibleModal: false,
  confirmDialog: false,
  setIsDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
  setIsVisibleModal: (isVisibleModal) => set({ isVisibleModal }),
  setConfirmDialog: (confirmDialog) => set({ confirmDialog }),
}));

export default useInteractionStore;
