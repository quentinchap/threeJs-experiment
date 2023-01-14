window.onload = init;

var stats = new Stats();
var scene;
var cube
var camera;
var renderer;
var container = document.getElementById("container");
var stat = document.getElementById("stat");
var directionalLight;
var animation;
var skinnedMesh;
var clock = new THREE.Clock();
var mixer;


function animate(skinnedMesh) {
    var materials = skinnedMesh.material.materials;

    for (var k in materials) {
        materials[k].skinning = true;
    }

    mixer = new THREE.AnimationMixer(scene);


    mixer.clipAction(geometry.animations[0], skinnedMesh)
        .setDuration(1)			// one second
        .startAt(- Math.random())	// random phase (already running)
        .play();					// let's go

}


function init() {





    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;


    var loader = new THREE.JSONLoader().load("assets/libs/tree4.json", function (geometry, materials) {
        var material = new THREE.MultiMaterial(materials);
        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(15, 15, 15);
        //scene.add(mesh);

        skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
        skinnedMesh.scale.set(15, 15, 15);
        scene.add(skinnedMesh);

        animate(skinnedMesh);
    });


    var ambientLight = new THREE.AmbientLight(0x000000);
    scene.add(ambientLight);

    /*var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
    var material = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
    });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);*/

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(200, 100, 200);
    directionalLight.target.position.set(0, 0, 0);

    directionalLight.name = 'directional';


    scene.add(new THREE.DirectionalLightHelper(directionalLight, 50));
    scene.add(directionalLight);


    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);



    stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    stat.appendChild(stats.domElement);

    animate();

}




function animate() {

    //requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.001;

    MESHES.Update(1);



    stats.begin();

    // monitored code goes here

    stats.end();
    renderer.render(scene, camera);
    var delta = clock.getDelta();
    if (animation) animation.update(delta);

    requestAnimationFrame(animate);

}









