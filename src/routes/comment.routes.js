const { Router } = require('express')

//Awilix proporciona el HomeController.
module.exports = function({ CommentController }){
  const router = Router();

//'index' - Indica el método que devuelve al usuario.
  router.get("/:commentId/unique", CommentController.get)
  router.get("/:ideaId", CommentController.getIdeaComments)
  router.post("/:ideaId", CommentController.createComment)
  router.patch("/:commentId", CommentController.update) //Actualiza
  router.delete("/:commentId", CommentController.delete)

  return router
};
