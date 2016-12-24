class Light{

    constructor(scene, debug)
    {
    
        this.ambientLight = new THREE.AmbientLight(0x666666);
        scene.add(this.ambientLight);


        this.directionalLight = new THREE.DirectionalLight(0xfbfbfb, 0.7);

        this.directionalLight.position.set(1000, 300, 300);
        this.directionalLight.target.position.set(0, 1000, 0);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.camera.left = -2000;
        this.directionalLight.shadow.camera.right = 2000;
        this.directionalLight.shadow.camera.top = 2000;
        this.directionalLight.shadow.camera.bottom = -2000;
        this.directionalLight.shadow.camera.near = 1;
        this.directionalLight.shadow.camera.far = 4000;
        this.directionalLight.shadow.mapSize.width = 4000;
        this.directionalLight.shadow.mapSize.height = 4000;

        this.directionalLight.name = 'directional';

        this.directionalLight2 = new THREE.DirectionalLight(0xfbfbfb, 0.4);

        this.directionalLight2.position.set(-200, 500, -200);
        this.directionalLight2.target.position.set(0, 100, 0);


        if (debug) {
            scene.add(new THREE.DirectionalLightHelper(this.directionalLight, 50));
            //scene.add(new THREE.DirectionalLightHelper(directionalLight2, 50));
        }
        scene.add(this.directionalLight);
        //scene.add(directionalLight2);
    }
};