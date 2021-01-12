const { Router } = require('express')
const { AuthMiddleware } = require("../middlewares")

//Awilix proporciona el UserController.
module.exports = function({ UserController }){
  const router = Router();

  router.get("/:userId", UserController.get)
  router.get("", [AuthMiddleware],UserController.getAll) //Protege la ruta con un token.
  router.patch("/:userId", UserController.update)
  router.delete("/:userId", UserController.delete)

  return router
};
