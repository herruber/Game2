(function () {

    var app = angular.module("Game");

    app.service("global", function () {

        var self = this;

        this.gameView = document.getElementById("game-view");
        this.mouseStart;
        this.mouseScreen;
        this.mouseWorld = new THREE.Vector3();
        this.mouseEnd;

        this.mode = 0;

        this.scene;
        this.renderer;
        this.camera;
        this.camSpeed = 0.1;

        this.lastObject; //Last added or edited object , aka target
    })

}())