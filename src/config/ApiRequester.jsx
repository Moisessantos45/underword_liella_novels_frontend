import urlAxios from "./urlAxios";

const ApiRequester = async (method, url, content) => {

  try {
    const { data } = await urlAxios[method](url, content);
    return data;
  } catch (error) {
    return error;
  }
};

export default ApiRequester;
