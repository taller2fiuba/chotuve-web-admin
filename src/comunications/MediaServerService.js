import axios from "axios";

const MEDIA_SERVER_API = "http://localhost:27080";
// const MEDIA_SERVER_API = "https://chotuve-media-server-g4.herokuapp.com";
const CANTIDAD = 10000;

const obtenerVideos = async () => {
  const response = await axios.get(`${MEDIA_SERVER_API}/video`, {
    params: { cantidad: CANTIDAD },
  });
  return response.data;
};

const obtenerVideo = async (videoId) => {
  const response = await axios.get(`${MEDIA_SERVER_API}/video/${videoId}`, {
    params: { cantidad: CANTIDAD },
  });
  return response.data;
  // return {
  //   _id: videoId,
  //   titulo: "Video 1",
  //   descripcion: "Un video hardcoded",
  //   ubicacion: "En mi casa",
  //   duracion: 600,
  //   visibilidad: "privado",
  //   habilitado: true,
  // };
};

const cambiarEstado = async (videoId, nuevoEstado) => {
  const data = { habilitado: nuevoEstado };
  await axios.put(`${MEDIA_SERVER_API}/video/${videoId}`, data);
  // console.log(videoId, data);
};

const editarVideo = async (videoId, video) => {
  await axios.put(`${MEDIA_SERVER_API}/video/${videoId}`, video);
  // console.log(videoId, video);
};

export { obtenerVideos, obtenerVideo, cambiarEstado, editarVideo };
