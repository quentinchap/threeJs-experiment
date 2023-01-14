# Forest generator

Little piece of code to centralize the work around low poly forest.

## Usage
include files:
```javascript
    <script src="..tree.js"></script>
    <script src="..forest.js"></script>
```


Instantiate the forest:

```javascript
 new Forest(pathOfThe3DModel,scene, radius, forestPosition, numberOfTree , minScale , maxScale, minAnimationDuration, maxAnimationDuration, ground, debug);
 ```

Example:
```javascript
 var forestPosition = { x:10, z: 20};
 new Forest("../object-lib/threeJs-forest-generator/3DModels/tree.json",scene, 200, forestPosition, 50, 2, 5, 4, 6, ground, debug);
 ```
 
 Activate animation:
 
  ```javascript
   var clock = new THREE.Clock();
   var delta = 0.75 * clock.getDelta();
   forest.update(delta);
 ```

**Note** This repo contain some 3D Model made with Blender

**Warning** This library is not yet very evolved
