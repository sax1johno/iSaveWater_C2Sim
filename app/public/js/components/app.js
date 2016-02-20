angular.module('isavewater_simulator', ['ngMaterial', "ui.router"])
.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    // console.log("Made it to config");
    
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("loadConfig", {
            url: "/",
            templateUrl: "/partial/_loadConfig",
            // template: "<h1>This should render</h1>",
            controller: "LoadConfigController"
        })
        .state("simulator", {
            url: "/simulator",
            templateUrl: "/partial/_home",
            controller: "HomeController"
        })
        .state("status", {
            url: "/status",
            templateUrl: "/partial/_status",
            controller: "StatusController"
        })
});