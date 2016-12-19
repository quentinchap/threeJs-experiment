class Camera
{
    constructor(window)
    {
        this._camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
        this._camera.position.z = 400;
        this._camera.position.y = 400;
        this._camera.rotation.y += Math.PI/4;
        this._camera.lookAt(new THREE.Vector3())
        this._controls = new THREE.OrbitControls(this._camera)
    }

    getCamera()
    {
        return this._camera;
    }
}