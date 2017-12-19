(function () {

    var app = angular.module("Game");

    app.service("objectCreator", function (global) {

        var self = this;

        this.uniqueCounter = 0;

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

            var cActor = global.lastObject;
            //The property object to assign to the actor

            //Push the element to the userdata
            //TODO!! link properties to controls ex. width, height etc
            cActor.userData.properties.push(elementToDrop);

            alert(cActor.userData.properties[0] + " " + cActor.userData.properties[0].childElementCount);
        }

        this.loadMesh = function()
        {

            var files = document.getElementById("files").files;
            var reader = new FileReader();

            for (var f = 0; f < files.length; f++) {
               
                reader.onload = function()
                {
                    var astext = reader.result;

                    var cmesh = global.objLoader.parse(astext);
                    global.scene.add(cmesh);
                    var bbox = new THREE.Box3().setFromObject(cmesh);

                    var max = bbox.max.z * 2;
                    var cam = global.camera;

                    cam.position.set(cam.x, cam.y, 100);

                    alert("loaded a mesh " + max)
                    debugger;
                }

                reader.onerror = function()
                {
                    alert("an error occured")
                }
               
                reader.readAsText(files[f]);

                
            }

            
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

        this.createActor = function (name) {
            var actor = new THREE.Object3D();

            self.createMenu(1); //Map properties

            if (name) {
                actor.name = name;
            }

            var prop =
                {
                    properties: [],
                    controls: []
                }

            actor.userData = prop;

            global.lastObject = actor;

        }

        this.addProperty = function(data)
        {

        }

        this.createMenu = function (menu, scope) {

            var oldmenu = document.getElementById("build-menu");

            //remove old menu
            while (oldmenu.firstChild) {
                oldmenu.removeChild(oldmenu.firstChild);
            }

            switch (menu) {
                case 0: //Create base menu
                    var div = document.createElement('div');
                    var but = document.createElement('button');
                    but.innerText = "Actor"
                    but.className += 'build-menu-base';
                    div.id = "menu-container";
                    but.onclick = function () { self.createActor() };

                    div.appendChild(but);
                    document.getElementById("build-menu").appendChild(div);
                    break;

                case 1:
                    var div = document.createElement('div');
                    div.id = "menu-container";

                    //Hold all property types
                    var properties = 
                        [
                            "slider",
                            "number",
                        ]


                    
                    for (var p = 0; p < properties.length; p++) {

                        //Create the type div, main div for each property
                        var propertyType = document.createElement('div');
                        propertyType.id = "op-" + p;
                        propertyType.innerHTML = properties[p] + "<br>";
                        propertyType.className += "input-type";

                        propertyType.draggable = true;


                        propertyType.ondragstart = function (event) {
                            event.dataTransfer.setData("text", event.target.id);
                        }

                        //Create all input elements
                        var inputname = document.createElement('input');
                        var min = document.createElement('input');
                        var max = document.createElement('input');
                        var step = document.createElement('input');

                        
                        inputname.type = "text";
                        min.type = "number";
                        max.type = "number";
                        step.type = "number";

                        inputname.id = "nameInput-" + p
                        min.id = "minInput-" + p;
                        max.id = "maxInput-" + p;
                        step.id = "stepInput-" + p;

                        inputname.name = "inputname";
                        min.name = "inputmin";
                        max.name = "inputmax";
                        step.name = "inputstep";

                        //Create all labels for each input field
                        var labelname = document.createElement('label');
                        labelname.innerText = "name: ";
                        var labelmin = document.createElement('label');
                        labelmin.innerText = "min: ";
                        var labelmax = document.createElement('label');
                        labelmax.innerText = "max: ";
                        var labelstep = document.createElement('label');
                        labelstep.innerText = "step: ";

                        //Append each property to each label
                        labelname.appendChild(inputname);
                        labelmin.appendChild(min);
                        labelmax.appendChild(max);
                        labelstep.appendChild(step)

                        //Add all labels with properties to the main div
                        propertyType.appendChild(labelname);
                        propertyType.appendChild(document.createElement("br"));
                        propertyType.appendChild(labelmin);
                        propertyType.appendChild(labelmax);
                        propertyType.appendChild(document.createElement("br"));
                        propertyType.appendChild(labelstep);

                        div.appendChild(propertyType);
                        
                    }
                    
                    document.getElementById("build-menu").appendChild(div);
                    break;
                default:

            }



        }

        //Functions inside here
    })

    

}())