import axios from "axios";

const UrlAxiosMega =axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL_MEGA}/api/underword/2.0`
})

export default UrlAxiosMega