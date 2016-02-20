angular.module('isavewater_simulator')
.controller('LoadConfigController', function($scope, $http, $mdToast, $state, settings) {
    $scope.loadDefaultConfig = function() {
        $http.get('/api/v1/simulator/config?default=true')
            .then(function(res) {
                $mdToast.show($mdToast.simple().textContent("Loaded default config"));
                settings.setConfig(res.data.results[0]);
                console.log("res = ", res);
                console.log("Should've set settings to ", res.data.results[0]);
                $state.go('simulator');
            }, function(res) {
                console.log("error!", res);
                $mdToast.show($mdToast.simple().textContent(res.data.error));
            });
        
        // $http.get('/api/v1/config?default=true')
        // .success(function() {
        //     console.log("success");
        // }).error(function(err) {
        //     console.log("error encountered: )
        //     $mdToast.show($mdToast.simple().textContent(err));
        // })
    }
});