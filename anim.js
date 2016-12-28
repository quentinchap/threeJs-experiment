window.onload = init;



var stats = new Stats();
var scene;
var camera;
var renderer;
var container = document.getElementById("container");
var stat = document.getElementById("stat");
var clock = new THREE.Clock();
var forest;
var forestPosition = {};
var debug = false;

forestPosition.x = -250;
forestPosition.z = 100;

var MAP_WIDTH = 2048;
var MAP_HEIGHT = 2048;


function init() {

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 200, 500);

    this._camera = new Camera(window);
    var ground = new Ground(scene);

    new Cloud(scene, 100);

    this.forest = new Forest(camera, scene, 200, forestPosition, 50, 2, 5, 4, 6, ground, debug);

    if (debug) {
        var axisHelper = new THREE.AxisHelper(500);
        scene.add(axisHelper);
    }


    this._light = new Light(scene, this._camera.getCamera(), debug);
    var datGui = new DatGui(forest, this._light);



    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.soft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    container.appendChild(renderer.domElement);


    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stat.appendChild(stats.domElement);

    animate();

}




function animate() {


    stats.begin();

    // monitored code goes here

    stats.end();
    this._camera.update();
    if (this._light && this._light._spotLightHelper)
        this._light._spotLightHelper.update();
    renderer.render(scene, this._camera.getCamera());

    var delta = 0.75 * clock.getDelta();

    this._light.update();

    this.forest.update(delta);
    requestAnimationFrame(animate);

}









