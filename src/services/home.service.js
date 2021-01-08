//Método index que retorna un mensaje.
class HomeService {
  index() {
    return {
      message: "Hello World!"
    };
  }
}

//Awilix permite exportar la clase de esta forma.
module.exports = HomeService;
