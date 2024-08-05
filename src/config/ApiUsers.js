import axios from "axios";

const ApiUsers = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL_PYTHON}/api/underword/2.0`,
});

export default ApiUsers;
