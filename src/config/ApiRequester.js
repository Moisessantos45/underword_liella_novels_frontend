import urlAxios from "./urlAxios.js";

const ApiRequester = async (method, url, content) => {
  try {
    const { data } = await urlAxios[method](url, content);
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

export default ApiRequester;
