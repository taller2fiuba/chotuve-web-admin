import axios from "axios";

const MEDIA_SERVER_API = "http://localhost:27080";
// const MEDIA_SERVER_API = "https://chotuve-media-server-g4.herokuapp.com";

const obtenerVideos = async () => {
  const response = await axios.get(`${MEDIA_SERVER_API}/video`);
  return response.data;
};

const cambiarEstado = (videoId, nuevoEstado) => {
  const data = { habilitado: nuevoEstado };
  // axios.put(`${MEDIA_SERVER_API}/video/${videoId}`, data);
  console.log(videoId, data);
};

export { obtenerVideos, cambiarEstado };
