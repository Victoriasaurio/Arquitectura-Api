class BaseService {
  constructor(repository) {
    this.repository = repository
  }

  async get(id) {
    if(!id) {
      const error = new Error()
      error.status = 400
      error.message = "ID must be sent"
      throw error; //Este error lo atrapa el error-middleware.
    }

    const currentEntity = await this.repository.getOne(id)
    if(!currentEntity) {
      const error =  new Error()
      error.status = 404
      error.message = "Entity does not found"
      throw error;
    }

    return currentEntity; //Retorna la Entidad
  }
  async getAll(pageSize, pageNum) {
    return await this.repository.getAll(pageSize, pageNum)
  }

  async create(entity) {
    return await this.repository.create(entity)
  }

  async update(id, entity) {
    if(!id) {
      const error = new Error()
      error.status = 400
      error.message = "Id must be sent"
      throw error;
    }

    return await this.repository.update(id, entity)
  }

  async delete(id) {
    if(!id) {
      const error = new Error()
      error.status = 400
      error.message = "Id must be sent"
      throw error;
    }

    return await this.repository.delete(id)
  }
}

module.exports = BaseService;
