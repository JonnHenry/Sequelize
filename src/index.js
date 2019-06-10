var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./db/index').models;
const conexionBD = require('./db/index').connectDB;
const Productos = models.Productos;
const Equipos = models.Equipos;
conexionBD();

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
var port = 3000;


app.post('/producto/nuevo', (req, res) => { // Para poder crear un producto
    Productos.findOrCreate({
      where: {
        Id: req.body.id,
      },
      defaults: {
        Nombre: req.body.nombre,
        Descripcion: req.body.descripcion,
        PrecioUnitario: req.body.precioUnitario,
        Stock : req.body.stock,
        Activo: req.body.activo
      }
    }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
      if (created) {
        res.json({
          'message': 'El Producto fue ingresado de manera correcta',
          'inserted': true
        })
      } else {
        res.json({
          'message': 'El Producto no fue ingresado, ya se encuentra registrado',
          'inserted': false
        })
      }
    }).catch(err => {
      res.json({
        message: 'Error, vuelva a intentarlo.',
        inserted: false
      })
    })
  });

  app.get('/producto/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
    Productos.findAndCountAll()
      .then(result => {
        res.json({
          'length': result.count,
          'data': result.rows,
          'error': false
        })
      })
      .catch((err) => {
        res.json({
          'length': 0,
          'error': true,
          'data': []
        });
      })
  });

  app.post('/equipo/nuevo', (req, res) => { // Para poder crear un producto
    Equipos.findOrCreate({
      where: {
        IdProducto: req.body.idProducto,
      },
      defaults: {
        Marca: req.body.marca,
        Observacion: req.body.observacion,
        Estado: req.body.estado
      }
    }).spread((result, created) => { // Si este fue encontrado retorna un booleano con verdadero si el objeto fue creado
      if (created) {
        res.json({
          'message': 'El Equipo fue ingresado de manera correcta',
          'inserted': true
        })
      } else {
        res.json({
          'message': 'El Equipo no fue ingresado, ya se encuentra registrado',
          'inserted': false
        })
      }
    }).catch(err => {
      res.json({
        message: 'Error 500 Internal Server Error, vuelva a intentarlo.',
        inserted: false
      })
    })
  });
  
  
  app.get('/equipo/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
    Equipos.findAll({
        include: [
            {
                model: Productos
            }
        ]
    })
      .then(result => {
        res.json({
          'data': result,
          'error': false
        })
      })
      .catch((err) => {
        res.json({
          'error': true,
          'data': []
        });
      })
  });


  app.get("/", (req, res) => {
    res.send("<h1>Servidor funcionando correctamente</h1>");
  })
  
  app.listen(port, () => {
    console.log('Escuchando en el puerto' + port)
  });