/**
 * The hardware connectors for a Raspberry PI.
 **/
var underscore = require('underscore'),
    pi = require('pi-gpio');

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
        done();
    });
    
    // Set the direction of the specified pin.
    seneca.add({"role": pluginName, "cmd": "setDirection", "pin": {required$: true}, "direction": {required$: true}}, function(args, done) {
        done();
    });
    
    // Get the direction of the specified pin.
    seneca.add({"role": pluginName, "cmd": "getDirection", "pin": {required$: true}}, function(args, done) {
        done(); 
    });
    
    // Read the value of the specified pin.
    seneca.add({"role": pluginName, "cmd": "read", "pin": {required$: true}}, function(args, done) {
        done(); 
    });
    
    // Write the value to the specified pin.
    seneca.add({"role": pluginName, "cmd": "write", "pin": {required$: true}, "value": {required$: true}}, function(args, done) {
        done(); 
    });
    
    // return the name for this module.
    return {
        name: pluginName
    };
    
};