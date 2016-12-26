class Light {

    constructor(scene, debug) {

        this.ambientLight = new THREE.AmbientLight(0x666666, 0.5);
        this.ambientLight.name = 'ambientLight';
        scene.add(this.ambientLight);

        var x =200;
        var y = 1000;



        this.spotLight = new THREE.SpotLight(0xffffff);
        this.spotLight.position.set(x, 1000, y);
        this.spotLight.target.position.set(0, 1000, 0);
        this.spotLight.name = 'spotLight';

        this.spotLight.shadow.mapSize.width = 4000;
        this.spotLight.shadow.mapSize.height = 4000;

        this.spotLight.castShadow = true;

        this.spotLight.distance = 4000;
        this.spotLight.shadow.camera.near = 1;
        this.spotLight.shadow.camera.far = 4000;
        this.spotLight.shadow.camera.fov = 1000;

        this.spotLight.shadow.camera.left = -2000;
        this.spotLight.shadow.camera.right = 2000;
        this.spotLight.shadow.camera.top = 2000;
        this.spotLight.shadow.camera.bottom = -2000;

        this.spotLight.shadow.darkness = 0.5;




        this.directionalLight = new THREE.DirectionalLight(0xfbfbfb, 0.7);

        this.directionalLight.position.set(x, 1000, y);
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
            //scene.add(new THREE.DirectionalLightHelper(this.directionalLight, 50));
            //scene.add(new THREE.DirectionalLightHelper(directionalLight2, 50));

        }
        //scene.add(this.spotLight);
        scene.add(this.directionalLight);
        scene.add(new THREE.DirectionalLightHelper(this.directionalLight, 50));
        this._spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
        scene.add(this._spotLightHelper);
        //scene.add(directionalLight2);
        //scene.add(directionalLight2);
    }
};