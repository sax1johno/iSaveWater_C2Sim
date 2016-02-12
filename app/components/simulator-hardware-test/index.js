/**
 * The hardware connectors for a Raspberry PI.
 **/
var _ = require('underscore');

module.exports = function(options) {
    var pluginName = "simulator";
    
    var seneca = this;
    
    var PIN_STATES = {
        "HIGH": 1,
        "LOW": 0
    }
    
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

    // Opens a pin for use.
    seneca.add({"role": pluginName, "cmd": "open", "pin": {required$: true}}, function(args, done) {
        done(null, {"success": "Would have opened pin " + args.pin});
    });
    
    // Close a pin.
    seneca.add({"role": pluginName, "cmd": "close", "pin": {required$: true}}, function(args, done) {
        done(null, {"success": "Would have closed pin " + args.pin});
    });
    
    // Set the direction of the specified pin.
    seneca.add({"role": pluginName, "cmd": "setDirection", "pin": {required$: true}, "direction": {required$: true}}, function(args, done) {
        done(null, {"success": "Would have set pin " + args.pin + " to " + args.direction});
    });
    
    // Get the direction of the specified pin.
    seneca.add({"role": pluginName, "cmd": "getDirection", "pin": {required$: true}}, function(args, done) {
        done(null, {"success": "Would have retrieved direction of pin " + args.pin}); 
    });
    
    // Read the value of the specified pin.
    seneca.add({"role": pluginName, "cmd": "read", "pin": {required$: true}}, function(args, done) {
        done(null, {"success": "Would have read pin " + args.pin}); 
    });
    
    // Write the value to the specified pin.
    seneca.add({"role": pluginName, "cmd": "write", "pin": {required$: true}, "value": {required$: true}}, function(args, done) {
        done(null, {"success": "Would have written to pin " + args.pin}); 
    });
    
    // Pulse the specified pin at the specified rate in Hz
    seneca.add({"role": pluginName, "cmd": "pulse", "pin": {required$: true}, "rate": {required$: true}}, function(args, done) {
        // console.log(args);
        // var rateInMS = 1000 / args.rate;
        // var state = false;
        // var timer = setInterval(function() {
        //     state = !state;
        // }, rateInMS);
        done(null, {"success": "Would set off a task that pulses pin " + args.pin + " at rate " + args.rate, timer: {}});
    });
    
    seneca.add({"role": pluginName, "cmd": "stop_pulse", "pin": {required$:true}, 'timer': {required$:true }}, function(args, done) {
        done(null, {"success": "Would have stopped pin " + args.pin + " from pulsing."}) 
    });
    
    // return the name for this module.
    return {
        name: pluginName
    };
};