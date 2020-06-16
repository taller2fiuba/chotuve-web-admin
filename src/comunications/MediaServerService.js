import axios from "axios";

const MEDIA_SERVER_API = "http://localhost:27080";
// const MEDIA_SERVER_API = "https://chotuve-media-server-g4.herokuapp.com";

const obtenerVideos = async () => {
  const response = await axios.get(`${MEDIA_SERVER_API}/video`);
  return response.data;
};

// eslint-disable-next-line import/prefer-default-export
export { obtenerVideos };
