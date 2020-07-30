import axios from "axios";
import { MEDIA_SERVER_API } from "../utils/constant";

const CANTIDAD = 10000;

const obtenerVideos = async () => {
  const response = await axios.get(`${MEDIA_SERVER_API}/video`, {
    params: { cantidad: CANTIDAD, solo_habilitados: false },
  });
  return response.data;
};

const obtenerVideo = async (videoId) => {
  const response = await axios.get(`${MEDIA_SERVER_API}/video/${videoId}`);
  return response.data;
};

const cambiarEstado = async (videoId, nuevoEstado) => {
  const data = { habilitado: nuevoEstado ? "true" : "false" };
  const response = await axios.put(
    `${MEDIA_SERVER_API}/video/${videoId}`,
    data
  );
  return response.data;
};

const editarVideo = async (videoId, video) => {
  const response = await axios.put(
    `${MEDIA_SERVER_API}/video/${videoId}`,
    video
  );
  return response.data;
};

const totalVideos = async () => {
  const response = await axios.get(`${MEDIA_SERVER_API}/stats/historico`);
  return response.data.total_videos;
};

const obtenerEstadisticas = async (fechaInicio, fechaFinal) => {
  const response = await axios.get(`${MEDIA_SERVER_API}/stats`, {
    params: { inicio: fechaInicio, fin: fechaFinal },
  });
  return response.data;
};

export {
  obtenerVideos,
  obtenerVideo,
  cambiarEstado,
  editarVideo,
  totalVideos,
  obtenerEstadisticas,
};
