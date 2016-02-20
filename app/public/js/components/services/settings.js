angular.module('isavewater_simulator')
.factory('settings', function() {
    var settings = {};
    
    var setConfig = function(config) {
        settings.config = config;
    }
    
    var getConfig = function() {
        return settings.config;
    }
    
    return {
        getConfig: getConfig,
        setConfig: setConfig
    };
});