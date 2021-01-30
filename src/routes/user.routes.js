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
  router.get("",
    [AuthMiddleware, ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)], // Se cacha por una hora
    UserController.getAll) //Protege la ruta con un token.
  router.patch("/:userId", UserController.update)
  router.delete("/:userId", UserController.delete)

  return router
};
