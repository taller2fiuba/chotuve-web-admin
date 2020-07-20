/* eslint-disable no-undef */
import axios from "axios";
import { Service } from "axios-middleware";

const service = new Service(axios);

const addInterceptor = () => {
  const isHandlerEnabled = (config = {}) => {
    // eslint-disable-next-line no-prototype-builtins
    return !config.hasOwnProperty("handlerEnabled") || config.handlerEnabled;
  };

  // Manejador de Request
  service.register({
    onRequest(config) {
      const token = localStorage.getItem("token");
      if (isHandlerEnabled(config) && token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  });
};

export default addInterceptor;
