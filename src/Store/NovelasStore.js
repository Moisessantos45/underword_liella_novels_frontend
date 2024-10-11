import { create } from "zustand";
import { getCurrentDateWithTime, toastify } from "../utils/Utils";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import {
  doc as docFirestore,
  collection as collectionFirestore,
  runTransaction,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { dbFirebaseLite } from "../config/firebase";
import dbFirebase from "../config/firebase";

const useNovelasStore = create((set, get) => ({
  novelas: [],
  listNovelas: [],
  ItemNovela: {},
  setItemNovela: (ItemNovela) => set({ ItemNovela }),
  addListNovels: () => {
    const novelas = get().novelas;
    const tranform = novelas.map((novela) => ({
      id: novela.id,
      titulo: novela.titulo,
    }));
    set({ listNovelas: tranform });
  },
  setNovelas: (novelas) => set({ novelas }),
  addNovela: async (novela) => {
    try {
      const findNovela = get().novelas.find(
        (n) => n.titulo.toLowerCase() === novela.titulo.toLowerCase()
      );
      if (findNovela?.titulo) {
        toastify("La novela ya existe", false);
        return;
      }
      const newNovela = { ...novela, createdAt: getCurrentDateWithTime() };
      const docRef = await addDoc(
        collection(dbFirebaseLite, "Novelas"),
        newNovela
      );
      const docRefId = docRef.id;
      const extendedNovela = { ...novela, id: docRefId };

      await setDoc(doc(dbFirebaseLite, "Novelas", docRefId), extendedNovela, {
        merge: true,
      });

      set((state) => ({ novelas: [...state.novelas, extendedNovela] }));
      toastify("Novela agregada", true);
    } catch (error) {
      toastify("Error al agregar la novela", false);
    }
  },
  updateNovela: async (novela) => {
    try {
      const findNovela = get().novelas.find(
        (n) => n.titulo.toLowerCase() === novela.titulo.toLowerCase()
      );
      if (!findNovela?.titulo) {
        toastify("La novela no existe", false);
        return;
      }

      const updatedNovela = Object.keys(novela).reduce((acc, key) => {
        if (novela[key] !== findNovela[key]) {
          acc[key] = novela[key];
        }
        return acc;
      }, {});

      await runTransaction(dbFirebase, async (transaction) => {
        const docRef = doc(dbFirebase, "Novelas", novela.id);
        const novelaDoc = await transaction.get(docRef);

        if (!novelaDoc.exists()) {
          throw "La novela no existe";
        }

        // Actualiza la novela
        transaction.update(docRef, updatedNovela);

        if (!updatedNovela?.titulo) return;
        const newName = updatedNovela.titulo
          .split(" ")
          .slice(0, 4)
          .join(" ")
          .toLowerCase();

        // Actualiza los volúmenes y capítulos
        const qVol = query(
          collectionFirestore(dbFirebase, "Volumenes"),
          where("idNovel", "==", novela.id)
        );
        const qChapter = query(
          collectionFirestore(dbFirebase, "Capitulos"),
          where("idNovel", "==", novela.id)
        );

        const [querySnapshot, querySnapshotChapters] = await Promise.all([
          getDocs(qVol),
          getDocs(qChapter),
        ]);

        // Actualiza los volúmenes
        querySnapshot.forEach((doc) => {
          const docRef = docFirestore(dbFirebase, "Volumenes", doc.id);
          transaction.update(docRef, {
            clave: updatedNovela.clave,
            nombreClave: newName,
          });
        });

        // Actualiza los capítulos
        querySnapshotChapters.forEach((doc) => {
          const docRef = docFirestore(dbFirebase, "Capitulos", doc.id);
          transaction.update(docRef, {
            clave: updatedNovela.clave,
            nombre: newName,
          });
        });

        set((state) => ({
          novelas: state.novelas.map((n) => (n.id === novela.id ? novela : n)),
        }));
      });

      toastify("Novela actualizada", true);
    } catch (error) {
      toastify("Error al actualizar la novela", false);
    }
  },
  changeStatus: async (id, status) => {
    try {
      const docRef = doc(dbFirebaseLite, "Novelas", id);

      await updateDoc(docRef, {
        estado: !status,
      });
    } catch (error) {
      toastify("Error al cambiar el estado de la novela", false);
    }
  },
  removeNovela: (id) => {
    try {
      runTransaction(dbFirebase, async (transaction) => {
        const docRef = doc(dbFirebase, "Novelas", id);
        const novelaDoc = await transaction.get(docRef);

        if (!novelaDoc.exists()) {
          throw "La novela no existe";
        }

        // Elimina la novela
        transaction.delete(docRef);

        // Elimina los volúmenes
        const qVol = query(
          collectionFirestore(dbFirebase, "Volumenes"),
          where("idNovel", "==", id)
        );
        const querySnapshot = await getDocs(qVol);

        querySnapshot.forEach((doc) => {
          const docRef = docFirestore(dbFirebase, "Volumenes", doc.id);
          transaction.delete(docRef);
        });

        // Elimina los capítulos
        const qChapter = query(
          collectionFirestore(dbFirebase, "Capitulos"),
          where("idNovel", "==", id)
        );
        const querySnapshotChapters = await getDocs(qChapter);

        querySnapshotChapters.forEach((doc) => {
          const docRef = docFirestore(dbFirebase, "Capitulos", doc.id);
          transaction.delete(docRef);
        });

        set((state) => ({
          novelas: state.novelas.filter((n) => n.id !== id),
        }));
      });
      toastify("Novela eliminada", true);
    } catch (error) {
      toastify("Error al eliminar la novela", false);
    }
  },
}));

export default useNovelasStore;
