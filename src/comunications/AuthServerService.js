/* eslint-disable no-undef */
import axios from "axios";
import { AUTH_SERVER_API, TOKEN } from "../utils/constant";

const CANTIDAD_POR_DEFECTO = 100;

const obtenerUsuarios = async () => {
  const response = await axios.get(`${AUTH_SERVER_API}/usuario`, {
    params: { cantidad: CANTIDAD_POR_DEFECTO },
  });
  return response.data;
};

const obtenerUsuario = async (usuarioId) => {
  const response = await axios.get(`${AUTH_SERVER_API}/usuario/${usuarioId}`);
  return response.data;
};

const editarUsuario = async (usuarioId, usuario) => {
  await axios.put(`${AUTH_SERVER_API}/usuario/${usuarioId}`, usuario);
};

const cambiarEstadoUsuario = async (usuarioId, nuevoEstado) => {
  const data = { habilitado: nuevoEstado };
  await axios.put(`${AUTH_SERVER_API}/usuario/${usuarioId}`, data);
};

const obtenerAppServers = async () => {
  const response = await axios.get(`${AUTH_SERVER_API}/app-server`);
  return response.data;
};

const crearServer = async (server) => {
  const response = await axios.post(`${AUTH_SERVER_API}/app-server`, server);
  return response.data;
};

const eliminarServer = async (serverId) => {
  await axios.delete(`${AUTH_SERVER_API}/app-server/${serverId}`);
};

const login = async (usuario, clave) => {
  const response = await axios.post(
    `${AUTH_SERVER_API}/usuario/admin`,
    {
      email: usuario,
      password: clave,
    },
    { handlerEnabled: false }
  );
  localStorage.setItem(TOKEN, response.data.auth_token);

  return response;
};

const estaLogeado = () => {
  return !!localStorage.getItem(TOKEN);
};

const logout = () => {
  localStorage.removeItem(TOKEN);
};

const totalUsuarios = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(465);
    }, 1000);
  });
};
const obtenerEstadisticas = async (fechaInicio, fechaFinal) => {
  return new Promise((resolve) => {
    console.log(fechaInicio, fechaFinal);
    setTimeout(() => {
      resolve({
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
      });
    }, 1000);
  });
};

export {
  obtenerUsuarios,
  obtenerUsuario,
  editarUsuario,
  cambiarEstadoUsuario,
  obtenerAppServers,
  crearServer,
  eliminarServer,
  login,
  estaLogeado,
  logout,
  totalUsuarios,
  obtenerEstadisticas,
};
