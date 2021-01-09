const BaseRepository = require("./base.repository");
let _user = null

class UserRepository extends BaseRepository {
  constructor({ User }) { //A container le decimos que queremos 'User'
    super(User); //Ponemos 'super', porque el contructor de la clase padre recibe un parámetro.
    _user = User;
  }

  async getUserByUsername(username) {
    return await _user.findOne({ username })
  }
}

module.exports = UserRepository;
