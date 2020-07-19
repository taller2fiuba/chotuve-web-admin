import axios from "axios";

const ping = async (url) => {
  const response = await axios.get(`${url}/ping`, { handlerEnabled: false });
  return response;
};

export default { ping };
