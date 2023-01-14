window.onload = init;

var stats = new Stats();
var scene;
var cube
var camera;
var renderer;
var container = document.getElementById("container");
var stat = document.getElementById("stat");
var directionalLight;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;


    var ambientLight = new THREE.AmbientLight(0x000000);
    scene.add(ambientLight);

    var geometry = new THREE.BoxBufferGeometry(100, 100, 100);
    var material = new THREE.MeshPhongMaterial( {
					color: 0x156289,
					emissive: 0x072534,
					side: THREE.DoubleSide,
					shading: THREE.FlatShading
				} );
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    
    directionalLight.position.set( 200, 100, 200 ); 
    directionalLight.target.position.set( 0, 0, 0 ); 

    directionalLight.name = 'directional';


    scene.add(new THREE.DirectionalLightHelper(directionalLight,50));
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

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.001;
    
    
    

    stats.begin();

    // monitored code goes here

    stats.end();
    renderer.render(scene, camera);

    requestAnimationFrame(animate);

}








