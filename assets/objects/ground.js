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
        */

        var geometry = new THREE.Geometry();

        geometry.vertices.push(
            new THREE.Vector3(0, 50, 100), // 0

            new THREE.Vector3(0, 50, 0), // 1

            new THREE.Vector3(80, 50, 0), // 2

            new THREE.Vector3(100, 0, -100), // 3

            new THREE.Vector3(0, 0, -100), // 4

            new THREE.Vector3(-60, 0, 80), // 5

            new THREE.Vector3(0, 50, 0), // 6

            new THREE.Vector3(20, 0, 200), // 7

            new THREE.Vector3(150, 0, 0)
            

        );

        geometry.faces.push(new THREE.Face3(1, 0, 2)); // blue
        geometry.faces.push(new THREE.Face3(1, 2, 3)); // pink
        geometry.faces.push(new THREE.Face3(1, 3, 4)); // green
        geometry.faces.push(new THREE.Face3(0, 1, 5)); // orange
        geometry.faces.push(new THREE.Face3(4,5, 6)); // 4
        geometry.faces.push(new THREE.Face3(0,5, 7)); // 5
        geometry.faces.push(new THREE.Face3(7, 2, 0)); // 6
        geometry.faces.push(new THREE.Face3(7, 8, 2)); // 7
        geometry.faces.push(new THREE.Face3(2, 8, 3)); // 7
        geometry.faces.push(new THREE.Face3(7, 8, 9)); // 7
        



        /*geometry.computeBoundingSphere();

        for (var i = 0; i < geometry.faces.length; i++) {

            var face = geometry.faces[i];
            face.color.setHex(Math.random() * 0xffffff);

        }
         geometry.faces[0].color.setHex(0x4286f4); // blue
         geometry.faces[1].color.setHex(0xf44271); // pink
         geometry.faces[2].color.setHex(0x42f459); // green
         geometry.faces[3].color.setHex(0xf45c42); // orange
         geometry.faces[6].color.setHex(0xf4ee42); // YELLOW
         geometry.faces[7].color.setHex(0x5942f4); // YELLOW*/




        var material = new THREE.MeshLambertMaterial({ vertexColors: THREE.FaceColors });


        var mesh = new THREE.Mesh(geometry, material);
        //mesh.material.side = THREE.DoubleSide;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.position.set(-300, 0, 0);
        mesh.scale.set(5, 2, 5);

        scene.add(mesh);


    }

}