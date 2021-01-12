const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

module.exports = function(req, res, next) {
  //Si no existe el token
  const token = req.headers["authorization"] //Debe mandarse como parámetro en headers un token.
  if(!token) {
    const error = new Error()
    error.status = 400
    error.message = "Token must be sent"
    throw error
  }

  //SI existe el Token - Lo desencriptamos.
  jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
    if(err) {
      const error = new Error()
      error.status = 401
      error.message = "Invalid token"
      throw error
    }

    //Token válido - decodedToken, Token desencriptado.
    req.user = decodedToken.user
    next()
  })
}
