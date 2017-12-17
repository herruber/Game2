(function () {

    var app = angular.module("Game", []);

    app.controller("GameController", function ($http, $scope, rendering, global, listeners) {
        $scope.depth = 0.5;

        $scope.updatePosZ = function()
        {
            var test = global.lastObject.children[0];

            
                test.position.z = $scope.depth;
                //alert($scope.depth)
            
            
        }

        $scope.initRendering = function()
        {

            rendering.initRendering();
            listeners.initListeners();

            //..When done begin render
            rendering.render();
        }

    })

}())