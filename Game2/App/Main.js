(function () {

    var app = angular.module("Game", ['ngSanitize']);

    app.controller("GameController", function ($http, $scope, rendering, global, listeners, objectCreator) {

        $scope.depth = 0.5;
        $scope.camSpeed = 0.1;
        $scope.filesToLoad = "";
        $scope.activeObject = false;
        $scope.globals = global;
        $scope.Target;

        $scope.objname = "";

        $scope.menus =
            {
                menu: 0,
                visible: true
            };

        $scope.arraytest =
            [
                "hej",
                "asd",
                "dsa",
                "ffff"
            ]

        $scope.recreateProperty = function(prop)
        {
            alert(prop);

            document.getElementById()
        }

        $scope.getProperties = function()
        {
            $http({
                url: "/Game/GetHtmlContent",
                method: "GET"
            }).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available

                var data = response.data;

                for (var d = 0; d < data.length; d++) {
                    document.getElementById("build-menu").innerHTML += data[d];
                }
                
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        $scope.getMenus = function () {
            $http({
                url: "/Game/GetHtmlMenus",
                method: "GET"
            }).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available

                document.getElementById("build-menu").innerHTML += response.data;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }

        $scope.swapVisibility = function(elem)
        {

            for (var i = 0; i < elem.children.length; i++) {
                var cchild = elem.children[i];

                if (cchild.id && cchild.id.indexOf("pvalues") > -1) {

                    if (cchild.style.display == 'none') {
                        cchild.style.display = 'initial';
                    }
                    else {
                        cchild.style.display = 'none';
                    }
                }
            }
            
        }

        this.swapMenu = function (menu) {

            var menucontainer = document.getElementById("build-menu");

            
        }

        $scope.setName = function()
        {
            global.Target.name = $scope.objname;
        }

        $scope.getTargetData = function()
        {
            debugger;
            if (global.Target) {

                for (var i = 0; i < global.Target.userData.properties.length; i++) {
                    console.log(global.Target.userData.properties[i])
                }

                return global.Target.userData.properties;
            }
            else {
                return [];
            }
            
        }

        $scope.$watch(function () {

            if (angular.isDefined(global) && global.Target) {
                return global.getTarget().uuid;
            }
        },
              function (newVal, oldVal) {

                  if (angular.isDefined(newVal)) {

                      console.log(newVal)

                      if (newVal) {
                          $scope.activeObject = true;
                          $scope.Target = global.Target;
                          alert($scope.Target)
                      }
                      else {
                          $scope.activeObject = false;
                      }
                  }                 
              },true
             );

        $scope.createActor = function()
        {
            global.mode = 0;
            objectCreator.createActor();
        }

        $scope.loadFiles = function()
        {          
            objectCreator.loadMesh();
        }

        $scope.updatePosZ = function()
        {
            var test = global.lastObject.children[0];

                test.position.z = $scope.depth;
                //alert($scope.depth)
                        
        }

        $scope.fileChange = function()
        {
            alert("files changed")
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
            $scope.getProperties();
            //objectCreator.createMenu(0);

            //..When done begin render
            rendering.render();
        }

    })

}())