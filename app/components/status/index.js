var _ = require('underscore');
var Amqp = require('azure-iot-device-amqp').Amqp;
var AmqpWs = require('azure-iot-device-amqp-ws').AmqpWs;
var Http = require('azure-iot-device-http').Http;
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;
    // path = require('path'),
    // fs = require('fs'),
    // async = require('async'),
    // defaultConfig = require('./default'),
    // AMQPClient = require('amqp10').Client,
    // Policy = require('amqp10').Policy,
    // translator = require('amqp10').translator,
    // Promise = require('bluebird');

module.exports = function(options) {
    var pluginName = "status";
    
    var seneca = this;
    console.log("options = ", options);
    
    options = seneca.util.deepextend({
    },options);

    // var protocol = options.protocol;
    // var eventHubHost = options.eventHubHost;
    // var sasName = options.sasname;
    // var sasKey = options.saskey;
    // var eventHubName = options.eventHubName;
    // var numPartitions = options.numPartitions;
    // var uri = protocol + '://' + encodeURIComponent(sasName) + ':' + encodeURIComponent(sasKey) + '@' + eventHubHost;
    // var recvAddr = eventHubName + '/ConsumerGroups/$default/Partitions/';
    // var client;

    // var messageHandler = function (partitionId, message) {
    //   console.log('Received(' + partitionId + '): ', message.body);
    // };
    
    // var errorHandler = function(partitionId, err) {
    //   console.warn('** Receive error: ', err);
    // };
    
    // var createPartitionReceiver = function(partitionId, receiveAddress, filterOption) {
    //   return client.createReceiver(receiveAddress, filterOption)
    //     .then(function (receiver) {
    //       console.log('Listening on partition: ' + partitionId);
    //       receiver.on('message', messageHandler.bind(null, partitionId));
    //       receiver.on('errorReceived', errorHandler.bind(null, partitionId));
    //     });
    // };

    seneca.add({init: pluginName}, function(args, done) {
        console.log("Initializing ", pluginName, " and attempting to create hub client");
        // HostName=IrrigationManagement.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=Pkx9m0Yr9gEczbGJ6vFkATXh10bSbev5xldkG/p/dD0=
        // var sas = encodeURIComponent("Pkx9m0Yr9gEczbGJ6vFkATXh10bSbev5xldkG/p/dD0=");
        // var connectionString = "HostName=IrrigationManagement.azure-devices.net;DeviceId=ISWController;SharedAccessKeyName=iothubowner;SharedAccessKey=Pkx9m0Yr9gEczbGJ6vFkATXh10bSbev5xldkG/p/dD0=";
        var connectionString = "HostName=IrrigationManagement.azure-devices.net;DeviceId=ISWController;SharedAccessKey=1rLRVVZKrBBoIoaEFHsI3Z1FMTGh+GNL+SnH4upMd78=";
        var client = Client.fromConnectionString(connectionString, Amqp);
        var connectCallback = function(err) {
            if (err) {
                console.log(err);
                done(err);
            } else {
                console.log("Should have connected");
                client.on('error', function (err) {
                    console.error("error = ", err.message);
                    console.error(err);
                });
        
                client.on('disconnect', function(){
                    // clearInterval(sendInterval);
                    client.removeAllListeners();
                    client.connect(connectCallback);
                });
                
                client.on('message', function (msg) {
                    console.log(msg.body);
                    client.complete(msg, function(err, result) {
                        if (err) {
                            console.error("Error receiving message: ", err);
                        }
                        console.log("Received message with result: ", result);
                    });
                });
                
                // client.on('message', function (msg) {
                //     console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
                //     client.complete(msg, printResultFor('completed'));
                //     // reject and abandon follow the same pattern.
                //     // /!\ reject and abandon are not available with MQTT
                // });
                
                client.on('errorReceived', function(err) {
                    console.log(err);
                });
            }
        };
        
        client.open(connectCallback);
        // client.getReceiver(function (err, rcv) {
        //     client._receiver.on('message', function (msg) {
        //         console.log(msg);
        //         client._receiver.complete(msg, function () {
        //           console.log('completed');
        //         });
        //     });
        //     client._receiver.on('errorReceived', function (err) {
        //         console.warn(err);
        //     });
        // });
        done();
        // });

        // client = new AMQPClient(Policy.EventHub);
        // console.log("ready to connect");
        // client.connect(uri)
        //   .then(function () {
        //       console.log("connecting to partitions");
        //     var partitions = [];
        //     for (var i = 0; i < numPartitions; ++i) {
        //       partitions.push(createPartitionReceiver(i, recvAddr + i));
        //       console.log("Adding listener for partition", recvAddr + i);
        //     }
        //     console.log("created partitions");
        //     return Promise.all(partitions);
        // })
        // .then(function() {
        //     console.log("Now listening on partitions");
        //     done();
        // })
        // .error(function (e) {
        //     console.warn('Connection error: ', e);
        //     done(e);
        // });
    });
    
    seneca.add({role: pluginName, cmd: 'start'}, function(args, done) {
        // use factory function from AMQP-specific package
    });
    
    seneca.add({role: pluginName, cmd: 'test'}, function(args, done) {
        done(null, {success: "YES!"});
    });
    
    // seneca.add({role: 'pluginName', cmd: 'receiveMessage'}, function(args, done) {
    //     var msg = args.message,
    //         partition = args.partition;
        
    // });
    
    // seneca.add({role: 'pluginName', cmd: 'receiveError'}, function(args, done) {
    //     var error = args.error,
    //         partition = args.partition;
    // });
    
    // If you want to add any more routes, or override some route mapping
    // from the routes file, this is the place to do it.
    // routes.<command> = {GET: true};
    seneca.act('role:web',{
        use:{
            // define some routes that start with /my-api
            prefix: "/api/v1/status",
            // use action patterns where the role is web, the type is 'api'
            // and any command is given.
            pin: {role:pluginName,cmd:"*"},
            // Map each command to some HTTP method, and use the
            // query parameters as values for the action
            map: {
                test: {GET: true},
                start: {GET: true}
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