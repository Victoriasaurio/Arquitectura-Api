const { Router } = require('express')

//Awilix proporciona el HomeController.
module.exports = function({ UserController }){
  const router = Router();

//'index' - Indica el método que devuelve al usuario.
  router.get("/:userId", UserController.get)
  router.get("", UserController.getAll)
  router.patch("/:userId", UserController.update)
  router.delete("/:userId", UserController.delete)

  return router
};
