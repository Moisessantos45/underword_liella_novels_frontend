import { create } from "zustand";
import {
  addDoc,
  doc,
  collection,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import { getCurrentDateWithTime, toastify } from "../utils/Utils";
import { dbFirebaseLite } from "../config/firebase";

const useVolumensStore = create((set, get) => ({
  volumens: [],
  itemVolumen: {},
  setItemVolumen: (itemVolumen) => set({ itemVolumen }),
  setVolumens: (volumens) => set({ volumens }),
  addVolumen: async (volumen) => {
    try {
      const findVolumen = get().volumens.find(
        (v) => v.idNovel === volumen.idNovel && v.volumen === volumen.volumen
      );

      if (findVolumen.idNovel) {
        toastify("El volumen ya existe", false);
        return;
      }

      const newVolume = { ...volumen, createdAt: getCurrentDateWithTime() };
      const docRef = await addDoc(
        collection(dbFirebaseLite, "Volumenes"),
        newVolume
      );

      const docRefId = docRef.id;
      const extendedVolume = { ...volumen, id: docRefId };

      await setDoc(doc(dbFirebaseLite, "Volumenes", docRefId), extendedVolume, {
        merge: true,
      });

      set((state) => ({ volumens: [...state.volumens, extendedVolume] }));

      toastify("Volumen agregado", true);
    } catch (error) {
      toastify("Error al agregar el volumen", false);
    }
  },
  updateVolumen: async (volumen) => {
    try {
      const findVolumen = get().volumens.find(
        (v) => v.idNovel === volumen.idNovel && v.volumen === volumen.volumen
      );

      if (!findVolumen?.idNovel) {
        toastify("El volumen ya existe", false);
        return;
      }

      const volumenUpdated = Object.keys(volumen).reduce((acc, key) => {
        if (volumen[key] !== findVolumen[key]) {
          acc[key] = volumen[key];
        }
        return acc;
      }, {});

      await updateDoc(
        doc(dbFirebaseLite, "Volumenes", volumen.id),
        volumenUpdated
      );

      set((state) => ({
        volumens: state.volumens.map((v) =>
          v.id === volumen.id ? volumen : v
        ),
      }));

      toastify("Volumen actualizado", true);
    } catch (error) {
      toastify("Error al actualizar el volumen", false);
    }
  },
  removeVolumen: async (id) => {
    try {
      await deleteDoc(doc(dbFirebaseLite, "Volumenes", id));

      set((state) => ({
        volumens: state.volumens.filter((v) => v.id !== id),
      }));

      toastify("Volumen eliminado", true);
    } catch (error) {
      toastify("Error al eliminar el volumen", false);
    }
  },
}));

export default useVolumensStore;
