(function () {

    var app = angular.module("Game");

    app.service("global", function () {

        var self = this;

        this.mouseStart;
        this.mouseScreen;
        this.mouseWorld;
        this.mouseEnd;

        this.mode = 0;

        this.scene;
        this.renderer;
        this.camera;

        this.lastObject; //Last added or edited object , aka target
    })

}())