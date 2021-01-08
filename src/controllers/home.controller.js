let _homeService = null;

//La inyecsión del HomeService la realiza Awilix. La clase debe ser nombrada exactamente como en 'startup/container.js'.
class HomeController {
  constructor({ HomeService }) {
    //Al utilizarlo de esta manera nos aseguramos de que _homeService es de tipo privado y solamente es usado en HomeController.
    _homeService = HomeService;
  }
  //Express se encarga de definir el req y res.
  index(req, res) {
    return res.send(_homeService.index());
  }
}

module.exports = HomeController;
