class Tree {

    constructor(scene, minSize, maxSize, name, duration, rayon ,debug) {
        console.log(name);

        this.scene = scene;
        this.loader = new THREE.JSONLoader();


        this._minSize = minSize;
        this._maxSize = maxSize;
        

        this._name = name;

        this._duration = duration;

        this._rayon = rayon;

        this._debug = debug;

    }

    init()
    {
        var vm = this;
        this.loader.load('assets/3DModels/tree.json', function (geometry, materials) {

            materials.skinning = true;

            for (var i of materials) {
                i.skinning = true;
            }

            vm.tree = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));
            
            if(vm._debug)
            {
                vm.helper = new THREE.SkeletonHelper( vm.tree );
                vm.helper.material.linewidth = 3;
                scene.add( vm.helper );
            }

            vm.tree.name = name;
            vm.tree.castShadow = true;
            vm.tree.receiveShadow = true;

            var scale = getRandomInt(vm._minSize,vm._maxSize);
            vm.tree.scale.set(scale, scale, scale);

            vm.tree.position.set(getRandomPos(vm._rayon), 0, getRandomPos(vm._rayon));


            if (vm._rx) {
                vm.tree.rotation.x += vm._rx;
            }
            if (vm._ry) {
                vm.tree.rotation.y += vm._ry;
            }
            if (vm._rz) {
                vm.tree.rotation.z += vm._rz;
            }
            
            var treeBox = new THREE.Box3();
            treeBox.setFromObject(vm.tree);

            if(name != 'pine 1')
            {
                var intersect = false;
                for(var t of scene.children)
                {
                    console.log(t);
                    if(t.type == "SkinnedMesh")
                    {
                        var box = new THREE.Box3();
                        box.setFromObject(t);
                        console.log(t.type,box,box.intersectsBox(treeBox));
                        if(box.intersectsBox(treeBox))
                        {
                            intersect = true
                        }
                    }
                }

                if(!intersect)
                {
                    if(vm._debug)
                    {
                        var box = new THREE.BoxHelper( vm.tree, 0xffff00 );
                        scene.add( box );
                    }

                    scene.add(vm.tree);
                }
                else
                {
                    return false;
                }
            }
            else
            {
                if(vm._debug)
                {
                    var box = new THREE.BoxHelper( vm.tree, 0xffff00 );
                    scene.add( box );
                }
                scene.add(vm.tree);
            }




            vm.mixer = new THREE.AnimationMixer(vm.tree);
            vm.action = vm.mixer.clipAction('ArmatureAction.001', vm.tree);
            vm.action.setDuration(vm._duration);
            vm.action.play();

        });
    }


    destroyTree()
    {
        this.scene.remove(this.cylinder);
        this.scene.remove(this.tree);
    }


    update(delta) {
        if (this.mixer) {
            delta = delta * 0.75;
            this.mixer.update(delta);
        }
        if(this.helper)
        {
            this.helper.update();
        }
    }

}
