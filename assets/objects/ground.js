class Ground {



    assignUVs(geometry) {

        geometry.faceVertexUvs[0] = [];

        geometry.faces.forEach(function (face) {

            var uvs = [];
            var ids = ['a', 'b', 'c'];
            for (var i = 0; i < ids.length; i++) {
                var vertex = geometry.vertices[face[ids[i]]].clone();

                var n = vertex.normalize();
                var yaw = .5 - Math.atan(n.z, - n.x) / (2.0 * Math.PI);
                var pitch = .5 - Math.asin(n.y) / Math.PI;

                var u = yaw,
                    v = pitch;
                uvs.push(new THREE.Vector2(u, v));
            }
            geometry.faceVertexUvs[0].push(uvs);
        });

        geometry.uvsNeedUpdate = true;
    }


    hillGenerator(scene) {
        var geometry = new THREE.Geometry({vertexColors:THREE.FaceColors });

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
        geometry.faces.push(new THREE.Face3(4, 5, 6)); // 4
        geometry.faces.push(new THREE.Face3(0, 5, 7)); // 5
        geometry.faces.push(new THREE.Face3(7, 2, 0)); // 6
        geometry.faces.push(new THREE.Face3(7, 8, 2)); // 7
        geometry.faces.push(new THREE.Face3(2, 8, 3)); // 7
        geometry.faces.push(new THREE.Face3(7, 8, 0)); // 7

        geometry.computeBoundingBox();


        geometry.computeFaceNormals();

        var material = new THREE.MeshLambertMaterial({ color: 0xad8e77 });
        var mesh = new THREE.Mesh(geometry, material);
        //mesh.material.side = THREE.DoubleSide;
        mesh.name = 'hill';
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        mesh.position.set(-300, 0, 0);
        mesh.scale.set(2, 1, 2);

        this.hill = mesh;

        return mesh;
    }


    loadHillModel(scene) {
        this.loader.load('assets/3DModels/hill.json', function (geometry, materials) {
            var material = new THREE.MeshLambertMaterial({ color: 0xad8e77 });
            var mesh = new THREE.Mesh(geometry, material);
            geometry.computeFaceNormals();

            mesh.name = 'hill';
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            mesh.position.set(300, 0, 100);
            mesh.scale.set(100, 100, 100);


            scene.add(mesh);
        });

    }

    constructor(scene) {


        this.loader = new THREE.JSONLoader();
        var geo = new THREE.PlaneGeometry(MAP_WIDTH, MAP_HEIGHT);
        geo.rotateX(-Math.PI / 2);

        geo.mergeMesh(this.hillGenerator(scene));

        this.groundMaterial = new THREE.MeshLambertMaterial({ color: 0xad8e77 });

        this.plane = new THREE.Mesh(geo, this.groundMaterial);
        this.plane.receiveShadow = true;
        this.plane.castShadow = true;

        scene.add(this.plane);


    }

}