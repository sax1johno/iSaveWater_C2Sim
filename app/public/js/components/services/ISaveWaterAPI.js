angular.module('isavewater_simulator')
.factory('ISaveWaterAPI', function(settings) {
    var SimulatorService = {
        getAreas: function(areasCallback) {
            // $http({
            //     method: "GET",
            //     url: "/areas"
            // }).success(function(data, status, headers, config) {
            //     areasCallback(undefined, data);
            // }).
            //   error(function(data, status, headers, config) {
            //       areasCallback(data);
            //   });
        }
        // submitAccountInfo: function(accountInfo, submitCompleteFn) {
        //     var params = {
        //         apikey: settings.APIKEY,
        //         accountDetails: accountInfo
        //     }
        //     $http({
        //         method: "POST",
        //         url: settings.APIURL() + '/account/create',
        //         data: params
        //     }).
        //       success(function(data, status, headers, config) {
        //         if (data.failure) {
        //             $log.log(data.failure);
        //             submitCompleteFn(data.failure);
        //         } else {
        //             if (data.success) {
        //                 submitCompleteFn(undefined, data.success);
        //             } else {
        //                 submitCompleteFn(data);
        //             }
        //         }
        //       }).
        //       error(function(data, status, headers, config) {
        //           $log.log("error: " + data);
        //           submitCompleteFn(data);
        //       });
        // },
    };
    return SimulatorService;    
});