'use strict';

angular.module('managementCenter.view2', ['ui.utils'])

.controller('View2Ctrl', ['$scope', function($scope) {
    $scope.blurCallback = function(evt) {
        alert("haha, input:" + evt.target.value);
    };
}]);