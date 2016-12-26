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
    var ground = new Ground(scene);

    this.forest = new Forest(camera, scene, 900, 30, 10, 20, 4, 6, ground, false);

    var axisHelper = new THREE.AxisHelper(500);
    scene.add(axisHelper);


    var light = new Light(scene, false);
    var datGui = new DatGui(forest);



    renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.soft = true;

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


    this.forest.update(delta);
    requestAnimationFrame(animate);

}









