window.onload = init;

var scene, sceneBG;
var cameraControl, cameraBG;
var composer;
var renderer;
var effectCopy, renderPass, bgPlane, bgPass;
var cloudGeometry, cloudMesh;
var sphereMaterial, earthMesh;

function init() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( { alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    //renderer.autoClear = false;
    //renderer.clear();

    camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.x = 35;
    camera.position.y = 36;
    camera.position.z = 33;
    camera.lookAt(scene.position);

    cameraControl = new THREE.OrbitControls(camera);

    var worldGeo;

    var worldGeo = world();
    cloud(worldGeo);
    addDirectionalLight();
    addAmbientLight();

    document.body.appendChild(renderer.domElement);


    render();
}

function background() {
    cameraBG = new THREE.OrthographicCamera(
        -window.innerWidth,
        window.innerWidth,
        window.innerHeight,
        -window.innerHeight,
        -10000, 10000);
    cameraBG.position.z = -50;

    sceneBG = new THREE.Scene();
    var materialColor = new THREE.MeshBasicMaterial({
        map:
        THREE.ImageUtils.loadTexture(
            "assets/textures/planets/starry_background.jpg")
    });
    bgPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1), materialColor);
    bgPlane.position.z = -300;
    bgPlane.scale.set(
        window.innerWidth * 2, window.innerHeight * 2, 1);
    sceneBG.add(bgPlane);
}

function world(sphereGeometry) {
    sphereGeometry = new THREE.SphereGeometry(15, 30, 30);
    sphereMaterial = createEarthMaterial();
    earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'earth';
    scene.add(earthMesh);
    return sphereGeometry;
}

function createEarthMaterial() {
    // 4096 is the maximum width for maps
    var earthTexture = THREE.ImageUtils.loadTexture(
        "assets/textures/planets/earthmap4k.jpg");
    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;
    return earthMaterial;
}

function cloud(sphereGeometry) {
    console.log(sphereGeometry);
    cloudGeometry = new
        THREE.SphereGeometry(sphereGeometry.parameters.radius * 1.01,
        sphereGeometry.parameters.widthSegments,
        sphereGeometry.parameters.heightSegments);

    var cloudMaterial = createCloudMaterial();
    cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudMesh.name = 'cloud';
    scene.add(cloudMesh);


}


function createCloudMaterial() {
    var cloudTexture = THREE.ImageUtils.loadTexture(
        "assets/textures/planets/fair_clouds_4k.png");
    var cloudMaterial = new THREE.MeshPhongMaterial();
    cloudMaterial.map = cloudTexture;
    cloudMaterial.transparent = true;
    return cloudMaterial;
}

function addDirectionalLight() {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    
    directionalLight.position.set( 300, 150, -50 ); 
    directionalLight.target.position.set( 0, 0, 0 ); 

    directionalLight.name = 'directional';


    //scene.add(new THREE.DirectionalLightHelper(directionalLight,50));
    scene.add(directionalLight);

}


function addAmbientLight() {
    var ambientLight = new THREE.AmbientLight(0x111111);
    //scene.add(ambientLight);
}

function render() {
    cameraControl.update();

    cloudMesh.rotation.y += 0.001;
    earthMesh.rotation.y -= 0.0005;

    renderer.render(scene, camera);


    requestAnimationFrame(render);
}