var TREE =
    {
        loader: {},
        trees: null,
        mixer: null,
        animation: null,

        Init: function (scene) {
            this.loader = new THREE.JSONLoader();
            this.trees = new Array();
            this.loader.load('assets/libs/tree.json', function (geometry, materials) {
                
                materials.skinning = true;

                for(var i of materials)
                {
                    i.skinning = true;
                }

                TREE.trees = new THREE.SkinnedMesh(geometry, new THREE.MultiMaterial(materials));
                TREE.trees.name = "pine";
                TREE.trees.castShadow = true;
                TREE.trees.receiveShadow = true;

                TREE.trees.scale.set(15, 15, 15);
                scene.add(TREE.trees);

                TREE.mixer = new THREE.AnimationMixer(TREE.trees);
                var action = TREE.mixer.clipAction('ArmatureAction.001', TREE.trees);
                action.play();

                /*var m = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
                m.scale.set(15, 15, 15);
                TREE.trees.push(m);
                scene.add(m);
                TREE.Animate(m);*/
            });
        },

        Animate: function (skinnedMesh) {
            console.log("animate");
            var materials = skinnedMesh.material.materials;

            for (var k in materials) {
                materials[k].skinning = true;
            }

            console.log(THREE.AnimationHandler);
            THREE.AnimationHandler.add(skinnedMesh.geometry.animation);
            this.animation = new THREE.Animation(skinnedMesh, "bones", THREE.AnimationHandler.CATMULLROM);
            this.animation.play();
        },

        Update: function (delta) {


            if (TREE.mixer) {
                //console.log(delta);
                delta = delta * 0.75;
                TREE.mixer.update(delta);
            }
        }

    };
