var seneca = require('seneca')(),
    assert = require('assert'),
    _ = require('underscore');

var testSystem = {
    "areas": [
        {
            "name": "Area 1",
            "zones": [
                {
                    "name": "Zone 1",
                    "pin": 5
                },
                {
                    "name": "Zone 2",
                    "pin": 6
                }
            ]
        }
    ],
    "overcurrent": {
        "name": "Overcurrent Sensor",
        "pin": 6
    },
    "flow": {
        "name": "Flow 1",
        "pin": 7,
        "minFlow": 0.0,
        "maxFlow": 20.0,
        "states": {
            "nominal": {
                "lower": 14.0,
                "upper": 16.0
            },
            "caution": {
                "lower": 11.0,
                "upper": 17.5
            },
            "error": {
                "lower": 0.0,
                "upper": 20.0
            }
        }
    }
};

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
});
