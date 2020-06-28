/* eslint-disable no-undef */
import axios from "axios";

const addInterceptor = () => {
  // eslint-disable-next-line no-use-before-define
  axios.interceptors.request.use((request) => requestHandler(request));

  const isHandlerEnabled = (config = {}) => {
    // eslint-disable-next-line no-prototype-builtins
    return !config.hasOwnProperty("handlerEnabled") || config.handlerEnabled;
  };

  // Manejador de Request
  const requestHandler = async (request) => {
    console.log("LOADING_ON");
    const token = localStorage.getItem("token");
    if (isHandlerEnabled(request) && token) {
      // request.headers['Auth'] = "Bearer " + token
      console.log("Request interceptada");
    } else {
      console.log("La Request no ha sido interceptada");
    }

    return request;
  };
};

export default addInterceptor;
