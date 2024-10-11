import { create } from "zustand";
import {
  addDoc,
  doc,
  collection,
  updateDoc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore/lite";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { getCurrentDateWithTime, toastify } from "../utils/Utils";
import { dbFirebaseLite } from "../config/firebase";

const useChaptersStore = create((set, get) => ({
  chapters: [],
  isChanging: false,
  itemChapter: {},
  setItemChapter: (itemChapter) => set({ itemChapter }),
  setIsChanging: (isChanging) => set({ isChanging }),
  setChapters: (chapters) => set({ chapters }),
  uploadFile: async (chapter) => {
    try {
      const file = new Blob([chapter.contenido], { type: "text/plain" });

      const storage = getStorage();
      const storageRef = ref(
        storage,
        `chapters/${chapter.idNovel}/${chapter.titulo}_${chapter.capitulo}.txt`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      const snapshot = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            toastify("Error al agregar el capitulo", false);
            reject(error); // Rechazar la promesa en caso de error
          },
          () => {
            resolve(uploadTask.snapshot); // Resolver la promesa cuando la subida termine
          }
        );
      });

      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      toastify("Error al subir el archivo", false);
      throw new Error(error);
    }
  },
  addChapter: async (chapter) => {
    try {
      const findChapter = get().chapters.find(
        (c) =>
          c.idNovel === chapter.idNovel &&
          c.titulo === chapter.titulo &&
          c.capitulo === chapter.capitulo
      );

      if (findChapter?.idNovel) {
        toastify("El capitulo ya existe", false);
        return;
      }

      const downloadURL = await get().uploadFile(chapter);

      const newChapter = {
        ...chapter,
        createdAt: getCurrentDateWithTime(),
        contenido: downloadURL,
      };

      const docRef = await addDoc(
        collection(dbFirebaseLite, "Capitulos"),
        newChapter
      );
      const docRefId = docRef.id;

      const extendedChapter = { ...newChapter, id: docRefId };
      await setDoc(
        doc(dbFirebaseLite, "Capitulos", docRefId),
        extendedChapter,
        {
          merge: true,
        }
      );

      set((state) => ({ chapters: [...state.chapters, chapter] }));
      toastify("Capitulo agregado", true);
    } catch (error) {
      toastify("Error al agregar el capitulo", false);
    }
  },
  updateChapter: async (chapter) => {
    try {
      const findChapter = get().chapters.find(
        (c) =>
          c.idNovel === chapter.idNovel &&
          c.titulo === chapter.titulo &&
          c.capitulo === chapter.capitulo
      );

      if (!findChapter?.idNovel) {
        toastify("El capitulo no existe", false);
        return;
      }

      const chapterUpdated = Object.keys(chapter).reduce((acc, key) => {
        if (chapter[key] !== findChapter[key]) {
          acc[key] = chapter[key];
        }
        return acc;
      }, {});

      if (get().isChanging && !chapter.contenido.includes("firebasestorage")) {
        const url = await get().uploadFile(chapter);
        chapterUpdated.contenido = url;
      }

      const docRef = doc(dbFirebaseLite, "Capitulos", chapter.id);
      await updateDoc(docRef, chapterUpdated);

      set((state) => ({
        chapters: state.chapters.map((c) =>
          c.id === chapter.id ? { ...chapter, ...chapterUpdated } : c
        ),
      }));
      toastify("Capitulo actualizado", true);
    } catch (error) {
      toastify("Error al actualizar el capitulo", false);
    }
  },
  removeChapter: async (id) => {
    try {
      const docDb = doc(dbFirebaseLite, "Capitulos", id);
      const snapshot = await getDoc(docDb);
      if (!snapshot.exists()) {
        toastify("El capitulo no existe", false);
        return;
      }

      const data = snapshot.data();
      const storage = getStorage();
      const storageRef = ref(storage, data.contenido);

      await Promise.all([
        deleteObject(storageRef),
        deleteDoc(doc(dbFirebaseLite, "Capitulos", id)),
      ]);

      set((state) => ({
        chapters: state.chapters.filter((c) => c.id !== id),
      }));

      toastify("Capitulo eliminado", true);
    } catch (error) {
      toastify("Error al eliminar el capitulo", false);
    }
  },
}));

export default useChaptersStore;
