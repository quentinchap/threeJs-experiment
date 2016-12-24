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

    this._camera = new Camera(window);

    this.forest = new Forest(camera, scene, 900, 30, 10, 20, 4, 6, false);


    var light = new Light(scene, false);
    var ground = new Ground(scene);
    var datGui = new DatGui(forest);

    /* // Room.
     const roomGeometry = new THREE.BoxGeometry(100, 20, 100, 100, 20, 100);
     const roomMaterial = new THREE.MeshBasicMaterial({
       wireframe: true,
       opacity: 0.3,
       transparent: true,
       side: THREE.BackSide
     });
     const room = new THREE.Mesh(roomGeometry, roomMaterial);
 
     room.position.z = -5;
 
     scene.add(room);*/


    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    this._camera.update();
    renderer.render(scene, this._camera.getCamera());

    var delta = 0.75 * clock.getDelta();
    

    this.forest.update(delta);
    requestAnimationFrame(animate);

}









