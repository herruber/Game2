(function () {

    var app = angular.module("Game");

    app.service("listeners", function (global, objectCreator) {

        var self = this;

        this.mousedown = function(event)
        {
            var div = document.createElement('div');
            div.innerHTML = '<button>Fill</button>';
            div.className += 'csettings';
            document.getElementById("build-menu").appendChild(div);

            var skit = new THREE.BoxGeometry(2, 2, 0.25);

            switch (global.mode) {
                case 0:
                    objectCreator.createObject(null, null, "bajs");
                    break;
                default:

            }

        }

        this.mouseup = function(event)
        {

        }

        mouseWorld = function (event) {
            var mouse = new THREE.Vector3();

            mouse.x = ((event.clientX - global.renderer.domElement.offsetLeft) / global.renderer.domElement.width) * 2 - 1;
            mouse.y = -((event.clientY - global.renderer.domElement.offsetTop) / global.renderer.domElement.height) * 2 + 1;
            mouse.z = 0.5;

            return mouse;
        }

        this.mousemove = function(event)
        {
            global.mouseScreen = new THREE.Vector3(event.clientX, event.clientY, 0);
            global.mouseWorld = mouseWorld(event);
            console.log("mouseworld = " + global.mouseWorld.toString() + " , mouseScreen = " + global.mouseScreen.toString());
        }

        this.initListeners = function()
        {

            //document.getElementById("game-view").addEventListener("mousedown", self.mousedown, false);
            //document.getElementById("game-view").addEventListener("mousemove", self.mousemove, false);

            //Add listeners to the renderers dom element for accurate window precision
            //Adding to div element will not guarantee that the div is the size of the visible area
            global.renderer.domElement.addEventListener("mousemove", self.mousemove, false);
            global.renderer.domElement.addEventListener("mousedown", self.mousedown, false);
        }

    })

}())