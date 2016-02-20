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
    $scope.areas = settings.getConfig().areas;
    $scope.loaded = true;
    angular.forEach($scope.areas, function(area) {
        // Set defaults for the areas.
        $scope.data = {};
        $scope.data.area = {};
        $scope.data.area[area.name] = {
            flow: {
                enabled: false,
                rate: 0
            }
        }
    });
    
    $scope.overcurrent = function(area, state) {
        console.log("Called overcurrent method!");
        var activate = state ? "activate" : "deactivate";
        var url = "/api/v1/simulator/" + activate;
        $http.post(url, {
            type: "overcurrent",
            area: area
        }).then(function(res){ 
            console.log("Posted to service for overcurrent", res);
            $mdToast.show($mdToast.simple().textContent("Should have set overcurrent for area " + area.name + " to " + state));
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent(res.error));
            state = !state;
        });
    }

    $scope.flow = function(area, state) {
        console.log("Called flow method!");
        var activate = state ? "activate" : "deactivate";
        var url = "/api/v1/simulator/" + activate;
        $http.post(url, {
            type: "flow",
            area: area
        }).then(function(res){ 
            console.log("Posted to service for flow", res);
            $mdToast.show($mdToast.simple().textContent("Should have set flow for area " + area.name + " to " + state));
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent("Unable to set flow to state", state));
            state = !state;
        });
    }
    
    $scope.zoneFn = function(zone, state) {
        console.log("Called flow method!");
        var activate = state ? "activate" : "deactivate";
        var url = "/api/v1/simulator/" + activate;
        $http.post(url, {
            type: "zone",
            zone: zone
        }).then(function(res){ 
            console.log("Posted to service for zone", res);
            $mdToast.show($mdToast.simple().textContent("Should have set " + zone.name + " to " + state));
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent("Unable to set " + zone.name + " to state", state));
            state = !state;
        });
    }
    
    $scope.flowRate = function(area, rate) {
        console.log("Called flow method!");
        var activate = "activate";
        var url = "/api/v1/simulator/" + activate;
        $http.post(url, {
            type: "flow",
            area: area,
            rate: rate
        }).then(function(res){ 
            console.log("Posted to service for flow", res);
            $mdToast.show($mdToast.simple().textContent("Should have set flow rate for area " + area.name + " to " + rate));
        }, function(res) {
            $mdToast.show($mdToast.simple().textContent("Unable to set flow rate"));
        });
    }
    
});