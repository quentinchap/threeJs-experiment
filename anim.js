window.onload = init;

var stats = new Stats();
var scene;
var camera;
var renderer;
var container = document.getElementById("container");
var stat = document.getElementById("stat");
var clock = new THREE.Clock();
var forest;


function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    camera.position.y = 400;
    camera.rotation.y += Math.PI/4;
    camera.lookAt(new THREE.Vector3())
    controls = new THREE.OrbitControls(camera)

    forest = new Forest(scene,300,15,15,20,4,6);
    
    var light = new Light(scene, true);
    var ground = new Ground(scene);
    var datGui = new DatGui(forest);


    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;

    container.appendChild(renderer.domElement);


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

    forest.update(delta);
    requestAnimationFrame(animate);

}









