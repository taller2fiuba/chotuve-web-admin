import axios from "axios";

const AUTH_SERVER_API = "https://chotuve-auth-server-g4.herokuapp.com";
const CANTIDAD_POR_DEFECTO = 100;

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

export {
  getAppServers,
  obtenerUsuarios,
  obtenerUsuario,
  editarUsuario,
  cambiarEstadoUsuario,
};
