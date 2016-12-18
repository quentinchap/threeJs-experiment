class Forest {
    
    constructor (scene, rayon, number, minSize, maxSize,minDuration,maxDuration) {
        var i = 0;
        this.forest = [];
        this.scene = scene;
        this.rayon = rayon;
        this.number = number;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.minDuration = minDuration;
        this.maxDuration = maxDuration;

        while (i < this.number) {
            i++;
            this.addTree('pine '+i);
        }
    }

    generateATree(name)
    {
        return new Tree(this.scene, getRandomInt(this.minSize,this.maxSize), name, getRandomInt(this.minDuration,this.maxDuration),getRandomPos(this.rayon),getRandomPos(this.rayon), 0);
    }

    addTree(name)
    {
        this.forest.push(this.generateATree(name));
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
            //console.log(t.trees);
            t.update(delta);
        }
    }

};