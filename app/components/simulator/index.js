var _ = require('underscore'),
    path = require('path'),
    fs = require('fs'),
    async = require('async');

module.exports = function(options) {
    var pluginName = "simulator";
    
    var seneca = this;
    
    options = seneca.util.deepextend({
    },options);

    // seneca.add({init:pluginName}, function(args, done) {
    //     fs.readdir(path.join(__dirname, "/views"), function(err, files) {
    //         if (err) {
    //             done(err);
    //         } else {
    //             async.each(files, function(file, cb) {
    //                 if (err) {
    //                     cb(err);
    //                 } else {
    //                     var view = {};
    //                     view.plugin = pluginName;
    //                     view.ext = require('path').extname(file);
    //                     view.name = require('path').basename(file, view.ext);
    //                     view.path = path.join(__dirname, "/views", file);
    //                     view.template = new Buffer(fs.readFileSync(view.path));
    //                     seneca.act({
    //                         role: "views",
    //                         cmd: "add", 
    //                         name: view.name,
    //                         plugin: view.plugin,
    //                         ext: view.ext,
    //                         template: view.template
    //                     }, function(err, result) {
    //                         console.log(result);
    //                         if (err) {
    //                             cb(err);
    //                         } else {
    //                             cb();
    //                         }
    //                     });
    //                 }
    //             }, function(err) {
    //                 if (err) {
    //                     done(err);
    //                 } else {
    //                     done();
    //                 }
    //             });
    //         }
    //     }); 
    // });

    /**
     * Configuration Command
     * Takes a configuration object and creates the system architecture.
     **/
    seneca.add({"role": pluginName, "cmd": "config"}, function(args, done) {
        var areas = args.areas;
        var flow = args.flow;
        var overcurrent = args.overcurrent;
        async.series([
            function(callback){
                // First we'll save off the overcurrent sensor.
                var oc = seneca.make$("overcurrent");
                oc.name = overcurrent.name;
                oc.pin = overcurrent.pin;
                oc.save$(function(err, savedOC) {
                    callback(err, savedOC);
                });
            },
            function(callback){
                // Now lets save off the main flow sensor.
                var flowSensor = seneca.make$("flow");
                flowSensor.name = flow.name;
                flowSensor.pin = flow.pin;
                flowSensor.minFlow = flow.minFlow;
                flowSensor.maxFlow = flow.maxFlow;
                flowSensor.states = {
                    nominal: {
                        lower: flow.states.nominal.lower,
                        upper: flow.states.nominal.upper
                    }, caution: {
                        lower: flow.states.caution.lower,
                        upper: flow.states.caution.upper
                    }, error: {
                        lower: flow.states.error.lower,
                        upper: flow.states.error.upper
                    }
                };
                flowSensor.save$(function(err, savedFlow){
                    callback(err, savedFlow); 
                });
            },
            function(mainCallback, savedOc, savedFlow) {
                // Iterate through the areas and zones and save them off.
                async.each(areas, function(area, areaCb) {
                    var thisArea = seneca.make$("area");
                    thisArea.name = area.name;
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
    
    // seneca.add({'role': pluginName, 'cmd': 'status'}, function(args, done) {
        
    // });
    // Set the state of the overcurrent pin.
    seneca.add({'role': pluginName, 'cmd': 'overcurrent', state: {required$: true}}, function(args, done) {
        // Set the state of the overcurrent pin;
        var oc = seneca.make$("overcurrent");
        oc.list$({}, function(err, ocList) {
            if (err) return done(err);
            var main = ocList[0];
            var pin = main.pin;
            this.act({
                "role": pluginName,
                "cmd": "write",
                "pin": pin,
                "value": args.state
            }, function(err, result) {
                // TODO: Set the value of the overcurrent pin to the specified state.
                done(err, result);
            });
        });
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
    
    seneca.add({'role': pluginName, 'cmd': 'activate', 'type': 'flow'}, function(args, done) {
        seneca.make('flow').load$(args.id, function(err, loadedFlow) {
            if (err) done(err);
            else {
                done({"failure": "Flow command not available yet."})
                // this.act({
                //     "role": pluginName,
                //     "cmd": "write",
                //     "pin": loadedFlow.pin,
                //     "value": 0
                // }, function(err, result) {
                //     done(err, result);
                // });
            }
        });
    });
    
    seneca.add({'role': pluginName, 'cmd': 'deactive', 'type': 'flow'}, function(args, done) {
        
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
            if (!_.isUndefined(area)) {
                done({"error": "Command not yet implemented for areas"});
            } else {
                done({"error": "This command requires an area or zone"});
            }
        }
    });
    

    // Add a test route that can be accessed only by admin users.
    seneca.add({"role": pluginName, "cmd": "test", "version": 1}, function(args, done) {
        done(null, {success: "Simulator test was succcessful"});
    });
    
    // return the name for this module.
    return {
        name: pluginName
    };
    
};