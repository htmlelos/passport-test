const config = require('config')
const mongoose = require('mongoose')

// Establece la libreria de promesas de mongoose como la libreria nativa de ES6
mongoose.Promise = global.Promise
// Conexion a la base de datos
const connectionString = `${config.dbhost.url}:${config.dbhost.port}/${config.dbhost.db}`
mongoose.connect(connectionString, config.dbhost.options)


mongoose.connection.on('connect', () => {
  console.log(`Se establecio la conexión a la base de datos en ${connectionString}`);
})

mongoose.connection.on('error', (error) => {
  console.log(`No se pudo conectar a ${connectionString}`);
})
