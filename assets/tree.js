/*var TREE =
    {
        loader: {},
        trees: null,
        mixer: null,
        animation: null,
        action: null,
        Init: function (scene,scale,name,duration,x,y,z) {
            this.loader = new THREE.JSONLoader();
            this.trees = new Array();
            this.loader.load('assets/libs/tree.json', function (geometry, materials) {
                
                materials.skinning = true;

                for(var i of materials)
                {
                    i.skinning = true;
                }

                TREE.trees = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));
                TREE.trees.name = name;
                TREE.trees.castShadow = true;
                TREE.trees.receiveShadow = true;

                TREE.trees.scale.set(scale, scale, scale);
                TREE.trees.position.set(x,z,y);
                scene.add(TREE.trees);

                TREE.mixer = new THREE.AnimationMixer(TREE.trees);
                TREE.action = TREE.mixer.clipAction('ArmatureAction.001', TREE.trees);
                TREE.action.setDuration(duration);
                TREE.action.play();

            });
            return this;
        },
        Update: function (delta) {
            if (TREE.mixer) {
                delta = delta * 0.75;
                TREE.mixer.update(delta);
            }
        }

    };*/




class TREE {

    constructor(scene, scale, name, duration, x, y, z, rx, ry, rz) {
        var vm = this;
        this.loader = new THREE.JSONLoader();
        this.trees = new Array();
        this.loader.load('assets/libs/tree.json', function (geometry, materials) {

            materials.skinning = true;

            for (var i of materials) {
                i.skinning = true;
            }

            vm.trees = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));
            vm.trees.name = name;
            vm.trees.castShadow = true;
            vm.trees.receiveShadow = true;

            vm.trees.scale.set(scale, scale, scale);
            vm.trees.position.set(x, z, y);

            if (rx) {
                vm.trees.rotation.x += rx;
            }
            if (ry) {
                vm.trees.rotation.y += ry;
            }
            if (rz) {
                vm.trees.rotation.z += rz;
            }

            //vm.trees.rotation.set(rx,rz,ry);
            scene.add(vm.trees);

            vm.mixer = new THREE.AnimationMixer(vm.trees);
            vm.action = vm.mixer.clipAction('ArmatureAction.001', vm.trees);
            vm.action.setDuration(duration);
            vm.action.play();

        });
        return this;
    }

    SetMixer(trees) {

    }

    Update(delta) {
        if (this.mixer) {
            delta = delta * 0.75;
            this.mixer.update(delta);
        }
    }

}
