class Camera {
    constructor(window) {
        this._camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 2000);
        this._camera.position.z = 500;
        this._camera.position.y = 500;
        this._camera.rotation.y += Math.PI / 4;
        this._camera.lookAt(new THREE.Vector3())
        this._controls = new THREE.OrbitControls(this._camera)
        this._controls.enableZoom = false;
        this._controls.minPolarAngle = 0; // radians
        this._controls.maxPolarAngle = Math.PI/2.1; // radians
    }

    getCamera() {
        return this._camera;
    }

    update() {
        if(this._controls)
            this._controls.update();
    }
}