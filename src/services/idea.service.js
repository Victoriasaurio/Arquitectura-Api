const BaseService = require("./base.service")
let _ideaRepository = null

class IdeaService extends BaseService {
  constructor({ IdeaRepository }) {
    super(IdeaRepository)
    _ideaRepository = IdeaRepository
  }

  async getUserIdeas(author) {
    if(!author) {
      const error = new Error()
      error.status = 400
      error.message = "userId must be sent"
      throw error;
    }

    return await _ideaRepository.getUserIdeas(author)
  }

  async upvoteIdea(ideaId) {
    if(!ideaId) {
      const error = new Error()
      error.status = 400
      error.message = "ideaId must be sent"
      throw error;
    }

    const idea = await _ideaRepository.get(ideaId)

    if(!idea) {
      const error = new Error()
      error.status = 404
      error.message = "idea does not exist"
      throw error;
    }
    //Insertamos un único voto.
    idea.upvote.push(true)
    //Actualizamos la idea y añadimos el voto a la base de datos.
    return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes })
  }

  //Voto en-contra.
  async downvoteIdea(ideaId) {
    if(!ideaId) {
      const error = new Error()
      error.status = 400
      error.message = "ideaId must be sent"
      throw error;
    }

    const idea = await _ideaRepository.get(ideaId)

    if(!idea) {
      const error = new Error()
      error.status = 404
      error.message = "idea does not exist"
      throw error;
    }
    //Insertamos un único voto.
    idea.downvote.push(true)
    //Actualizamos la idea y añadimos el voto a la base de datos.
    return await _ideaRepository.update(ideaId, { upvotes: idea.downvote })
  }
}

module.exports = IdeaService;
