const BaseService = require("./base.service")
let _commentRepository = null,
_ideaRepository = null;

class CommentService extends BaseService {
  constructor({ CommentRepository, IdeaRepository }){
    super(CommentRepository)
    _commentRepository = CommentRepository
    _ideaRepository = IdeaRepository
  }

  async getIdeaComments(ideaId) {
    if(!ideaId) {
      const error = new Error()
      error.status = 404
      error.message = "ideaId must be sent"
      throw error;
    }

    //Busca la idea
    const idea = await _ideaRepository.get(ideaId)

    if(!idea) {
      const error = new Error()
      error.status = 404
      error.message = "idea does not exist"
      throw error;
    }

    //Comentarios de una idea.
    const { comments } = idea
    return comments
  }

//Idea a la que se creará el comentario y id del autor.
  async createComment(comment, ideaId) {
    if(!ideaId) {
      const error = new Error()
      error.status = 404
      error.message = "ideaId must be sent"
      throw error;
    }

    //Busca la idea
    const idea = await _ideaRepository.get(ideaId)

    if(!idea) {
      const error = new Error()
      error.status = 404
      error.message = "idea does not exist"
      throw error;
    }

    //Idea a la que se le pasa un comentario adicional.
    const createComment = await _commentRepository.create(comment)
    idea.comments.push(createComment)

    return await _ideaRepository.update(ideaId, { comments: idea.comments })
  }
}

module.exports = CommentService;
