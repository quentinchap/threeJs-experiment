class Forest {
    
    constructor (treeModel,scene, rayon, center, number, minSize, maxSize,minDuration,maxDuration,ground,debug) {
        this.forest = [];
        this.scene = scene;
        this.rayon = rayon;
        this.number = number;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.minDuration = minDuration;
        this.maxDuration = maxDuration;
        this.raycaster = new THREE.Raycaster();
        this.debug = debug;
        this.ground = ground;
        this.center = center;
        this._treeModel = treeModel;
        this.refresh();

    }

    refresh()
    {
        var i = 0;
        while (this.forest.length > 0) 
        {
            this.removeTree();
        }
        while (i < this.number) {
            i++;
            this.addTree('pine '+i);
        }
    }

    generateATree(name)
    {
        var three = new Tree(this.scene, this.minSize,this.maxSize, name, getRandomInt(this.minDuration,this.maxDuration),this.rayon,this.center,this.ground,this.debug);
        three.init(this._treeModel);
        return three;
    }

    addTree(name)
    {
        var treeTmp = this.generateATree(name);
        this.forest.push(treeTmp);
    }

    removeTree()
    {
        
        var t = this.forest.pop();
        t.destroyTree();
    }

    getNumberOfTree()
    {
        return this.forest.length;
    }

    updateForest()
    {
        console.log("Update forest. Number: "+this.number+" actual size: "+this.forest.length);   
        if(this.number < this.forest.length)
        {
            console.log("remove tree");
            while(this.number < this.forest.length)
            {
                console.log("Update forest. Number: "+this.number+" actual size: "+this.forest.length);  
                this.removeTree();
            }
        }
        else if(this.number > this.forest.length)
        {
            while(this.number > this.forest.length)
            {
                this.addTree('pine '+this.forest.length);
            }
        }
    }
    
    update(delta) {

        for (var t of this.forest) {
            t.update(delta);
        }
    }

};