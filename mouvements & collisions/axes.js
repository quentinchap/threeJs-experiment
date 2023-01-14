
var axe2, scene2, renderer2, camToField;

function loadAxes(element, axesWidth, axesHeight, cam) {
    container2 = document.getElementById(element);

    camToField = cam;

    // renderer
    renderer2 = new THREE.WebGLRenderer();
    renderer2.setClearColor(0xf0f0f0, 1);
    renderer2.setSize(axesWidth, axesHeight);
    container2.appendChild(renderer2.domElement);

    // scene
    scene2 = new THREE.Scene();

    // camera
    camera2 = new THREE.PerspectiveCamera(50, axesWidth / axesHeight, 1, 1000);
    camera2.up = camToField.up; // important!

    // axes
    axes2 = new THREE.AxisHelper(100);
    scene2.add(axes2);


}


function renderAxes() {
    //controls.update();

    camera2.position.copy(camToField.position);
    //camera2.position.sub( controls.target ); // added by @libe
    camera2.position.setLength(600);

    camera2.lookAt(scene2.position);
    renderer2.render(scene2, camera2);
}