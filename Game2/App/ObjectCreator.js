(function () {

    var app = angular.module("Game");

    app.service("objectCreator", function (global) {

        var self = this;

        this.createObject = function(geometry, material, name)
        {
            debugger;
            var mat;
            var geom;
            var obj = new THREE.Object3D();

            if (material) {
                mat = material;
            }
            else {
                mat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            }

            if (geometry) {
                geom = geometry;
            }
            else {
                geom = new THREE.BoxGeometry(2, 2, 0.5);
            }

            var cmesh = new THREE.Mesh(geom, mat);

            if (name) {
                obj.name = name;
            }
            else {
                obj.name = "";
            }

            obj.add(cmesh);

            global.scene.add(obj);

            global.lastObject = obj;
        }

    })

}())