/**
 * Runs a microservice that runs tasks on a schedule.
 **/
var nts = require('node-task-scheduler'),
    _ = require('underscore');

module.exports = function(options) {
    var pluginName = "simulator";
    
    var seneca = this;
    
    var scheduler;
    
    options = seneca.util.deepextend({
    },options);

    seneca.add({init:pluginName}, function(args, done) {
        scheduler = nts.init({
            // options go here.
        });
        
        // scheduler.start(function(args.tasks){
        //   console.log("Tasks loaded:");
        //   tasks.forEach(function(taskName){
        //     console.log(taskName);
        //   });
        // });
        
    });
    
    /**
     * Takes the following arguments:
     * name
     * taskArguments
     * command
     **/
    seneca.add({'role': pluginName, 'cmd': 'add'}, function(args, done) {
        // scheduler.addTask(
        //     args.name,
        //     args.taskArguments,
        //     function(taskArgs, taskCb) {
        //         var command;
        //         seneca.act(args.command
        //     }, args.schedule, args.endDate)
        seneca.log.debug("Called the scheduler add command");
        done();
    });
    
    seneca.add({'role': pluginName, 'cmd': 'remove'}, function(args, done) {
        // scheduler.removeTask(args.taskName, function(){
        //   console.log("In next execution, the task will not be executed and the task will be removed from scheduler.");
        //   done(null, {message: "In next execution, the task will not be executed and the task will be removed from scheduler."});
        // });
        seneca.log.debug("Should have removed", args.taskName);
        done();
    });


    seneca.add({"role": pluginName, cmd: "clear"}, function(args, done) {
        seneca.log.debug("Should have cleared all tasks");
        done();
    });
    
    seneca.add({'role': pluginName, 'cmd': 'list'}, function(args, done) {
        seneca.log.debug("Should list all existing tasks");
        done();
    });
    
    // Get the status of a named task
    seneca.add({'role': pluginName, 'cmd': 'status'}, function(args, done) {
        // var resp = {
            
        // };
        
        // resp[args.name] = scheduler.haveTask(args.name);
        // done(null, resp);
        
        seneca.log.debug("task is working");
        done();        
        // if(scheduler.haveTask(args.name)){
        // //   console.log("The task 'hello' is running.");
        // }else{ 
        // //   console.log("The task 'hello' is not running.");
        // }
    })
        // add a task to execute each minute, for 1 hour.
        // scheduler.addTask('hello', {hello: "world!"}, function(args, callback){
        //   console.log("Hello ", args.hello);
        
        //   callback();
        // }, '0 * * * * *', (new Date(Date.now() + 3600000)));
    
};