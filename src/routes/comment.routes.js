const { Router } = require('express')
const { AuthMiddleware } = require("../middlewares")

//Awilix proporciona el HomeController.
module.exports = function({ CommentController }){
  const router = Router();

//'index' - Indica el método que devuelve al usuario.
  router.get("/:commentId/unique", CommentController.get)
  router.get("/:ideaId", CommentController.getIdeaComments)
  router.post("/:ideaId", AuthMiddleware, CommentController.createComment)
  router.patch("/:commentId", AuthMiddleware, CommentController.update) //Actualiza
  router.delete("/:commentId", AuthMiddleware, CommentController.delete)

  return router
};
