const DataTypes = require('sequelize/lib/data-types');

module.exports = function(sequelize){
    const Equipos = sequelize.define('equipos',
    {
        id_producto:{
            type : DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,   
            references: {
                model: 'productos',
                key: 'id'
            }    
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "No especificada"
        },
        observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        estado:{
            type: DataTypes.ENUM('Obsoleto', 'Buen Estado','Reparación'), //Estados que puede tener un producto
            allowNull: false
        }
    },{
        timestamps: false
    });
    return Equipos;
}