module.exports = function (sequelize) {
    //Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos los datos de los modelos
    const Productos = require('./Productos')(sequelize);
    const Equipos = require('./Equipos')(sequelize);
    const Inventarios = require('./Inventarios')(sequelize);
    Productos.belongsTo(Inventarios, {
        foreignKey: 'id',
        constraints: false,
        as: 'productos'
    });

    Inventarios.hasMany(Productos, {
        foreignKey: 'id',
        constraints: false
    })


    return {
        Productos: Productos,
        Equipos: Equipos,
        Inventarios: Inventarios
    };
};