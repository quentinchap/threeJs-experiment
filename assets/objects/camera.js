class Camera {
    constructor(window) {
        var vec = new THREE.Vector3();
        this._camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
        this._camera.position.z = 50;
        this._camera.position.y = 10;

        this._clock = new THREE.Clock();



        this._camControls = new FirstPersonMovement(this._camera,"AZERTY");
        this._camControls.lookSpeed = 0.5;
        this._camControls.movementSpeed = 50;
        this._camControls.noFly = true;
        this._camControls.lookVertical = true;
        this._camControls.constrainVertical = true;
        this._camControls.verticalMin = 1.0;
        this._camControls.verticalMax = 2.0;
        this._camControls.lon = -150;
        this._camControls.lat = 120;


        /*this._camera.lookAt(vec);
    
        this._controls = new THREE.OrbitControls(this._camera)
        this._controls.rotateLeft(-Math.PI/3);
        this._controls.enableZoom = false;
        this._controls.minPolarAngle = 0; // radians
        this._controls.maxPolarAngle = Math.PI/2.1; // radians*/
    }

    getCamera() {
        return this._camera;
    }

    update() {
        if (this._controls)
            this._controls.update();
        if (this._camControls) {

            var delta = this._clock.getDelta();
            this._camControls.update(delta);
        }

    }
}