import axios from "axios";
import { toastify } from "../utils/Utils.js";

const errorHandle = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response && error.response.data && error.response.data.msg) {
      const msg = error.response.data.msg;
      toastify(msg, false);
      return;
    } else if (error.message) {
      toastify(error.message, false);
      return;
    }
    toastify("Something went wrong", false);
  }
};

export { errorHandle };
