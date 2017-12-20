(function () {

    var app = angular.module("Game");

    app.service("objectCreator", function (global) {

        var self = this;

        this.uniqueCounter = 0;
        var filecounter = 0;


        global.gameView.ondragover = function (event) { event.preventDefault(); };

        //On drop
        global.gameView.ondrop = function (event) {
            event.preventDefault();

            var data = event.dataTransfer.getData("text");
            //event.target.innerText = document.getElementById(data).innerText;

            //alert(document.getElementById(data).innerText)

            //WHen dropping a property on the canvas assign it to current actor
            var elementToDrop = document.getElementById(data);

            var properties = elementToDrop.getElementsByTagName('input');
            var children = elementToDrop.childNodes;

            var ccActor = global.Target;
            //The property object to assign to the actor

            //Push the element to the userdata
            //TODO!! link properties to controls ex. width, height etc
            ccActor.userData.properties.push(elementToDrop);

            alert(ccActor.userData.properties[0] + " " + ccActor.userData.properties[0].childElementCount);
        }

        this.loadNextMesh = function(files)
        {
            var reader = new FileReader();

            if (filecounter < files.length) {
                reader.onload = function () {
                    var astext = reader.result;
                    var material = new THREE.MeshBasicMaterial({ color: 'yellow', side: THREE.DoubleSide });
                    var cmesh = global.objLoader.parse(astext);

                    for (var c = 0; c < cmesh.children.length; c++) {
                        cmesh.children[c].material = material;
                    }

                    cmesh.userData =
                {
                    properties: []
                }
                    global.scene.add(cmesh);

                    global.Target = cmesh;

                    filecounter++;

                    if (filecounter < files.length) {
                        self.loadNextMesh(files);
                    }
                    else {
                        document.getElementById("files").value = "";
                    }
                }

                reader.onerror = function () {
                    alert("an error occured")
                }

                reader.readAsText(files[filecounter]);
            }
        }

        this.loadMesh = function()
        {
            filecounter = 0;
            var files = document.getElementById("files").files;
            self.loadNextMesh(files);

        }

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

        this.createActor = function () {
            var cBajsen = new THREE.Object3D();
            cBajsen.userData =
                {
                    properties: []
                }
            global.Target = cBajsen;

        }

        this.addProperty = function(data)
        {

        }

        

        //Functions inside here
    })

    

}())