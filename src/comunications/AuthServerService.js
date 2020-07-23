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
};
