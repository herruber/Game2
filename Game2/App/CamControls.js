(function () {

    var app = angular.module("Game");

    app.service("camcontrols", function (global) {

        var self = this;

        this.rotate = function()
        {
            console.log(global.mouseWorld.x);
            global.camera.lookAt(global.mouseWorld);
        }

        this.move = function(x, y, z)
        {


            if (x != 0) {
                global.camera.translateX(x);
            }

            if (y != 0) {
                global.camera.translateY(y);
            }

            if (z != 0) {
                global.camera.translateZ(z);
            }


            self.rotate();

        }

    })

}())