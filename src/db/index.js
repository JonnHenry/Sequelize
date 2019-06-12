const Sequelize = require('sequelize');

const conexionDB = new Sequelize('pruebas', 'admin', '123456789', {
    host: 'localhost',
    dialect: 'postgres'
});

var models = require('../models')(conexionDB)

const connectDB = () => {
    conexionDB.sync({
        force: true
    }).then(() => {
            console.log('Base de datos conectada exitosamente!')
        },
        (err) => {
            console.log(err)
            console.log("Error connecting DB, retrying...")
            setTimeout(connectDB, 5000);
        });
}

module.exports.models = models;
module.exports.connectDB = connectDB;
module.exports.conexionDB = conexionDB;