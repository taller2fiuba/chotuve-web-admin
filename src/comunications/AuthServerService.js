/* eslint-disable no-undef */
import axios from "axios";

const AUTH_SERVER_API = "https://chotuve-auth-server-g4.herokuapp.com";
const CANTIDAD_POR_DEFECTO = 100;

let servers = [
  { id: 1, nombre: "app 1", url: "lala/dasd/da" },
  { id: 2, nombre: "app 2", url: "fafla/dasd" },
];

// eslint-disable-next-line no-unused-vars
const getAppServers = (callback, errorHandler) => {
  // TODO:Debería devolver una lista de objetos con la información de loss appservers regitrados
  // axios(`${AUTH_SERVER}/appservers`)
  //     .then(response => callback(response))
  //     .catch(error => errorHandler(error));

  callback([
    { nombre: "appserver", url: "https://chotuve-app-server.herokuapp.com" },
  ]);
};

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
  const response = await new Promise((resolve, reject) => {
    if (true) {
      resolve(servers);
    } else {
      reject(Error("Error interno"));
    }
  });
  return response;
};

const crearServer = async (server) => {
  // const response = await axios.post(`${AUTH_SERVER_API}/app-server`, server);
  const response = await new Promise((resolve, reject) => {
    if (true) {
      const { ...pr } = server;
      servers.push({ id: servers.length + 1, ...pr });
      console.log(servers);
      resolve({ app_id: servers.length + 1, token: "ASLDdas7asd12edsaKsldaF" });
    } else {
      reject(Error("Error interno"));
    }
  });
  return response;
};

const eliminarServer = async (serverId) => {
  // await axios.delete(`${AUTH_SERVER_API}/app-server/${serverId}`);
  await new Promise((resolve, reject) => {
    if (true) {
      console.log(serverId);
      servers = servers.filter((serv) => serv.id !== serverId);
      console.log(servers);
      resolve();
    } else {
      reject(Error("Error interno"));
    }
  });
};

const API_LOGIN = "https://reqres.in/api/login"; // Mock API para el login
const TOKEN = "token";

const login = async (usuario, clave) => {
  const response = await axios.post(
    API_LOGIN,
    {
      email: usuario,
      password: clave,
    },
    { handlerEnabled: false }
  );
  localStorage.setItem(TOKEN, response.data.token);

  return response;
};

const estaLogeado = () => {
  return !!localStorage.getItem(TOKEN);
};

const logout = () => {
  localStorage.removeItem(TOKEN);
};

export {
  getAppServers,
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
};
