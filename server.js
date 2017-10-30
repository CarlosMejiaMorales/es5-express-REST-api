'use strict'
// external dependecies******************************/
const express    =  require('express'); // server
const BodyParser =  require('body-parser'); 
const morgan     =  require('morgan'); // logging
const mongoose   =  require('mongoose'); // mongodDB connection / interaction
mongoose.Promise =  global.Promise // setting up es6 promises for mongoose
// internal dependecies******************************/
var index   = require('./src/routers/index'); // .../home/...
var posts   = require('./src/routers/posts'); // .../posts/...
var options = require('./src/config/options'); // loading options
var cat1    = require('./src/config/logger'); // loading cat1 logger
/****************************************************/

// Server Class used for instantiating Server Apps
var Server = /**@class*/ (function (){
    function Server(options) {
        this.options    = options;
        this.expressApp = express();
        this.connectMongo();
        this.setupMiddleWare();        
        this.launchApp();
    };
    Server.prototype.setupMiddleWare =  function() {
        var statFiles = this.options.launch.staticFiles?this.options.launch.staticFiles:'/public';
        this.expressApp.use(BodyParser.json()); //errorHandling occurs after this statement
        this.expressApp.use(BodyParser.urlencoded({extended: true}));
        this.expressApp.use(express.static(__dirname + statFiles));                        
        this.expressApp.use(morgan('dev'));
        this.setupRouters();
    }
    Server.prototype.setupRouters = function() {
        // .../.. rootpath is used for serving static files (frontend)
        this.expressApp.use('/', index);
        this.expressApp.use('/api', posts, this.errorHandling());
    }
    Server.prototype.errorHandling = function() {
        return function errHandler(err, req, res, next){
           res.status(422).send({
               error: err.message
            });
        }
    }
    Server.prototype.connectMongo = function() {
        var uri     = this.options.dataBaseConnecton.uri?this.options.dataBaseConnecton.uri:'';
        var options = this.options.dataBaseConnecton.options?this.options.dataBaseConnecton.options:{};
        mongoose.connect(uri, options).then(function() {
            cat1.info('Mongo connection stablished sucessfully')
        }).catch(function(err) {
            if (err) {cat1.info('Error while connecting to database: '+ err)}
        });
    }
    Server.prototype.launchApp  = function() {
        var port     = this.options.launch.port ? this.options.launch.port: 4200;
        var hostname = this.options.launch.hostname ? this.options.launch.hostname: 'localhost';

        if ((typeof port === 'number' && port <= 9000)&&(typeof hostname === 'string' && hostname != '')) {
            this.expressApp.listen(port, hostname, function(err){
                if (err) {cat1.info('Connection Error:'+ err)}
                else { cat1.info('server satarted at: '+ port)};
            });
        } else { cat1.info('error launching app') };

    }
    return Server;
})();
var app = new Server(options);
module.exports = app;




