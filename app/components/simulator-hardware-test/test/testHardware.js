var seneca = require('seneca')(),
    assert = require('assert'),
    _ = require('underscore');

// var testSystem = {
//     "areas": [
//         {
//             "name": "Area 1",
//             "zones": [
//                 {
//                     "name": "Zone 1",
//                     "pin": 5
//                 },
//                 {
//                     "name": "Zone 2",
//                     "pin": 6
//                 }
//             ]
//         }
//     ],
//     "overcurrent": {
//         "name": "Overcurrent Sensor",
//         "pin": 6
//     },
//     "flow": {
//         "name": "Flow 1",
//         "pin": 7,
//         "minFlow": 0.0,
//         "maxFlow": 20.0,
//         "states": {
//             "nominal": {
//                 "lower": 14.0,
//                 "upper": 16.0
//             },
//             "caution": {
//                 "lower": 11.0,
//                 "upper": 17.5
//             },
//             "error": {
//                 "lower": 0.0,
//                 "upper": 20.0
//             }
//         }
//     }
// };

describe('simulator', function() {
    it('should instantiate', function() {
        assert.doesNotThrow(function() {
            seneca.use('../index');
            
            seneca.ready(function(err) {
                if (err) {
                    seneca.log.fatal(err);
                    process.exit(1);
                }
                seneca.listen({type: "tcp"});
            });
        })
    });

    describe('#open', function(done) {
        this.timeout(5000);
        it('should open the specified pin ', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "open", "pin": "4"},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });
    
    describe('#close', function(done) {
        this.timeout(5000);
        it('should close the specified pin ', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "close", "pin": "4"},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });
    
    describe('#setDirection', function(done) {
        this.timeout(5000);
        it('should set the direction of the specified pin ', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "setDirection", "pin": "4", "direction": "OUT"},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });

    describe('#getDirection', function(done) {
        this.timeout(5000);
        it('should get the direction of the specified pin ', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "getDirection", "pin": "4"},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });
    
    describe('#read', function(done) {
        this.timeout(5000);
        it('should get the value of the specified pin ', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "read", "pin": "4"},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });
    
    describe('#write', function(done) {
        this.timeout(5000);
        it('should write the specified value of the specified pin ', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "write", "pin": "4", "value": 0},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });
    
    describe('#pulse', function(done) {
        this.timeout(5000);
        it('should pulse the specified pin at the specified rate', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "pulse", "pin": "4", "rate": "20.0"},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });
    
    describe('#stop_pulse', function(done) {
        this.timeout(5000);
        it('should stop pulsing the specified pin', function(done) {
            // var params = {};
            // _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              {'role': "simulator", "cmd": "stop_pulse", "pin": "4"},
                function (err, results) {
                    if (err) {
                        done(err);
                    } else {
                        console.log(results);
                        done();
                    }
                }
            );
        });
    });
});
