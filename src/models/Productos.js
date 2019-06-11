const DataTypes = require('sequelize/lib/data-types');

module.exports = function (sequelize) {
    const Productos = sequelize.define('productos', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            onUpdate: 'CASCADE'
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'Ninguna',
            onUpdate: 'CASCADE'
        },
        precio_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0.0,
            onUpdate: 'CASCADE'
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        }

    }, {
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    });
    return Productos;
}