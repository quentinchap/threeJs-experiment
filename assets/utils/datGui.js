class DatGui {
    constructor(forest, light) {
        this.gui = new dat.GUI({ autoPlace: false });

        var customContainer = document.getElementById('my-gui-container');
        customContainer.appendChild(this.gui.domElement);

        this.forestManage('Forest management', this.gui, forest);
        this.lightManagement('Light management', this.gui, light);
    }

    lightManagement(objName, gui, light) {

        var lightsMenu = gui.addFolder(objName);

        light.loadGui(lightsMenu);
    }

    forestManage(objName, gui, forest) {
        var menu = gui.addFolder(objName);

        this.forestController = menu.add(forest, 'number', 0, 50);
        this.rayCtrl = menu.add(forest, 'rayon', 0, MAP_WIDTH / 2);

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