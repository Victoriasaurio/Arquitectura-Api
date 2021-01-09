//Repositorio que será una plantilla para un CRUD cuya responsabilidad será heredada por otros repos.
class BaseRepository {
  constructor(model) {
    this.model = model;

    }
    
    async getOne(id) {
      return await this.model.findById(id)
    }

    async getAll() {
      return await this.model.find()
    }

    async create(entity) {
      return await this.model.create(entity)
    }

//{new: true} - Muestra la entidad actualizada.
    async update(id, entity) {
      return await this.model.findByIdAndUpdate(id, entity, { new: true })
    }

    async delete(id) {
      return await this.model.findByIdAndDelete(id)
  }
}

module.exports = BaseRepository;
