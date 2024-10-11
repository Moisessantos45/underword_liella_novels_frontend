import { useState, useEffect, createContext } from "react";
import Loading from "../components/Loading";
import supabase from "../config/supabase.js";
import { collection, getDocs } from "firebase/firestore/lite";
import { dbFirebaseLite } from "../config/firebase.js";
import { convertirADate } from "../Services/useService.js";
import useVolumensStore from "../Store/VolumensStore.js";
import useNovelasStore from "../Store/NovelasStore.js";
import useChaptersStore from "../Store/ChaptersStore.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { setVolumens } = useVolumensStore();
  const { setNovelas,addListNovels } = useNovelasStore();
  const { setChapters } = useChaptersStore();

  const [userAuth, setAuth] = useState({});
  const [userCont, setCont] = useState(0);
  const [latestEpisode, setEndChapters] = useState([]);
  const [latestCards, setEndCards] = useState([]);
  const [numeroColecciones, setNumeroColecciones] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [userType, setUserType] = useState("");
  const [count, setCount] = useState(0);
  const [visit_count, setVisitas] = useState(0);
  const [dataActive, setDataActive] = useState(false);

  const sortDateCollection = (snapshot) => {
    const dataCollecction = snapshot.docs.map((doc) => doc.data());
    const filterDataLatest = dataCollecction
      .sort((a, b) => {
        return convertirADate(b.createdAt) - convertirADate(a.createdAt);
      })
      .slice(0, 8);
    return filterDataLatest;
  };

  const getCollection = async () => {
    try {
      const [coleccionRef, coleccionVolRef, coleccionCapRef] =
        await Promise.allSettled([
          getDocs(collection(dbFirebaseLite, "Novelas")),
          getDocs(collection(dbFirebaseLite, "Volumenes")),
          getDocs(collection(dbFirebaseLite, "Capitulos")),
        ]);

      if (coleccionRef.status === "fulfilled") {
        const snapshot = coleccionRef.value;
        const data = snapshot.docs.map((doc) => doc.data());
        setNovelas(data);
        addListNovels();
        setNumeroColecciones(snapshot.size);
      }
      if (coleccionVolRef.status === "fulfilled") {
        const snapshot = coleccionVolRef.value;
        const data = snapshot.docs.map((doc) => doc.data());
        setVolumens(data);
        const newSnapshot = sortDateCollection(snapshot);

        setEndCards(newSnapshot);
      }

      if (coleccionCapRef.status === "fulfilled") {
        const snapshot = coleccionCapRef.value;
        const data = snapshot.docs.map((doc) => doc.data());
        setChapters(data);
        const newSnapshot = sortDateCollection(snapshot);

        setEndChapters(newSnapshot);
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    const autenticar = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;

        const [resUser, resUserSize] = await Promise.all([
          supabase.from("profiles").select("*").eq("id", data.user.id).single(),
          supabase.from("profiles").select("id"),
          getCollection(),
        ]);

        setAuth({ ...resUser.data, email: data.user.email });
        setUserType(resUser.data.role);
        setCont(resUserSize.data.length);
        // setVisitas(dataSite.visistas_actuales);
      } catch (error) {
        setAuth({});
        localStorage.removeItem("token");
      }
      setCargando(false);
    };

    autenticar();
  }, [dataActive]);

  if (cargando) return <Loading />;
  return (
    <AuthContext.Provider
      value={{
        userAuth,
        setAuth,
        cargando,
        userType,
        userCont,
        latestEpisode,
        latestCards,
        numeroColecciones,
        count,
        setCount,
        setCargando,
        visit_count,
        setDataActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
