class DatGui {
    constructor(forest, light) {
        this.gui = new dat.GUI();
        this.forestManage('Forest management', this.gui, forest);
        this.lightManagement('Light management', this.gui, light);
    }

    lightManagement(objName, gui, light) {

        var lightsMenu = gui.addFolder(objName);

        var HemisphereMenu = lightsMenu.addFolder("Hemisphere light");


        var toggleHemisphere = HemisphereMenu.add(light.lights[0], 'active', false);
        toggleHemisphere.onFinishChange(function (value) {
            light.refresh();
        });

        var DirMenu = lightsMenu.addFolder("Directional light");
        var toggleDirLight = DirMenu.add(light.lights[1], 'active', false);
        toggleDirLight.onFinishChange(function (value) {
            light.refresh();
        });

    }

    forestManage(objName, gui, forest) {
        var menu = gui.addFolder(objName);

        this.forestController = menu.add(forest, 'number', 0, 50);
        this.rayCtrl = menu.add(forest, 'rayon', 0, MAP_WIDTH/2);

        this.rayCtrl.onFinishChange(function (value) {
            forest.rayon = Math.floor(value);
            forest.refresh();
        });

        this.forestController.onFinishChange(function (value) {
            forest.number = Math.floor(value);
            forest.updateForest();
        });
    }
}