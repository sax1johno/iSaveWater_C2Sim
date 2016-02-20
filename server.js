/**
 * This file loads the application plugins and boots the system using the 
 * specified environment.
 **/
 
var http = require('http'),
    express = require("express"),
    app = express(),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    seneca = require("seneca")(),
    environment = app.get('env'),
    sutil = require('util'),
    session      = require('express-session'),
    MemStore = session.MemoryStore,
    routes = require('./app/routes'),
    flash = require('connect-flash'),
    path = require('path'),
    async = require('async'),
    _ = require('underscore');
    // defaultSimConfig = require('./data/system1');
    
console.log("loading options from", "config." + environment + ".js");
var configFile = "config." + environment + ".js";

seneca.use('options',configFile);

// Load Base Seneca Plugins
seneca.use('user',{confirm:true});

seneca.use('auth',{
  redirect:{
    login: {
      win:  '/dashboard',
      fail: '/login'
    },
    register: {
      win:  '/dashboard',
      fail: '/register#failed'
    }
  }
});


// Custom Seneca Plugins
seneca.use('app/components/simulator/index');
seneca.use('app/components/simulator-hardware-test/index');
// seneca()
//   .use(color)
//   .listen()

// seneca()
//   .client()
//   .act('color:red')

/*
    Load up the plugins you'd like to use, along with any application-specific plugins.
    By default, the 'web' and 'api' plugins are loaded.
*/
seneca.ready(function(err) {
  if (err) {
      seneca.log.fatal(err);
      process.exit(1);
  }
  // Set up app middleware
  // app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session(
    {
      secret: '8y3l138ut13je31r13sad13vs8h3ety3r8t13w8weyhel', 
      store: MemStore({
        reapInterval: 60000 * 10
      }),
      resave: true,
      saveUninitialized: true
    }
  ));
  
  app.use(express.static(path.join(__dirname, 'app', 'public')));

  app.use(flash());
  
  // Expose all session messages to the view.
  app.use(function(req, res, next) {
      res.locals.messages = req.session.messages;
      next();
  });

  // seneca.use('admin', {server:app,local:true});
  
  var config = seneca.export('options');
  // Export the configuration into an object that we can mess with.
  // We do the config after "ready" to give other plugins a change to modify
  // the configuration options of the app if they need to.
  // High-level webapp configuration goes here.
  // app.use(etc);
  // finally, listen on the seneca transport system AND listen on the webapp.
  var web = seneca.export('web');
  app.use( web );
  
  // Load up the express app routes.
  // NOTE: DO NOTE add routes here.  Custom routes should go in the routes.js 
  // file.  These are also added after the seneca web services are exposed
  // to ensure that the express routes have precedence over seneca-exposed 
  // routes.
  app.use("/", routes);

  // Listen on the server for the webapp.
  app.listen( config.main.port );
  
  // Set up the microservices bus.
  seneca.log.info('listening on ',config.main.port);
  seneca.listen({type: "tcp"});
  // defaultSimConfig.role = 'simulator';
  // defaultSimConfig.cmd = 'config';
  // seneca.act(
  //   defaultSimConfig,
  //   function (err, results) {
  //     if (err) {
  //       console.error(err);
  //     } else {
  //         console.log(results);
  //     }
  // });
});