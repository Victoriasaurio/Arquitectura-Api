//Repositorio que será una plantilla para un CRUD cuya responsabilidad será heredada por otros repos.
class BaseRepository {
  constructor(model) {
    this.model = model;

    }

    async getOne(id) {
      return await this.model.findById(id)
    }

    // Paginación
    async getAll(pageSize = 5, pageNum = 1) { //pageSize - Cantidad de recursos, pageNum - Página a visualizar
      // skip - cantidad de elimentos a saltar -- limit - cantidad de recursos a mostrar
      const skips = pageSize * (pageNum - 1) // Lógica para saltar los recursos.
      return await this.model
        .find()
        .skip(skips)
        .limit(pageSize)
    }

    async create(entity) {
      return await this.model.create(entity)
    }

//{new: true} - Muestra la entidad actualizada.
    async update(id, entity) {
      return await this.model.findByIdAndUpdate(id, entity, { new: true })
    }

    async delete(id) {
      await this.model.findByIdAndDelete(id)
      return true;
  }
}

module.exports = BaseRepository;
