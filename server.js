var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config')
var compiler = webpack(config)
var mongoose = require('mongoose')
var configuration = require('./config')
var vhost = require('vhost')
var api = require('./server/api')


//MongoDB connection whit Mongoose
var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
}

function startServer() {

  switch (app.get('env')) {
      case 'development':
          mongoose.connect(configuration.mongodb.development.connectionString, opts);
          break;
      case 'production':
          mongoose.connect(configuration.mongodb.production.connectionString, opts);
          break;
      default:
          throw new Error('Unknown execution environment: ' + app.get('env'));
  }

  //Cross-origin resource sharing (CORS) configuration
  app.use('*', require('cors')());

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json({limit:'10mb'}));

  app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
  }));


  app.use(vhost('api.*', api))


  app.get('/bundle.js', function (req, res) {
      res.sendFile(path.join(__dirname, 'public/bundle.js'))
  });

  app.get('/styles.css', function (req, res) {
      res.sendFile(path.join(__dirname, 'public/resources/styles.css'))
  });

  app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, 'index.html'))
  });

  app.listen(configuration.server.port, function () {
    console.log('Example app listening on port ' + configuration.server.port)
  });
}

if(require.main === module){
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function to create server
    module.exports = startServer;
}
