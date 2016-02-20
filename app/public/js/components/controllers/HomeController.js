angular.module('isavewater_simulator')
.controller('HomeController', function($scope, settings, ISaveWaterAPI, $http, $mdToast) {
    // $scope.loaded = false;
    // $http.get('/api/v1/simulator/getConfig')
    //     .then(function(res) {
    //     console.log("areas = ", res.data[0]);
    //     $scope.areas = res.data[0];
    //     $scope.loaded = true;
    // }, function(res) {
    //     $scope.loaded = true;
    //     $mdToast.show($mdToast.simple().textContent(res.error));
    // });
    console.log(settings.getConfig());
    $scope.areas = settings.getConfig().areas;
    console.log("Config = ", settings.getConfig().areas);
    $scope.overcurrent = function(area, state) {
        $mdToast.show($mdToast.simple().textContent("Should have set overcurrent for area " + area.name + " to " + state));
    }
});