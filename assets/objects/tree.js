class Tree {

    constructor(scene, scale, name, duration, x, y, z, rx, ry, rz) {
        var vm = this;
        this.scene = scene;
        this.loader = new THREE.JSONLoader();
        this.loader.load('assets/3DModels/tree.json', function (geometry, materials) {

            materials.skinning = true;

            for (var i of materials) {
                i.skinning = true;
            }

            vm.tree = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));
            vm.tree.name = name;
            vm.tree.castShadow = true;
            vm.tree.receiveShadow = true;

            vm.tree.scale.set(scale, scale, scale);
            vm.tree.position.set(x, z, y);

            if (rx) {
                vm.tree.rotation.x += rx;
            }
            if (ry) {
                vm.tree.rotation.y += ry;
            }
            if (rz) {
                vm.tree.rotation.z += rz;
            }
            scene.add(vm.tree);

            vm.mixer = new THREE.AnimationMixer(vm.tree);
            vm.action = vm.mixer.clipAction('ArmatureAction.001', vm.tree);
            vm.action.setDuration(duration);
            vm.action.play();

        });
        return this;
    }

    destroyTree()
    {
        this.scene.remove(this.tree);
    }


    update(delta) {
        if (this.mixer) {
            delta = delta * 0.75;
            this.mixer.update(delta);
        }
    }

}
