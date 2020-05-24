import axios from "axios";

const getPing = (url, callback) => {
  axios
    .get(`${url}/ping`)
    .then((response) => callback({ ping: response.status }))
    .catch((error) => {
      console.log(error);
      callback({ ping: error.status });
    });
};

export default { getPing };
