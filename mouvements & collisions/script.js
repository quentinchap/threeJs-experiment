
window.addEventListener("resize", handleWindowResize, false);
document.addEventListener('keydown', onDocumentKeyDown, false);


var WIDTH, HEIGHT, scene, camera, renderer, container, cube, shadowLight, tween;

window.onload = function () {

    var gui = new dat.GUI();

    basicControl(cube, 'Moving object', gui);
    basicControl(camera, 'Camera', gui);
    basicControl(shadowLight, 'Lights', gui);

};

function basicControl(obj, objName, gui) {
    var menu = gui.addFolder(objName);
    var f1 = menu.addFolder(objName + ' position');
    f1.add(obj.position, 'x', -300, 300).listen();
    f1.add(obj.position, 'y', -300, 300).listen();
    f1.add(obj.position, 'z', -300, 300).listen();
    f1.open();

    var f4 = menu.addFolder(objName + ' rotation');
    f4.add(obj.rotation, 'x', -Math.PI, Math.PI).listen();
    f4.add(obj.rotation, 'y', -Math.PI, Math.PI).listen();
    f4.add(obj.rotation, 'z', -Math.PI, Math.PI).listen();
    f4.open();

    return menu;
}

function handleWindowResize() {

    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

function initScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x404040));
    scene.obstacles = [];
}

function initCamera() {


    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;
    camera.position.y = -40;
    camera.rotation.x = Math.PI / 4;

    scene.add(camera);
}

function initContainer(item) {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;


    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
}


function createCube() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshLambertMaterial({ color: 0xf2f2d5, shading: THREE.FlatShading });
    cube = new THREE.Mesh(geometry, material);
    //cube.rotation.y += Math.PI /4;
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

}


function wall1() {
    var geometry = new THREE.BoxGeometry(2, 30, 20);
    var material = new THREE.MeshLambertMaterial({ color: 0x4286f4 });
    var w1 = new THREE.Mesh(geometry, material);
    //cube.rotation.y += Math.PI /4;
    w1.castShadow = true;
    w1.receiveShadow = true;
    w1.position.x = 25;
    w1.position.z -= 10;
    scene.obstacles.push(w1);
    scene.add(w1);
}

function wall2() {
    var geometry = new THREE.BoxGeometry(2, 30, 30);
    var material = new THREE.MeshLambertMaterial({ color: 0x4286f4 });
    var w2 = new THREE.Mesh(geometry, material);
    //cube.rotation.y += Math.PI /4;
    w2.castShadow = true;
    w2.receiveShadow = true;
    w2.position.x = -25;
    w2.position.z -= 10;
    scene.obstacles.push(w2);
    scene.add(w2);
}

function loop() {
    requestAnimationFrame(loop);

    renderer.render(scene, camera);
    TWEEN.update();
}


function createLights() {


    shadowLight = new THREE.DirectionalLight(0xffffff);
    shadowLight.position.set(15, -20, 40);
    shadowLight.target.position.set(20, 20, 20);

    shadowLight.castShadow = true;
    shadowLight.shadow.camera.visible = true;

    shadowLight.shadow.camera.near = 3;
    shadowLight.shadow.camera.far = camera.far;

    shadowLight.shadow.camera.right = 50;
    shadowLight.shadow.camera.left = -50;
    shadowLight.shadow.camera.top = 50;
    shadowLight.shadow.camera.bottom = -50;


    scene.add(shadowLight);


    scene.add(new THREE.CameraHelper(shadowLight.shadow.camera));
    //scene.add(new THREE.AmbientLight(0xffffff));
}

/** ---------------------------------------------------------- **
 *                                                              *
 *                      COLLISION SYSTEM                        *
 *                                                              *
 ** ---------------------------------------------------------- **/

var rays, caster;
function initCollisionDetection() {
    rays = [
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, 0, -1),
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(-1, 0, -1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(-1, 0, 1)
    ];

    caster = new THREE.Raycaster();
}

function collisionDetection(delta) {

    var collisions, i,

        distance = delta;

        obstacles = scene.obstacles;

    for (i = 0; i < rays.length; i += 1) {
        caster.set(target, rays[i]);

        collisions = caster.intersectObjects(obstacles);

        if (collisions.length > 0 && collisions[0].distance < distance) {
            return true;
        }

    }

    return false;

}

var initPos, target;
function onDocumentKeyDown(event) {
    var delta = 5;
    event = event || window.event;
    var keycode = event.keyCode;
    initPos = cube.position.clone();
    target = cube.position.clone();


    switch (keycode) {
        case 81: //left arrow
        case 37:
            target.x -= delta;
            break;

        case 90: // up arrow 
        case 38:
            target.y += delta;
            break;

        case 68: // right arrow 
        case 39:
            target.x += delta;
            break;

        case 83: //down arrow
        case 40:
            target.y -= delta;
            break;
    }

    if(collisionDetection(delta))
    {
        target = initPos;
    }

    tween = new TWEEN.Tween(initPos).to(target, 100);
    tween.onUpdate(function () {
        cube.position.x = this.x;
        cube.position.y = this.y;
    }).start();

}

initScene();

initContainer('container');
initCamera();
createLights();


createCube();
wall1();
wall2();

var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x428000, shading: THREE.FlatShading });
plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), groundMaterial);
plane.position.z -= 20;
plane.receiveShadow = true;


scene.add(plane);
initCollisionDetection();

loop();