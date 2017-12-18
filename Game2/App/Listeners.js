(function () {

    var app = angular.module("Game");

    app.service("listeners", function (global, objectCreator, camcontrols) {

        var self = this;

        this.keysDown = [];
        this.keysUp = [];
        this.btnsDown = [];
        this.btnsUp = [];

        var leftclick = function(event)
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

        var rightclick = function(event)
        {
            if (event.shiftKey) {
                global.mode = 99; //camera orbit

            }

        }

        this.keydown = function(event)
        {
            self.keysDown[event.key] = event.type == 'keydown';

            if (event.key == "w" && global.mode == 99) {
                camcontrols.move(0, 0, -global.camSpeed);
            }

            if (event.key == "a" && global.mode == 99) {
                camcontrols.move(-global.camSpeed, 0, 0);
            }

            if (event.key == "s" && global.mode == 99) {
                camcontrols.move(0, 0, global.camSpeed);
            }

            if (event.key == "d" && global.mode == 99) {
                camcontrols.move(global.camSpeed, 0, 0);
            }

            if (event.key == " " && global.mode == 99) {
                camcontrols.move(0, global.camSpeed, 0);
            }

            if (event.ctrlKey && global.mode == 99) {
                camcontrols.move(0, -global.camSpeed, 0);
            }


        }

        this.keyup = function(event)
        {

        }

        this.mousedown = function(event)
        {

            switch (event.button) {
                case 0:
                    leftclick(event);
                    break;
                case 1:
                    alert("scroll")
                    break;
                case 2:
                    rightclick(event);
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
            
            switch (global.mode) {
                case 99: //Camera orbit
                    camcontrols.rotate();
                    break;
                default:

            }
        }

        this.initListeners = function()
        {

            //Add listeners to the renderers dom element for accurate window precision
            //Adding to div element will not guarantee that the div is the size of the visible area

            document.addEventListener("keydown", self.keydown, false);
            document.addEventListener("keyup", self.keyup, false);


            global.renderer.domElement.addEventListener("mousedown", self.mousedown, false);
            global.renderer.domElement.addEventListener("mouseup", self.mouseup, false);

            global.renderer.domElement.addEventListener("mousemove", self.mousemove, false);

        }

    })

}())