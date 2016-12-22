class Ground {

    constructor(scene) {
        this.groundMaterial = new THREE.MeshLambertMaterial({ color: 0xad8e77 });
        this.plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), this.groundMaterial);
        this.plane.rotation.x -= Math.PI / 2;
        this.plane.receiveShadow = true;
        this.plane.castShadow = true;

        scene.add(this.plane);


        /*
        Ground generator init

        var geometry = new THREE.Geometry();
    
        geometry.vertices.push(
            new THREE.Vector3(-200, 100, 200),
            new THREE.Vector3(-200, 100, -200),
            new THREE.Vector3(200, 100, -200),
            new THREE.Vector3(250, 150, -300)
        );
    
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        geometry.faces.push(new THREE.Face3(1, 2, 3));
    
        geometry.computeBoundingSphere();
    
    
        var material = new THREE.MeshLambertMaterial();
        var mesh = new THREE.Mesh(geometry, material);
        mesh.material.side = THREE.DoubleSide;
        scene.add(mesh);*/


    }

}