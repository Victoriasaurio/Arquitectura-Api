module.exports = function(req, res, next) {
  const queryStrings = req.query
  for (const key in queryStrings) {
    const length = queryStrings[key].length
    const isValid = length > 20 ? false : [isNaN(parseInt(queryStrings[key]))]
    // Verifica si es un ID de mongoose, en caso de que sea este no debe modificarse. Los ID de mongoose exceden los 20 dígitos.

    if(isValid) {
      queryStrings[key] = parseInt(queryStrings[key]) //Cambia de valor.
    }
  }

  req.query = queryStrings // Retorna el nuevo valor | En caso de que sea ID de mongoose este conserva su valor.
  next()
}
