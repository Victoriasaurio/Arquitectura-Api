const { generateToken } = require('../helpers/jwt.helper.js')
let _userRepository = null

class AuthService {
  constructor({ UserService }) {
    _userRepository = UserService
  }

  async signUp(user) {
    const { username } = user
    const userExist = await _userRepository.getUserByUsername(username)
    if(userExist) {
      const error = new Error()
      error.status = 400
      error.message = "User already exists"
      throw error
    }

    return await _userRepository.create(user)
  }

  async signIn(user) {
    const { username, password } = user
    const userExist = await _userRepository.getUserByUsername(username)
    if(!userExist) {
      const error = new Error()
      error.status = 404
      error.message = "User does not exist"
      throw error
    }

    const validPassword = userExist.comparePasswords(password)
    if(!validPassword) {
      const error = new Error()
      error.status = 400
      error.message = "Invalid password"
      throw error
    }

    const userToEncode = {
      username: userExist.username,
      id: userExist._id
    }

    //Genera el token a partir del usuario
    const token = generateToken(userToEncode)

    return { token, user: userExist }
  }
}

module.exports = AuthService
