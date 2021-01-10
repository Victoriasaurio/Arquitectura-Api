//Inyecta los middlewares y realiza la configuración de todas las rutas.
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')//Brechas de seguridad. (middleware).
const compression = require('compression')//Comprime las peticiones Http.
require('express-async-errors')//Captura en un middleware las excepciones asíncronas.
const { NotFoundMiddleware, ErrorMiddleware } = require("../middlewares")

module.exports= function({
  HomeRoutes,
  UserRoutes,
  IdeaRoutes,
  CommentRoutes
}) {
  const router = express.Router()
  const apiRoutes = express.Router()

//Default-middlewares de express que se ejecutan antes de las rutas.
  apiRoutes
  .use(express.json()) //Convierte nuestro body a JSON. Equivalente a Body-parser.
  .use(cors())
  .use(helmet())
  .use(compression());

  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/user", UserRoutes);
  apiRoutes.use("/idea", IdeaRoutes);
  apiRoutes.use("/comment", CommentRoutes);

//Versión que tendrán todos los enpoints.
  router.use("/v1/api", apiRoutes);

//Captura de errores y status.
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);


  return router;
}

//cors(), puede recibir algunas especificaciones. (investigar).
