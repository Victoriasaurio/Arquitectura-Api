const { Router } = require('express')
const { ParseIntMiddleware, AuthMiddleware } = require("../middlewares")

//Awilix proporciona el HomeController.
module.exports = function({ IdeaController }){
  const router = Router();

//'index' - Indica el método que devuelve al usuario.
  router.get("/:ideaId", IdeaController.get)
  router.get("", ParseIntMiddleware, IdeaController.getAll)
  router.get("/:ideaId/all", IdeaController.getUserIdeas)
  router.post("", IdeaController.create)
  router.patch("/:ideaId", AuthMiddleware, IdeaController.update)
  router.delete("/:ideaId", AuthMiddleware, IdeaController.delete)
  router.post(":ideaId/upvote", AuthMiddleware, IdeaController.upvoteIdeas)
  router.post(":ideaId/downvote", AuthMiddleware, IdeaController.downvoteIdeas)


  return router
};
