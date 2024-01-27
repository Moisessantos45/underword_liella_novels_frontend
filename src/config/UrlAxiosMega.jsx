import axios from "axios";

const UrlAxiosMega =axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL_MEGA}/api/mega`
})

export default UrlAxiosMega