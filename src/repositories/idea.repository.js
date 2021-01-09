const BaseRepository = require("./base.repository")
let _idea = null

class IdeaRepository extends BaseRepository {
  constructor({ Idea }){
    super(Idea);
    _idea = Idea;
  }

// Busca todas las ideas donde un author haya participado.
  async getUserIdeas(author) {
    return await _idea.find({ author })
  }
}

module.exports = IdeaRepository;
