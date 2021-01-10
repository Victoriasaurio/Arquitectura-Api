// Se configura en el archivo 'container' para que Awilix pueda utilizar las configuraciones.
const { createContainer, asClass, asValue, asFunction } = require('awilix')

// config - Variables de entorno.
const config = require('../config')
const app = require('.') //La ruta se interpreta.

// services
const {
  HomeService,
  IdeaService,
  CommentService,
  UserService
 } = require('../services')

// controllers
const {
  HomeController,
  UserController,
  IdeaController,
  CommentController
} = require("../controllers")

// routes
const {
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes
} = require("../routes/index.routes")
const Routes = require('../routes')

// models
const { User, Comment, Idea } = require("../models")

// repositories
const {
  UserRepository,
  IdeaRepository,
  CommentRepository
} = require("../repositories")

const container = createContainer()

//Inyecta una clase. singleton() permite que sea la misma instancia a la que pertence. Ej HomeController, HomeRoutes, etc.
container
.register({ //Config principal de la aplicación.
  app: asClass(app).singleton(),
  router: asFunction(Routes).singleton(),
  config: asValue(config)
  //El config lo obtenemos como un obleto con el asValue.
})
.register({
  HomeService: asClass(HomeService).singleton(),
  IdeaService: asClass(IdeaService).singleton(),
  CommentService: asClass(CommentService).singleton(),
  UserService: asClass(UserService).singleton()
})
.register({
  HomeController: asClass(HomeController.bind(HomeController)).singleton(),
  UserController: asClass(UserController.bind(UserController)).singleton(),
  IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
  CommentController: asClass(CommentController.bind(CommentController)).singleton()
  //Al realizar el bind el scoup se mantiene, ya que express es quien hace que cambie.
})
. register({
  HomeRoutes: asFunction(HomeRoutes).singleton(),
  UserRoutes: asFunction(UserRoutes).singleton(),
  IdeaRoutes: asFunction(IdeaRoutes).singleton(),
  CommentRoutes: asFunction(CommentRoutes).singleton()
})
.register({ //Serán inyectados tal cual son retornados.
  User: asValue(User),
  Idea: asValue(Idea),
  Comment: asValue(Comment)
})
.register({
  UserRepository: asClass(UserRepository).singleton(),
  IdeaRepository: asClass(IdeaRepository).singleton(),
  CommentRepository: asClass(CommentRepository).singleton()
})

module.exports = container;
