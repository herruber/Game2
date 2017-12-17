(function () {

    var app = angular.module("Game");

    app.service("rendering", function (global) {

        var self = this;

        
        this.render = function () {
            requestAnimationFrame(self.render);

            //cube.rotation.x += 0.1;
            //cube.rotation.y += 0.1;
                    
            //global.mousePos is gotten whenever the mouse moves
            //cube.lookAt(global.mousePos);

            global.renderer.render(global.scene, global.camera);

        };


        this.initRendering = function()
        {
            var width = 600;
            var height = 600;

            global.scene = new THREE.Scene();
            //Make sure camera ratio uses same resolution as renderer size
            global.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
            global.camera.position.z = 5;

            global.renderer = new THREE.WebGLRenderer();
            global.renderer.setSize(width, height);

            var elemToAttach = document.getElementById("game-view");

            //Attach renderer to element
            document.getElementById("game-view").appendChild(global.renderer.domElement);
        
        }

    })
    
}())