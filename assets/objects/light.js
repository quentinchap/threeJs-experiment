class Light {

    refresh() {
        for (var l of this.lights)
            if (l.active) {
                console.log(l);
                scene.add(l.object);
            }
            else {
                console.error(l);
                scene.remove(l.object);
            }
    }

    constructor(scene, camera, debug) {

        var x = 100;
        var y = 500;

        var hemisphereLight = new THREE.HemisphereLight(0xD0E2E7, 0xf7d9aa, .9)
        hemisphereLight.name = 'ambientLight';
        //hemisphereLight.intensity= 5;

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(x, 500, y);
        directionalLight.target.position.set(0, 1000, 0);
        directionalLight.castShadow = true;
        


        //directionalLight.shadow = new THREE.LightShadow(camera);
        //directionalLight.shadow.bias = 0.0001;
        //light.shadow.mapSize.width = 4000;
        //light.shadow.mapSize.height = 4000;
        //scene.add(light);



        directionalLight.shadow.camera.left = -400;
        directionalLight.shadow.camera.right = 400;
        directionalLight.shadow.camera.top = 400;
        directionalLight.shadow.camera.bottom = -400;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 1000;
        directionalLight.shadow.darkness = 0.5;

        directionalLight.shadow.mapSize.width = MAP_WIDTH;
        directionalLight.shadow.mapSize.height = MAP_HEIGHT;

        directionalLight.name = 'directional';

        this.lights = [];

        this.lights.push({
            active: true,
            object: hemisphereLight
        });

        this.lights.push ({
            active: true,
            object: directionalLight,
            helper: new THREE.DirectionalLightHelper(directionalLight, 50)
        });








        var light = new THREE.PointLight(0xff0000, 1, 100);
        light.position.set(x, 1000, y);



        if (debug) {

            for(var h of this.lights)
            {
                if(h.helper)
                {
                    scene.add(h.helper)
                }
            }

        }
        //scene.add(this.spotLight);
        //scene.add(this.directionalLight);
        this.refresh();
        scene.add(light);



        //scene.add(directionalLight2);
        //scene.add(directionalLight2);
    }
};