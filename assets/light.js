var LIGHTS = {
    init: function (scene, debug) {
        var ambientLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9);
        scene.add(ambientLight);


        directionalLight = new THREE.DirectionalLight(0xfbfbfb, 1);

        directionalLight.position.set(500, 300, 200);
        directionalLight.target.position.set(0, 1000, 0);
        directionalLight.castShadow = true;
        directionalLight.shadowCameraNear = 1;
        directionalLight.shadow.camera.left = -400;
        directionalLight.shadow.camera.right = 400;
        directionalLight.shadow.camera.top = 400;
        directionalLight.shadow.camera.bottom = -400;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 1000;
        directionalLight.shadow.mapSize.width = 1000;
        directionalLight.shadow.mapSize.height = 1000;
        directionalLight.shadowDarkness = 0.5;

        directionalLight.name = 'directional';

        directionalLight2 = new THREE.DirectionalLight(0xfbfbfb, 0.4);

        directionalLight2.position.set(-200, 500, -200);
        directionalLight2.target.position.set(0, 100, 0);


        if (debug) {
            scene.add(new THREE.DirectionalLightHelper(directionalLight, 50));
            //scene.add(new THREE.DirectionalLightHelper(directionalLight2, 50));
        }
        scene.add(directionalLight);
        //scene.add(directionalLight2);
    }
}