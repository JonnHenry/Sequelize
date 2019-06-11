const Sequelize = require('sequelize');

const conexionDB = new Sequelize('pruebas', 'admin', '123456789', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        encrypt: true
    }
});

var models = require('../models')(conexionDB)

const connectDB = ()=>{
    conexionDB.sync().then(() => {
        console.log('Tablas Creadas exitosamente!')
    },
    (err) => 
        {
            console.log(err)
            console.log("Error connecting DB, retrying...")
            setTimeout(connectDB, 5000);
        });
}

module.exports.models = models;
module.exports.connectDB=connectDB;


