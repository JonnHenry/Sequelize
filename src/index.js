const port = 3000;
const server=require('./app').startServer;
const conexionBD = require('./db').connectDB;
const conexion = require('./db').conexionDB
conexionBD();

const app = server(port);

const models = require('./db').models;
const Productos = models.Productos;
const Equipos = models.Equipos;

app.post('/producto/nuevo', (req, res) => { // Para poder crear un producto
  Productos.findOrCreate({
    where: {
      id: req.body.id,
    },
    defaults: {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio_unitario: req.body.precioUnitario,
      stock: req.body.stock,
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
  try {
    conexion.query("Select * from productos", {
      raw: true
    }).spread(function (results, metadata) {
      res.json({
        'length': results.length,
        'data': results,
        'error': false
      })
    });
  } catch (error) {
    res.json({
      'length': 0,
      'error': true,
      'data': []
    }); 
  }
});

app.post('/equipo/nuevo', (req, res) => { // Para poder crear un producto
  console.log(req.body)
  Equipos.findOrCreate({
    where: {
      id_producto: req.body.idProducto,
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
  try {
    conexion.query("SELECT id, nombre, descripcion, observacion, precio_unitario, stock, marca, estado, created_at, updated_at  FROM equipos JOIN productos ON productos.id = equipos.id_producto;", {
      raw: true
    }).spread(function (results, metadata) {
      res.json({
        "error": false,
        "data": results
      });
    })
  } catch (error) {
    res.json({
      "error": true,
      "data": []
    });
  }

});


app.get("/", (req, res) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
})

