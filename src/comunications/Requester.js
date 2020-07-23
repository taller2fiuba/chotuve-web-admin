import axios from "axios";

const ping = async (url) => {
  const response = await axios.get(`${url}/ping`, { handlerEnabled: false });
  return response;
};

// eslint-disable-next-line no-unused-vars
const totalReacciones = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3265);
    }, 1000);
  });
};

// eslint-disable-next-line no-unused-vars
const totalComentarios = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2832);
    }, 1000);
  });
};

export { ping, totalReacciones, totalComentarios };
