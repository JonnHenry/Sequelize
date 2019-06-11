module.exports = function (sequelize) {
    //Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos los datos de los modelos
    const Productos = require('./Productos')(sequelize);
    const Equipos = require('./Equipos')(sequelize);
    const Instrumentos = require('./Instrumentos')(sequelize);
    const Insumos = require('./Insumos')(sequelize);

    return {
        Productos: Productos,
        Equipos: Equipos,
        Instrumentos: Instrumentos,
        Insumos: Insumos
    };
};