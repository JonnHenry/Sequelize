var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const conexionBD = require('./db').connectDB;
const conexion = require('./db').conexionDB

conexionBD();


const models = require('./db').models;
const Productos = models.Productos;
const Equipos = models.Equipos;

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
var port = 3000;


app.post('/producto/nuevo', (req, res) => { // Para poder crear un producto
  /*conexion.query('Select * from Productos').spread(function(results, metadata) {
    // Results will be an empty array and metadata will contain the number of affected rows.
    console.log('Los resultados son: '+ results);
    console.log('Los metadatas son: '+metadata)
    
  })
  res.send('OK')*/
  Productos.findOrCreate({
      where: {
        id: req.body.id,
      },
      defaults: {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precioUnitario: req.body.precioUnitario,
        stock : req.body.stock,
        activo: req.body.activo
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
      console.log(err)
      res.json({
        message: 'Error, vuelva a intentarlo.',
        inserted: false
      })
    })
  });

  app.get('/producto/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
    conexion.query("Select * from productos", { raw: true }).spread(function(results, metadata) {
      // Results will be an empty array and metadata will contain the number of affected rows.
      results.forEach(element => {
        console.log(JSON.stringify(element))
      });
    })
    res.send('OK')
    
    /*Productos.findAndCountAll()
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
      })*/
  });

  app.post('/equipo/nuevo', (req, res) => { // Para poder crear un producto
    Equipos.findOrCreate({
      where: {
        idProducto: req.body.idProducto,
      },
      defaults: {
        marca: req.body.marca,
        observacion: req.body.observacion,
        estado: req.body.estado
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
      console.log(err)
      res.json({
        message: 'Error 500 Internal Server Error, vuelva a intentarlo.',
        inserted: false
      })
    })
  });
  
  
  app.get('/equipo/all', (req, res) => { // Para poder obtener todos los inventarios y el numero de inventarios
    conexion.query("Select * from productos", { raw: true }).spread(function(results, metadata) {
      // Results will be an empty array and metadata will contain the number of affected rows.
      results.forEach(element => {
        console.log(JSON.stringify(element))
      });
    })
    res.send('OK')
   
    /* Equipos.findAll()
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
      })*/
  });


  app.get("/", (req, res) => {
    res.send("<h1>Servidor funcionando correctamente</h1>");
  })
  
  app.listen(port, () => {
    console.log('Escuchando en el puerto' + port)
  });