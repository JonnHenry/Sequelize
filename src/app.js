var express = require('express');
var cors = require('cors');
var bodyParser= require('body-parser');
var app=express();
app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(bodyParser.json())
app.use(cors());

const startServer = function(port){
    app.listen(port, () => {
        console.log('Escuchando en el puerto: ' + port)
    });
    return app;
}

module.exports.startServer=startServer;
