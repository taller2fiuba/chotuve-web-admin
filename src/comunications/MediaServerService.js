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
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1693);
    }, 1000);
  });
};

const obtenerEstadisticas = async (fechaInicio, fechaFinal) => {
  return new Promise((resolve) => {
    console.log(fechaInicio, fechaFinal);
    setTimeout(() => {
      resolve({
        "2020-07-01": 1,
        "2020-07-02": 3,
        "2020-07-03": 2,
        "2020-07-04": 1,
        "2020-07-05": 2,
        "2020-07-06": 3,
        "2020-07-07": 4,
        "2020-07-08": 1,
        "2020-07-09": 2,
        "2020-07-10": 2,
        "2020-07-11": 0,
        "2020-07-12": 3,
        "2020-07-13": 1,
        "2020-07-14": 3,
        "2020-07-15": 2,
        "2020-07-16": 1,
        "2020-07-17": 2,
        "2020-07-18": 3,
        "2020-07-19": 4,
        "2020-07-20": 1,
        "2020-07-21": 2,
        "2020-07-22": 2,
        "2020-07-23": 0,
        "2020-07-24": 1,
        "2020-07-25": 3,
        "2020-07-26": 2,
        "2020-07-27": 1,
        "2020-07-28": 2,
        "2020-07-29": 3,
        "2020-07-30": 4,
      });
    }, 1000);
  });
};

export {
  obtenerVideos,
  obtenerVideo,
  cambiarEstado,
  editarVideo,
  totalVideos,
  obtenerEstadisticas,
};
