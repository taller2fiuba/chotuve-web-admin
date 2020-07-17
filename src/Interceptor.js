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
    const token = localStorage.getItem("token");
    if (isHandlerEnabled(request) && token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  };
};

export default addInterceptor;
