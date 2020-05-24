// import axios from 'axios';

// TODO: Mover a variable de ambiente
// const AUTH_SERVER = 'https://chotuve-auth-server-g4.herokuapp.com';

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

export default { getAppServers };
