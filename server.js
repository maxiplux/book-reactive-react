var express = require('express');
var app = express();
var bodyParser = require("body-parser")
var path = require('path')
var webpack = require('webpack')
var config = require('./webpack.config')
var compiler = webpack(config)


app.use(express.static(path.join(__dirname, 'public')));

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.get('/bundle.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/bundle.js'));
});

app.get('/styles.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/resources/styles.css'));
});

app.get('/signup/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});




app.get('/:user', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');

});












// var express = require("express")

// var mongoose = require('mongoose')

// var webpack = require('webpack')
// var config = require('./webpack.config')
// var app = express()
// var compiler = webpack(config)
// var router = express.Router()
//
// var config = require('./config')
//
//
// var opts = {
//     server: {
//         socketOptions: {keepAlive: 1}
//     }
// };
//
// switch (app.get('env')) {
//     case 'development':
//         mongoose.connect(configuration.mongodb.development.connectionString, opts);
//         break;
//     case 'production':
//         mongoose.connect(configuration.mongodb.production.connectionString, opts);
//         break;
//     default:
//         throw new Error('Unknown execution environment: ' + app.get('env'));
// }

// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use(require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     publicPath: config.output.publicPath
// }));
//app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
//
//
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });
//
// app.get('/execution/flow/:id', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
// });
//
//
//
//
// app.get('/bundle.js', function (req, res) {
//     console.log("path ==> /bundle.js");
//     console.log(req.query.img);
//     res.sendFile(path.join(__dirname, 'public/bundle.js'));
// });
//
// app.get('/interfaces.json', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public/interfaces.json'));
// });
//
// app.get('/styles.css', function (req, res) {
//     res.sendFile(path.join(__dirname, 'public/styles.css'));
// });
//
//
//
// app.use(router);
//
// app.listen(3000, function () {
//     console.log("Node server running on http://localhost:3000");
// });
