const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Instrumentos = sequelize.define('instrumentos', {
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
        observacion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "Ninguna"
        },
        estado: {
            type: DataTypes.ENUM('Obsoleto', 'Buen Estado'), //Estados que puede tener un producto
            allowNull: true
        }
    }, {
        timestamps: false
    });
    return Instrumentos;
}