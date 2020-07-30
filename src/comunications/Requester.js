import axios from "axios";

const ping = async (url) => {
  const response = await axios.get(`${url}/ping`, { handlerEnabled: false });
  return response;
};

// eslint-disable-next-line no-unused-vars
const totalReacciones = async (url) => {
  const response = await axios.get(`${url}/stats/historico`);
  return response.data.total_reacciones;
};

// eslint-disable-next-line no-unused-vars
const totalComentarios = async (url) => {
  const response = await axios.get(`${url}/stats/historico`);
  return response.data.total_comentarios;
};

const obtenerEstadisticas = async (url, fechaInicio, fechaFinal) => {
  const response = await axios.get(`${url}/stats`, {
    params: { inicio: fechaInicio, fin: fechaFinal },
  });
  console.log(response.data);
  return response.data;
};

export { ping, totalReacciones, totalComentarios, obtenerEstadisticas };
