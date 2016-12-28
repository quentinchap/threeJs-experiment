class Light {

    refresh() {
        for (var l of this.lights)
            if (l.active) {
                console.log("Add Light", l);
                scene.add(l.object);
            }
            else {
                console.log("Remove Light", l);
                scene.remove(l.object);
            }
    }

    loadGui(folder) {

        var vm = this;

        var AmbientMenu = folder.addFolder("Ambient light");
        var toggleAmbient = AmbientMenu.add(this.lights[0], 'active', false);
        var ambientIntensity = AmbientMenu.add(this.lights[0].object, 'intensity', -20, 20);
        var ambientColor = AmbientMenu.addColor(this.lights[0], 'color');


        ambientColor.onChange(function (colorValue) {
            var colorObject = new THREE.Color(colorValue);
            vm.lights[0].object.color = colorObject;
        });

        toggleAmbient.onFinishChange(function (value) {
            vm.refresh();
        });

        /*var HemisphereMenu = folder.addFolder("Hemisphere light");
        var toggleHemisphere = HemisphereMenu.add(this.lights[2], 'active', false);
        var hemisphereIntensity = HemisphereMenu.add(this.lights[2].object, 'intensity', -20, 20);
        var hemisphereColorSky = HemisphereMenu.addColor(this.lights[2], 'colorSky');
        var hemisphereColorGround = HemisphereMenu.addColor(this.lights[2], 'colorGround');


        hemisphereColorSky.onChange(function (colorValue) {
            var colorObject = new THREE.Color(colorValue);
            vm.lights[2].object.color = colorObject;
        });

        hemisphereColorGround.onChange(function (colorValue) {
            var colorObject = new THREE.Color(colorValue);
            vm.lights[2].object.groundColor = colorObject;
        });



        toggleHemisphere.onFinishChange(function (value) {
            vm.refresh();
        });*/

        var DirMenu = folder.addFolder("Directional light");
        var toggleDirLight = DirMenu.add(this.lights[1], 'active', false);
        toggleDirLight.onFinishChange(function (value) {
            vm.refresh();
        });
    }

    update() {
        this.lights[1].object.shadow.camera.updateProjectionMatrix();
    }

    constructor(scene, camera, debug) {

        var x = 100;
        var y = 500;

        var ambientLight = new THREE.AmbientLight(0x404040);//
        ambientLight.name = 'hemisphereLight';
        ambientLight.intensity= 4;

        var hemisphereLight = new THREE.HemisphereLight(0xD0E2E7, 0xf7d9aa, .3);
        hemisphereLight.name = 'hemisphereLight';
        hemisphereLight.intensity = -7;

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(x, 350, y);
        directionalLight.target.position.set(0, 0, 0);
        directionalLight.castShadow = true;
        directionalLight.shadow.cameraVisible = true;



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
        directionalLight.shadow.camera.far = MAP_WIDTH + 500;
        directionalLight.shadow.darkness = 0.5;

        directionalLight.shadow.mapSize.width = MAP_WIDTH + 500;
        directionalLight.shadow.mapSize.height = MAP_HEIGHT + 500;

        directionalLight.name = 'directional';

        this.lights = [];

        this.lights.push({
            active: true,
            color: "#404040",
            object: ambientLight
        });

        this.lights.push({
            active: true,
            object: directionalLight,
            helper: new THREE.DirectionalLightHelper(directionalLight, 50)
        });

        /*this.lights.push({
            active: true,
            colorSky: '#D0E2E7',
            colorGround: '#f7d9aa',
            object: hemisphereLight
        });*/








        var light = new THREE.PointLight(0xff0000, 1, 100);
        light.position.set(x, 1000, y);



        if (debug) {

            for (var h of this.lights) {
                if (h.helper) {
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