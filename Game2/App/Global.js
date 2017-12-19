(function () {

    var app = angular.module("Game");

    app.service("global", function () {

        var self = this;
        this.objectview = document.getElementById("object-view");

        this.gameView = document.getElementById("game-view");
        this.mouseStart;
        this.mouseScreen;
        this.mouseWorld = new THREE.Vector3();
        this.mouseEnd;

        this.mode = 0;

        this.scene;
        this.renderer;
        this.rendererFront;
        this.rendererLeft;

        this.movecam = false;

        this.camera;

        this.cameraLeft;
        this.cameraFront;

        this.camSpeed = 0.1;

        this.Target; //= new THREE.Object3D(); //Last added or edited object , aka target
        this.testing = "";

        this.objLoader = new THREE.OBJLoader();

        this.getTarget = function()
        {
            return self.Target;
        }

    })

}())