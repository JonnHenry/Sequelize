module.exports = function (sequelize){
    //Importamos todos los modelos, hacemos las relaciones entre ellos y los devolvemos los datos
    const Productos = require('./Productos')(sequelize);
	const Equipos = require('./Equipos')(sequelize);
	//const Instrumentos = require('./Instrumentos')(sequelize);
    //const Insumos = require('./Insumos')(sequelize);
    //Un Equipo,insumo o instrumento pertenece a una Inventario ya sea de control o entrega
    Equipos.hasMany(Productos, {foreignKey: 'Id', sourceKey: 'IdProducto'})
    Productos.belongsTo(Equipos, {foreignKey: 'Id', targetKey: 'IdProducto'});

	return {
        Productos: Productos,
		Equipos: Equipos//,
		//Instrumentos: Instrumentos,
        //Insumos: Insumos
	};
};