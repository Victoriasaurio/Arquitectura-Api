# Arquitectura API
![Build Status](https://travis-ci.org/github/Victoriasaurio/Arquitectura-Api/builds/757856510)

### Initial commands
Install the necessary dependencies of the project.
```
npm i
```
Running the program
Development `nodemon dev` o `npm run dev` <br>
Production `npm run start` <br>
Test `npm run test`. At the moment it only stores user tests.

### Swagger 
`http://localhost:5000/api-docs/`

### Docker-compose
Insert your corresponding credentials in the `docker-compose.yml` file. <br>
Running docker-compose file `sudo docker-compose up`. <br>
Replace the PORT environment variable with any available port.

### Travis
`sudo gem install travis` Una vez instalado RVM Y Ruby, ya tendríamos la propiedad `gem`. Entonces necesitariamos obtener el API_KEY de Heroku esa misma propiedad que forma parte de deploy. Ejecutar: <br>
`travis encrypt $(heroku auth:token) --add deploy.api_key`

Como siguiente paso es necesario agregar las variables de entorno en Heroku. Nos dirigimos a `settings/Config Vars` y los agregamos.

