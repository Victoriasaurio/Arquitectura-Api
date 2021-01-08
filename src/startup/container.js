const { createContainer, asClass, asValue, asFunction } = require('awilix')

// config - Variables de entorno.
const config = require('../config')
const app = require('.') //La ruta se interpreta.

// services
const { HomeService } = require('../services')

// controllers
const { HomeController } = require("../controllers")

// routes
const { HomeRoutes } = require("../routes/index.routes")
const Routes = require('../routes')

const container = createContainer()

//Inyecta una clase. singleton() permite que sea la misma instancia de HomeService.
container
.register({ //Config principal de la aplicación.
  app: asClass(app).singleton(),
  router: asFunction(Routes).singleton(),
  config: asValue(config)
  //El config lo obtenemos como un obleto con el asValue.
})
.register({
  HomeService: asClass(HomeService).singleton()
})
.register({
  HomeController: asClass(HomeController.bind(HomeController)).singleton()
  //Al realizar el bind el scoup se mantiene, ya que express es quien hace que cambie.
})
. register({
  HomeRoutes: asFunction(HomeRoutes).singleton()
})

module.exports = container;
