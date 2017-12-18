(function () {

    var app = angular.module("Game");

    app.service("objectCreator", function (global) {

        var self = this;


        global.gameView.ondragover = function (event) { event.preventDefault(); };

        global.gameView.ondrop = function (event) {
            event.preventDefault();

            var data = event.dataTransfer.getData("text");
            event.target.innerText = document.getElementById(data).innerText;

            alert(document.getElementById(data).innerText)
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

            alert(actor)

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

                    var op1 = document.createElement('div');
                    op1.id = op1;
                    op1.innerText = "test1";
                    op1.className += "input-type";

                    var op2 = document.createElement('div');
                    op2.innerText = "test2";

                    var op3 = document.createElement('div');
                    op3.innerText = "test3";

                    op1.draggable = true;

                    op1.ondragstart = function(event)
                    {
                        event.dataTransfer.setData("text", event.target.id);

                    }


                    div.appendChild(op1);
                    div.appendChild(op2);
                    div.appendChild(op3);
                    
                    document.getElementById("build-menu").appendChild(div);
                    break;
                default:

            }



        }

        //Functions inside here
    })

    

}())