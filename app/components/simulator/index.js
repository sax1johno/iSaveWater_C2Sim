var _ = require('underscore'),
    path = require('path'),
    fs = require('fs'),
    async = require('async'),
    defaultConfig = require('./default');

module.exports = function(options) {
    var pluginName = "simulator";
    
    var seneca = this;
    
    options = seneca.util.deepextend({
    },options);

    /**
     * Configuration Command
     * Takes a configuration object and creates the system architecture.
     **/
    seneca.add({"role": pluginName, "cmd": "config"}, function(args, done) {
        if (!_.isUndefined(args.default)) {
            args.areas = defaultConfig.areas;
            args.flow = defaultConfig.flow;
            args.overcurrent = defaultConfig.overcurrent;
        }
        var areas = args.areas;
        // var flow = args.flow;
        // var overcurrent = args.overcurrent;
        async.series([
            function(callback) {
                var config = seneca.make('config');
                config.areas = args.areas;
                // config.flow = args.flow;
                // config.overcurrent = args.overcurrent;
                console.log(config);
                config.save$(function(err, savedConfig) {
                    callback(err, savedConfig);
                });
            },
            // function(callback){
            //     // First we'll save off the overcurrent sensor.
            //     var oc = seneca.make$("overcurrent");
            //     oc.name = overcurrent.name;
            //     oc.pin = overcurrent.pin;
            //     oc.save$(function(err, savedOC) {
            //         callback(err, savedOC);
            //     });
            // },
            // function(callback){
            //     // Now lets save off the main flow sensor.
            //     var flowSensor = seneca.make$("flow");
            //     flowSensor.name = flow.name;
            //     flowSensor.pin = flow.pin;
            //     flowSensor.minFlow = flow.minFlow;
            //     flowSensor.maxFlow = flow.maxFlow;
            //     flowSensor.states = {
            //         nominal: {
            //             lower: flow.states.nominal.lower,
            //             upper: flow.states.nominal.upper
            //         }, caution: {
            //             lower: flow.states.caution.lower,
            //             upper: flow.states.caution.upper
            //         }, error: {
            //             lower: flow.states.error.lower,
            //             upper: flow.states.error.upper
            //         }
            //     };
            //     flowSensor.save$(function(err, savedFlow){
            //         callback(err, savedFlow); 
            //     });
            // },
            function(mainCallback, savedOc, savedFlow) {
                // Iterate through the areas and zones and save them off.
                async.each(areas, function(area, areaCb) {
                    var thisArea = seneca.make$("area");
                    thisArea.name = area.name;
                    thisArea.flow = area.flow;
                    thisArea.overcurrent = area.overcurrent;
                    thisArea.save$(function(err, newArea) {
                        if (!err) {
                            async.each(area.zones, function(zone, zoneCb) {
                                 var thisZone = seneca.make$('zone');
                                 thisZone.name = zone.name;
                                 thisZone.pin = zone.pin;
                                 thisZone.area = newArea;
                                 thisZone.save$(function(err, newZone) {
                                     zoneCb(err);
                                 });
                            }, function(err) {
                                areaCb(err);
                            });
                        } else {
                            areaCb(err);
                        }
                    });
                }, function(err) {
                    mainCallback(err);
                });
            }
        ],
        // optional callback
        function(err, results){
            // results is now equal to ['one', 'two']
            done(err, {results: results});
        });
    });
    
    seneca.add({"role": pluginName, "cmd": "getConfig"}, function(args, done) {
        var config = seneca.make$('config');
        var query = args.query || {};
        config.list$(query, function(err, configList) {
            done(err, configList);
        });
    });
    
    // seneca.add({'role': pluginName, 'cmd': 'status'}, function(args, done) {
    // });
    // Set the state of the overcurrent pin.
    seneca.add({'role': pluginName, 'cmd': 'activate', 'type': 'overcurrent', "area": {required$: true}}, function(args, done) {
        // Set the state of the overcurrent pin;
        // var oc = seneca.make$("overcurrent");
        // oc.list$({}, function(err, ocList) {
            // if (err) return done(err);
            var main = args.area.overcurrent;
            var pin = main.pin;
            this.act({
                "role": pluginName,
                "cmd": "write",
                "pin": pin,
                "value": 0
            }, function(err, result) {
                // TODO: Set the value of the overcurrent pin to the specified state.
                done(err, result);
            });
        // });
    });
    
    seneca.add({'role': pluginName, 'cmd': 'deactivate', 'type': 'overcurrent', "area": {required$: true}}, function(args, done) {
        // Set the state of the overcurrent pin;
        // var oc = seneca.make$("overcurrent");
        // oc.list$({}, function(err, ocList) {
        //     if (err) return done(err);
            var main = args.area.overcurrent;
            var pin = main.pin;
            this.act({
                "role": pluginName,
                "cmd": "write",
                "pin": pin,
                "value": 1
            }, function(err, result) {
                done(err, result);
            });
        // });
    });
    
    
    
    seneca.add({'role': pluginName, 'cmd': 'activate', 'type': 'zone'}, function(args, done) {
        var zone = args.zone;
        // var area = args.area;
        if (!_.isUndefined(zone)) {
            // foo_entity.load$( id, function(err,foo){
            //   console.log(foo)
            // })
            seneca.make('zone').load$(zone, function(err, loadedZone) {
                if (err) done(err);
                else {
                    this.act({
                        "role": pluginName,
                        "cmd": "write",
                        "pin": loadedZone.pin,
                        "value": 1
                    }, function(err, result) {
                        done(err, result);
                    });
                }
            });
        } else {
            // if (!_.isUndefined(area)) {
                // done({"error": "Command not yet implemented for areas"});
            // } else {
                done({"error": "This command requires a zone"});
            // }
        }
    });
    
    // seneca.add('role': pluginName, 'cmd': )
    seneca.add({'role': pluginName, 'cmd': 'deactivate', 'type': 'zone'}, function(args, done) {
        var zone = args.zone;
        var area = args.area;
        if (!_.isUndefined(zone)) {
            // foo_entity.load$( id, function(err,foo){
            //   console.log(foo)
            // })
            seneca.make('zone').load$(zone, function(err, loadedZone) {
                if (err) done(err);
                else {
                    this.act({
                        "role": pluginName,
                        "cmd": "write",
                        "pin": loadedZone.pin,
                        "value": 0
                    }, function(err, result) {
                        done(err, result);
                    });
                }
            });
        } else {
            // if (!_.isUndefined(area)) {
                // done({"error": "Command not yet implemented for areas"});
            // } else {
                done({"error": "This command requires a zone"});
            // }
        }
    });
    
    seneca.add({'role': pluginName, 'cmd': 'activate', 'type': 'flow', "area": {required$: true}}, function(args, done) {
        var rate = args.rate;
        var unit = args.unit;
        var time = args.time;
        var freqency = rate / 2;
        // Gallons per minute ratio is 15Hz = 30 gal / min SO HZ = galmin / 2
        // Calculate frequency based on Unit / Minute
        // var flow = seneca.make$("flow");
        // flow.list$({}, function(err, flowList) {
        //     if (err) done(err);
        //     else {
        console.log(args.area);
                var main = args.area.flow;
                console.log('main = ', main.pin);
                var pin = main.pin;
        // seneca.add({"role": pluginName, "cmd": "pulse", "pin": {required$: true}, "rate": {required$: true}}, function(args, done) {
                this.act({
                    "role": pluginName,
                    "cmd": "pulse",
                    "pin": pin,
                    "rate": freqency // Rate in HZ
                }, function(err, result) {
                    // TODO: Set the value of the overcurrent pin to the specified state.
                    done(err, result);
                });
        //     }
        // });
    });
    
    seneca.add({'role': pluginName, 'cmd': 'deactivate', 'type': 'flow', "area": {required$: true}}, function(args, done) {
        // Gallons per minute ratio is 15Hz = 30 gal / min SO HZ = galmin / 2
        // Calculate frequency based on Unit / Minute
        var flow = seneca.make$("flow");
        // flow.list$({}, function(err, flowList) {
            // if (err) done(err);
            // else {
            //     if (err) return done(err);
                var main = args.area.flow;
                var pin = main.pin;
                
        // seneca.add({"role": pluginName, "cmd": "pulse", "pin": {required$: true}, "rate": {required$: true}}, function(args, done) {
                this.act({
                    "role": pluginName,
                    "cmd": "stop_pulse",
                    "pin": pin,
                    "timer": args.timer
                }, function(err, result) {
                    // TODO: Set the value of the overcurrent pin to the specified state.
                    done(err, result);
                });
            // }
        // });
    });
    

    // Add a test route that can be accessed only by admin users.
    seneca.add({"role": pluginName, "cmd": "test", "version": 1}, function(args, done) {
        done(null, {success: "Simulator test was succcessful"});
    });
    
    
    // If you want to add any more routes, or override some route mapping
    // from the routes file, this is the place to do it.
    // routes.<command> = {GET: true};
    seneca.act('role:web',{
        use:{
            // define some routes that start with /my-api
            prefix: "/api/v1/simulator",
            // use action patterns where the role is web, the type is 'api'
            // and any command is given.
            pin: {role:pluginName,cmd:"*"},
            // Map each command to some HTTP method, and use the
            // query parameters as values for the action
            map: {
              config: {POST:true,GET:true},
              activate:{POST:true,GET:true},
              deactivate:{POST:true,GET:true},
              getConfig: {GET: true}
            }
            // premap: function(req,res,next){
            //     // check to ensure that a config has been loaded.
            //     // Send an error if it hasn't yet.
            //     var seneca = req.seneca;
            //     var config = seneca.make$("config");
            //     config.list$({}, function(err, configList) {
            //         if (err) return next();
            //         if (configList.length > 0) return next();
            //         res.status(500).send({"failure": "Unable to process: no config found", "message": "Please run the configuration command first"});
            //     });
            // }
        }
    });

    
    // return the name for this module.
    return {
        name: pluginName
    };
    
};