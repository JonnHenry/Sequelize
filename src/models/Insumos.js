const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Insumos = sequelize.define('insumos', {
        id_producto: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id'
            }
        },
        fecha_caducidad: {
            type: DataTypes.DATEONLY, //Solo se debe de ingresar la fecha
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Insumos;
}