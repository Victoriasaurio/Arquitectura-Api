const mongoose = require('mongoose')
const { Schema } = mongoose
const { compareSync, hashSync, genSaltSync } = require('bcryptjs')

const UserSchema = new Schema({
  name: {
    type: String, required: true
  },
  username: {
    type: String, required: true
  },
  password: {
    type: String, required: true
  }
});

//Método para mongoose - sobre escribe el toJSON para eliminar la contraseña y que no se muestre.
UserSchema.methods.toJSON = function() {
  let user = this.toObject() //Convierte a un objeto de javaScript.
  delete user.password
  return user
}

//Método que Compara las contraseñas.
UserSchema.methods.comparePasswords = function(password) {
  return compareSync(password, this.password)
  //this.password - Hace referencia al documento que se está manipulando.
}

//HOOK
//Cuando intentemos guardar el usuario se ejecutará este método antes. 'this' hace referencia al usuario que se esta intentando guardar.
UserSchema.pre('save', async function(next) {
  const user = this;
//Si no se esta modificando la ocntraseña el método pasa a la siguiente parte.
  if(!user.isModified("password")) {
    return next()
  }

//Se asigna la contraseña al usuario y se guarda.
  const salt = genSaltSync(10)
  const hashedPassword = hashSync(user.password, salt)
  user.password = hashedPassword
  next()
})

module.exports = mongoose.model('user', UserSchema)
