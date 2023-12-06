import axios from "axios";

const urlAxios = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api/underword`
})

export default urlAxios