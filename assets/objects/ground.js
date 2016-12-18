class Ground{

    constructor(scene)
    {
        this.groundMaterial = new THREE.MeshLambertMaterial({ color: 0xad8e77 });
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), this.groundMaterial);
        this.plane.rotation.x -= Math.PI / 2;
        this.plane.receiveShadow = true;
        this.plane.castShadow = true;

        scene.add(this.plane);
    }

}