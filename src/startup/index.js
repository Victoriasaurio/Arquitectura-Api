//Clase que le da inicio a la aplicación.
const express = require('express')

//Se declaran nulas para que sean privadas y su valor sea utilizada solo en esta clase.
let _express = null
let _config = null

//LOs parámetros deben escribirse igual como lo tenemos en 'container' para que awilix lo interprete.
class Server {
  constructor({ config, router }) {
    _config = config;
    _express = express().use(router); //A la instancia de express le pasamos el 'router' que contiene todas las rutas.
  }

  //Método que retorna una promesa para inicializar el server.
  start() {
    return new Promise(resolve => {
      _express.listen(_config.PORT, () => {
        console.log(_config.APPLICATION_NAME + " API running on port " + _config.PORT)

        resolve(); //Se ejecuta para que la promesa termine.
      })
    })
  }
}

module.exports = Server
