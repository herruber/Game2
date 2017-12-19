(function () {

    var app = angular.module("Game", []);

    app.controller("GameController", function ($http, $scope, rendering, global, listeners, objectCreator) {

        $scope.depth = 0.5;
        $scope.camSpeed = 0.1;
        $scope.filesToLoad = "";
        $scope.activeObject = false;
        $scope.globals = global;

        $scope.objname = "";

        $scope.menus =
            {
                menu: 0,
                visible: true
            };

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

        this.swapMenu = function (menu) {

            var menucontainer = document.getElementById("build-menu");

            switch (menu) {
                case 0: //Create base menu
                    $scope.menus[0]
                    break;

                case 1:
                    var div = document.createElement('div');
                    div.id = "menu-container";

                    //Hold all property types
                    var properties =
                        [
                            "slider",
                            "number",
                        ]



                    for (var p = 0; p < properties.length; p++) {

                        //Create the type div, main div for each property
                        var propertyType = document.createElement('div');
                        propertyType.id = "op-" + p;
                        propertyType.innerHTML = properties[p] + "<br>";
                        propertyType.className += "input-type";

                        propertyType.draggable = true;


                        propertyType.ondragstart = function (event) {
                            event.dataTransfer.setData("text", event.target.id);
                        }

                        //Create all input elements
                        var inputname = document.createElement('input');
                        var min = document.createElement('input');
                        var max = document.createElement('input');
                        var step = document.createElement('input');


                        inputname.type = "text";
                        min.type = "number";
                        max.type = "number";
                        step.type = "number";

                        inputname.id = "nameInput-" + p
                        min.id = "minInput-" + p;
                        max.id = "maxInput-" + p;
                        step.id = "stepInput-" + p;

                        inputname.name = "inputname";
                        min.name = "inputmin";
                        max.name = "inputmax";
                        step.name = "inputstep";

                        //Create all labels for each input field
                        var labelname = document.createElement('label');
                        labelname.innerText = "name: ";
                        var labelmin = document.createElement('label');
                        labelmin.innerText = "min: ";
                        var labelmax = document.createElement('label');
                        labelmax.innerText = "max: ";
                        var labelstep = document.createElement('label');
                        labelstep.innerText = "step: ";

                        //Append each property to each label
                        labelname.appendChild(inputname);
                        labelmin.appendChild(min);
                        labelmax.appendChild(max);
                        labelstep.appendChild(step)

                        //Add all labels with properties to the main div
                        propertyType.appendChild(labelname);
                        propertyType.appendChild(document.createElement("br"));
                        propertyType.appendChild(labelmin);
                        propertyType.appendChild(labelmax);
                        propertyType.appendChild(document.createElement("br"));
                        propertyType.appendChild(labelstep);

                        div.appendChild(propertyType);

                    }

                    document.getElementById("build-menu").appendChild(div);
                    break;
                default:

            }
        }

        $scope.setName = function()
        {
            global.Target.name = $scope.objname;
        }

        $scope.$watch(function () {

            if (angular.isDefined(global)) {
                return global.getTarget().uuid;
            }
        },
              function (newVal, oldVal) {

                  if (angular.isDefined(newVal)) {
                      console.log(newVal)
                      var name = document.getElementById("object-name");
                      name.value = global.Target.name;

                      if (newVal) {
                          $scope.activeObject = true;
                      }
                      else {
                          $scope.activeObject = false;
                      }
                  }                 
              },
              true
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