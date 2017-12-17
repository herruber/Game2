(function () {

    var app = angular.module("Game", []);

    app.controller("GameController", function ($http, $scope, rendering, global, listeners) {
        $scope.depth = 0.5;

        $scope.initRendering = function()
        {

            rendering.initRendering();
            listeners.initListeners();

            //..When done begin render
            rendering.render();
        }

    })

}())