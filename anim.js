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
var tree1, tree2;


function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    camera.position.y = 400;
    camera.rotation.y += Math.PI/4;
    camera.lookAt(new THREE.Vector3())
    controls = new THREE.OrbitControls(camera)

   //tree1 = TREE.Init(scene,15,'pine',4,30,10,0);
    //tree2 = TREE.Init(scene,10,'pine',2,-30,-10,0);
    FOREST.GenerateForest(scene,300,15,15,20,4,6);
    LIGHTS.init(scene, true);


    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;

    container.appendChild(renderer.domElement);

    var groundMaterial = new THREE.MeshLambertMaterial({ color: 0xad8e77 });
    plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), groundMaterial);
    plane.rotation.x -= Math.PI / 2;
    plane.receiveShadow = true;
    plane.castShadow = true;


    scene.add(plane);



    stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    stat.appendChild(stats.domElement);

    animate();

}




function animate() {


    stats.begin();

    // monitored code goes here

    stats.end();
    renderer.render(scene, camera);

    var delta = 0.75 * clock.getDelta();

    FOREST.Update(delta);
    requestAnimationFrame(animate);

}









