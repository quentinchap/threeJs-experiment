class DatGui{
    constructor(forest)
    {
        this.gui = new dat.GUI();
        this.forest = forest;
        this.forestManage('Forest management', this.gui);
    }

    forestManage(objName, gui)
    {
        var menu = gui.addFolder(objName);
        var vm = this;

        this.forestController = gui.add(this.forest,'number', 0, 30);

        this.forestController.onChange(function(value) {
        // Fires on every change, drag, keypress, etc.
        });

        this.forestController.onFinishChange(function(value) {
            vm.forest.number = Math.floor(value);
            vm.forest.updateForest();
        });
    }
}