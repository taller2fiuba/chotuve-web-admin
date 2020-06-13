import axios from "axios";

const AUTH_SERVER_API = "http://localhost:26080";

// eslint-disable-next-line no-unused-vars
const getAppServers = (callback, errorHandler) => {
  // TODO:Debería devolver una lista de objetos con la información de las appservers regitradas
  // axios(`${AUTH_SERVER}/appservers`)
  //     .then(response => callback(response))
  //     .catch(error => errorHandler(error));

  callback([
    { nombre: "appserver", url: "https://chotuve-app-server.herokuapp.com" },
  ]);
};

const obtenerUsuarios = async () => {
  const response = await axios.get(`${AUTH_SERVER_API}/usuario`);
  return response.data;
};

const obtenerUsuario = (usuarioId) => {
  return {
    id: usuarioId,
    nombre: "Edson",
    apellido: "Justo",
    email: "ed@ed.com",
    telefono: "445567797",
  };
};

export { getAppServers, obtenerUsuarios, obtenerUsuario };
