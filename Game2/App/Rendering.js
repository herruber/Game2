(function () {

    var app = angular.module("Game");

    app.service("rendering", function (global) {

        var self = this;

        this.logic = function()
        {
             
        }
        
        this.render = function () {
            requestAnimationFrame(self.render);

            //cube.rotation.x += 0.1;
            //cube.rotation.y += 0.1;
                    
            //global.mousePos is gotten whenever the mouse moves
            //cube.lookAt(global.mousePos);

            self.logic();

            global.renderer.render(global.scene, global.camera);
            global.rendererFront.render(global.scene, global.cameraFront);
            global.rendererLeft.render(global.scene, global.cameraLeft);
        };


        this.initRendering = function()
        {
            var width = 1600;
            var height = 600;

            var hwidth = 800;
            var hheight = 300;

            global.scene = new THREE.Scene();
            //Make sure camera ratio uses same resolution as renderer size
            global.camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
            global.camera.position.z = 5;

            global.cameraLeft = global.cameraFront = new THREE.OrthographicCamera(hwidth / -2, hwidth / 2, hheight / 2, hheight / -2, 1, 1000);            
            global.cameraLeft.position.z = global.cameraFront.position.z = 5;

            global.renderer = new THREE.WebGLRenderer();
            global.rendererFront = new THREE.WebGLRenderer();
            global.rendererLeft = new THREE.WebGLRenderer();

            global.renderer.setSize(width, height);
            global.rendererFront.setSize(hwidth, hheight);
            global.rendererLeft.setSize(hwidth, hheight);

            var elemToAttach = document.getElementById("game-view");

            //Attach renderer to element
            document.getElementById("game-view").appendChild(global.renderer.domElement);
            document.getElementById("view-left").appendChild(global.rendererLeft.domElement);
            document.getElementById("view-right").appendChild(global.rendererFront.domElement);
        
        }

    })
    
}())