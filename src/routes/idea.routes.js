const { Router } = require('express')
const { ParseIntMiddleware } = require("../middlewares")

//Awilix proporciona el HomeController.
module.exports = function({ IdeaController }){
  const router = Router();

//'index' - Indica el método que devuelve al usuario.
  router.get("/:ideaId", IdeaController.get)
  router.get("", ParseIntMiddleware, IdeaController.getAll)
  router.get("/:ideaId/all", IdeaController.getUserIdeas)
  router.post("", IdeaController.create)
  router.patch("/:ideaId", IdeaController.update)
  router.delete("/:ideaId", IdeaController.delete)
  router.post(":ideaId/upvote", IdeaController.upvoteIdeas)
  router.post(":ideaId/downvote", IdeaController.downvoteIdeas)


  return router
};
