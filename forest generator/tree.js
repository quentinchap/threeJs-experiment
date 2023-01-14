class Tree {

    constructor(scene, minSize, maxSize, name, duration, rayon, center, ground, debug) {

        this.scene = scene;
        this.loader = new THREE.JSONLoader();
        this.raycaster = new THREE.Raycaster();
        this.dir = new THREE.Vector3(0, 1, 0);

        this.dir.normalize();



        this._minSize = minSize;
        this._maxSize = maxSize;


        this._name = name;

        this._duration = duration;

        this._rayon = rayon;

        this._debug = debug;

        this._tryToPlace = 0;

        this._ground = ground;

        this._center = center;


    }


    sign(p1, p2, p3) {
        return (p1.x - p3.x) * (p2.z - p3.z) - (p2.x - p3.x) * (p1.z - p3.z);
    }

    pointInTriangle(pt, v1, v2, v3) {
        var b1, b2, b3;

        b1 = this.sign(pt, v1, v2) < 0.0;
        b2 = this.sign(pt, v2, v3) < 0.0;
        b3 = this.sign(pt, v3, v1) < 0.0;

        return ((b1 == b2) && (b2 == b3));
    }


    calcY(p1, p2, p3, x, z) {
        var det = (p2.z - p3.z) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.z - p3.z);

        var l1 = ((p2.z - p3.z) * (x - p3.x) + (p3.x - p2.x) * (z - p3.z)) / det;
        var l2 = ((p3.z - p1.z) * (x - p3.x) + (p1.x - p3.x) * (z - p3.z)) / det;
        var l3 = 1.0 - l1 - l2;

        return l1 * p1.y + l2 * p2.y + l3 * p3.y;
    }

    placeTree(tree, minSize, maxSize, rayon) {
        this._tryToPlace += 1;
        var x = getRandomPos(rayon) + this._center.x;
        var z = getRandomPos(rayon) + this._center.z;

        var scale = getRandomInt(minSize, maxSize);
        tree.scale.set(scale, scale, scale);
        tree.position.set(x, 0, z);

        //console.log(this._ground.plane.geometry);

        for (var f of this._ground.plane.geometry.faces) {
            var treePos = tree.getWorldPosition();
            var v1 = this._ground.plane.geometry.vertices[f.a];
            var v2 = this._ground.plane.geometry.vertices[f.b];
            var v3 = this._ground.plane.geometry.vertices[f.c];


            if (this.pointInTriangle(treePos, v1, v2, v3)) {

                while (Math.round(this.calcY(v1,v2,v3,tree.position.x,tree.position.z)) > Math.round(tree.position.y)) {

                    tree.position.y += 0.5;
                }

            }
        }





    }

    collisionDetected(tree) {

        var treeBox = new THREE.Box3();

        treeBox.setFromObject(tree);

        for (var t of scene.children) {
            if (t.type == "SkinnedMesh") {
                var box = new THREE.Box3();
                box.setFromObject(t);
                if (box.intersectsBox(treeBox)) {
                    return true;
                }
            }
        }

        return false;
    }

    init(model) {
        var vm = this;
        this.loader.load(model, function (geometry, materials) {

            materials.skinning = true;

            for (var i of materials) {
                i.skinning = true;
            }

            vm.tree = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));

            if (vm._debug) {
                vm.helper = new THREE.SkeletonHelper(vm.tree);
                vm.helper.material.linewidth = 3;
                scene.add(vm.helper);
            }

            vm.tree.name = vm._name;
            vm.tree.castShadow = true;
            vm.tree.receiveShadow = true;

            vm.placeTree(vm.tree, vm._minSize, vm._maxSize, vm._rayon);

            if (vm._rx) {
                vm.tree.rotation.x += vm._rx;
            }
            if (vm._ry) {
                vm.tree.rotation.y += vm._ry;
            }
            if (vm._rz) {
                vm.tree.rotation.z += vm._rz;
            }

            if (name != 'pine 1') {
                var intersect = true;

                while (vm._tryToPlace < 10 && intersect) {

                    intersect = vm.collisionDetected(vm.tree);


                    if (!intersect) {

                        scene.add(vm.tree);
                    }
                    else {
                        if (vm._tryToPlace < 10) {
                            vm.placeTree(vm.tree, vm._minSize, vm._maxSize, vm._rayon);
                        }
                        else
                            return false;
                    }

                }

            }
            else {
                scene.add(vm.tree);
            }




            vm.mixer = new THREE.AnimationMixer(vm.tree);
            vm.action = vm.mixer.clipAction('ArmatureAction.001', vm.tree);
            vm.action.setDuration(vm._duration);
            vm.action.play();

        });
    }


    destroyTree() {
        this.scene.remove(this.cylinder);
        this.scene.remove(this.tree);
    }


    update(delta) {

        if (this.mixer) {
            delta = delta * 0.75;
            this.mixer.update(delta);
        }
        if (this.helper) {
            this.helper.update();
        }
    }

}
