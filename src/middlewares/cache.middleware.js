const mcache = require('memory-cache')
const { CACHE_KEY } = require('../config')

module.exports = function(duration) {
  return (req, res, next) => {
    // Propiedades del objeto req de express - originUrl retorna la url original - req.url como tal
    const key = CACHE_KEY + req.originUrl || req.url
    const cacheBody = mcache.get(key) // Si existe una cache body creada

    if(cacheBody) {
      return res.send(JSON.parse(cacheBody)) // cache creada
    } else { // Si es primera vez del request se debe cachar
      res.sendResponse = res.send
      res.send = body => {
        mcache.put(key, body, duration * 1000) // Agrega al cache
        res.sendResponse(body) // Sobre escribe
      }
      next()
    }
  }
}
