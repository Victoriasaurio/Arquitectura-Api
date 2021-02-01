const { Router } = require('express')
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware
} = require("../middlewares")
const { CACHE_TIME } = require("../helpers")

//Awilix proporciona el UserController.
module.exports = function({ UserController }){
  const router = Router();

  router.get("/:userId", UserController.get)
  router.get("", // [ ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)] //Por practica de SWAGGER lo comentamos.
    [ ParseIntMiddleware], // Se cacha por una hora
    UserController.getAll) //Protege la ruta con un token.
  router.patch("/:userId", AuthMiddleware, UserController.update)
  router.delete("/:userId", AuthMiddleware, UserController.delete)

  return router
};
