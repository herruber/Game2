(function () {

    var app = angular.module("Game", []);

    app.controller("GameController", function ($http, $scope, rendering, global, listeners, objectCreator) {

        $scope.depth = 0.5;
        $scope.camSpeed = 0.1;

        $scope.createActor = function()
        {
            global.mode = 1;
            objectCreator.createActor("test", $scope);
        }

        $scope.updatePosZ = function()
        {
            var test = global.lastObject.children[0];

                test.position.z = $scope.depth;
                //alert($scope.depth)
                        
        }

        $scope.updateCamSpeed = function()
        {
            if ($scope.camSpeed) {
                global.camSpeed = $scope.camSpeed;
            }
            else {

            }
            
            console.log(global.camSpeed)
        }

        $scope.initRendering = function()
        {

            rendering.initRendering();
            listeners.initListeners();
            objectCreator.createMenu(0);

            //..When done begin render
            rendering.render();
        }

    })

}())