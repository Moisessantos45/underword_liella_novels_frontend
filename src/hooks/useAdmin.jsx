import { useContext } from "react";
import AdminContext from "../context/AdminProvide";

const useAdmin = () => {
  return useContext(AdminContext)
}

export default useAdmin