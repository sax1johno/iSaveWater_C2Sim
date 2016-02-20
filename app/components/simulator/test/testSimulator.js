var seneca = require('seneca')(),
    assert = require('assert'),
    _ = require('underscore'),
    testSystem = require('../default');

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
            // load up the simulated hardware microservice.
            seneca.use('../../simulator-hardware-test');
            seneca.ready(function(err) {
                if (err) {
                    seneca.log.fatal(err);
                    process.exit(1);
                }
                seneca.listen({type: "tcp"});
            });
        })
    });
    
    describe('#config', function(done) {
        this.timeout(5000);
        it('should bootstrap a system using a config object', function(done) {
            var params = {};
            _.extend(params, {"role": "simulator", "cmd": "config"}, testSystem);
          seneca.act(
              params,
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
    describe('#overcurrent', function(done) {
        this.timeout(5000);
        it('should test the ability to turn on overcurrent pin', function(done) {
            var params = {};
            //     seneca.add({'role': pluginName, 'cmd': 'overcurrent', state: {required$: true}}, function(args, done) {
            var area = seneca.make$('area');
            area.list$({}, function(err, areaList) {
                var area = areaList[0];
                _.extend(params, {"role": "simulator", "cmd": "activate", "type": "overcurrent", 'area': area}); // Turn on Overcurrent
                seneca.act(
                    params,
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
        
        it('should test the ability to turn off overcurrent pin', function(done) {
            var params = {};
            //     seneca.add({'role': pluginName, 'cmd': 'overcurrent', state: {required$: true}}, function(args, done) {
            var area = seneca.make$('area');
            area.list$({}, function(err, areaList) {
                var area = areaList[0];
                _.extend(params, {"role": "simulator", "cmd": "deactivate", "type": "overcurrent", 'area': area}); // Turn on Overcurrent
                seneca.act(
                    params,
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
    describe('#zone', function(done) {
        this.timeout(5000);
        it('should test the ability to activate a zone', function(done) {
            var params = {};
            // seneca.add({'role': pluginName, 'cmd': 'activate', 'type': 'zone'}, function(args, done) {
            var zone = seneca.make$('zone');
            zone.list$({}, function(err, zoneList) {
                if (err) return done(err);
                console.log(zoneList);
                var thisZone = zoneList[0]; // Just grab the first zone we can find.
                _.extend(params, {"role": "simulator", "cmd": "activate", type: 'zone', zone: thisZone.id}); // Turn on zone by ID
                seneca.act(
                    params,
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
        
        it('should test the ability to deactivate a zone', function(done) {
            var params = {};
            // seneca.add({'role': pluginName, 'cmd': 'activate', 'type': 'zone'}, function(args, done) {
            var zone = seneca.make$('zone');
            zone.list$({}, function(err, zoneList) {
                if (err) return done(err);
                console.log(zoneList);
                var thisZone = zoneList[0]; // Just grab the first zone we can find.
                _.extend(params, {"role": "simulator", "cmd": "deactivate", type: 'zone', zone: thisZone.id}); // Turn on zone by ID
                seneca.act(
                    params,
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
    
    describe('#flow', function(done) {
        this.timeout(5000);
        it('should test the ability to activate the flow solenoid', function(done) {
            var params = {};
            // seneca.add({'role': pluginName, 'cmd': 'activate', 'type': 'zone'}, function(args, done) {
            // var flow = seneca.make$('flow');
            // flow.list$({}, function(err, flowList) {
            //     if (err) return done(err);
            //     console.log(flowList);
            //     var thisFlow = flowList[0]; // Just grab the first zone we can find.
            var rate = 30;
            var unit = 'GALLONS';
            var time = 'MINUTE';
            var area = seneca.make$('area');
            area.list$({}, function(err, areaList) {
                if (err) return done(err);
                var area = areaList[0];
                _.extend(params, {"role": "simulator", "cmd": "activate", type: 'flow', 'area': area}, {rate: rate, unit: unit, time: time});
                seneca.act(
                    params,
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
            // });
        });
        
        it('should test the ability to deactivate the flow solenoid', function(done) {
            var params = {};
            var area = seneca.make$('area');
            area.list$({}, function(err, areaList) {
                if (err) return done(err);
                var area = areaList[0];
                _.extend(params, {"role": "simulator", "cmd": "deactivate", type: 'flow', 'area': area, timer: {}});
                seneca.act(
                    params,
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
    
});
