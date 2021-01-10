const { Router } = require('express')

//Awilix proporciona el HomeController.
module.exports = function({ HomeController }){
  const router = Router();

//Gracias al bind que configuramos antes, el scoup de HomeController se mantiene y podemos acceder al 'services'.
  router.get("/", HomeController.index)

  return router
};
