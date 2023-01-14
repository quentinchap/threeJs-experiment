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


class Butterfly
{

}


function init() {

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.shadowMap.soft = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf7d9aa, 200, 500);

    this._camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    this._camera.position.z = 50;
    this._camera.position.y = 10;

    this._camera.lookAt(new THREE.Vector3());

    this._controls = new THREE.OrbitControls(this._camera)
    this._controls.rotateLeft(-Math.PI / 3);
    this._controls.enableZoom = false;
    this._controls.minPolarAngle = 0; // radians
    this._controls.maxPolarAngle = Math.PI / 2.1; // radians*/

    var geo = new THREE.PlaneGeometry(MAP_WIDTH, MAP_HEIGHT);
    geo.rotateX(-Math.PI / 2);
    var groundMaterial = new THREE.MeshLambertMaterial({ color: 0xad8e77 });

    var hill = new Hill().getMesh();
    hill.position.set(-100, 0, -500);
    hill.rotateY(Math.PI/2.5);
    hill.scale.set(3, 2, 3);

    geo.mergeMesh(hill);

    var hill2 = new Hill().getMesh();
    hill2.position.set(50, 0, -300);
    hill2.scale.set(1, 0.2, 1);

    geo.mergeMesh(hill2);

    this.ground = new THREE.Mesh(geo, groundMaterial);
    this.ground.receiveShadow = true;
    this.ground.castShadow = true;
    scene.add(this.ground);


    this.forest = new Forest("../object-lib/threeJs-forest-generator/3DModels/tree.json",scene, 250, {x:0,z:-300}, 70, 2, 5, 4, 6, this.ground, debug);


    //var geoMenu = new THREE.PlaneGeometry(50, 10);
    var geoMenu = new THREE.CylinderGeometry(40, 40, 10, 50, 1, true, Math.PI/2, Math.PI );
    var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    this.menuVr = new THREE.Mesh(geoMenu, groundMaterial);
    this.menuVr.position.y += 10;
    this.menuVr.material.side = THREE.DoubleSide;
    this.menuVr.material.transparent = true;
    this.menuVr.material.opacity = 0.5;
    scene.add(this.menuVr);

    this.spline = new THREE.CatmullRomCurve3([
       new THREE.Vector3(0, 20, -50),
       new THREE.Vector3(-50, 10, -100),
       new THREE.Vector3(-100, 15, -150),
       new THREE.Vector3(-20, 20, -200),
       new THREE.Vector3(0, 20, -100),
       new THREE.Vector3(50, 20, -70),
       new THREE.Vector3(0, 20, -50)
    ]);
    
    var material = new THREE.LineBasicMaterial({
        color: 0xff00f0,
    });
    
    var geometry = new THREE.Geometry();
    geometry.vertices = this.spline.getPoints( 50 );

    
    this.line = new THREE.Line(geometry, material);
    scene.add(this.line);


    var geometry = new THREE.ConeGeometry( 5, 20, 32 );
    geometry.rotateZ(-Math.PI/2);
    geometry.rotateY(-Math.PI/2);
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.cone = new THREE.Mesh( geometry, material );
    scene.add( this.cone );



    var ambientLight = new THREE.AmbientLight(0x3e3c3c);//
    ambientLight.name = 'hemisphereLight';
    ambientLight.intensity = 4;
    scene.add(ambientLight);


    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(100, 350, 500);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.cameraVisible = true;
    directionalLight.shadow.camera.left = -400;
    directionalLight.shadow.camera.right = 400;
    directionalLight.shadow.camera.top = 400;
    directionalLight.shadow.camera.bottom = -400;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = MAP_WIDTH + 500;
    directionalLight.shadow.darkness = 0.5;

    directionalLight.shadow.mapSize.width = MAP_WIDTH + 500;
    directionalLight.shadow.mapSize.height = MAP_HEIGHT + 500;

    directionalLight.name = 'directional';
    scene.add(directionalLight);




    animate();

}




function animate() {



    renderer.render(scene, this._camera);
    
    if(this.spline)
    {
        var time = Date.now();
        var looptime = 5 * 1000;
        var t = ( time % looptime ) / looptime;

        if( t+.001 < 1)
        {
            //Then at each increment (in your render loop or in the 'update' function of a tween)
            var newPosition = this.spline.getPointAt( t );
            var target = this.spline.getPointAt( t + .001);


            this.cone.position.copy(newPosition);

            //Also update the car's orientation so it looks at the road
            //var target = this.spline.getPoint( this.conePositionOnSpline + .001 );
            this.cone.lookAt( target );//+.001 or whatever
        }

    }

    
    requestAnimationFrame(animate);

}