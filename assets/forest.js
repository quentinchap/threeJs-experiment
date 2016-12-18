
function getRandomPos(limit) {
    var sign = Math.random();

    if (sign >= 0.5) {
        return Math.random() * limit;
    }
    return -Math.random() * limit;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var FOREST = {
    forest: [],
    GenerateForest: function (scene, rayon, number, minSize, maxSize,minDuration,maxDuration) {
        var i = 0;
        console.log(number);
        while (i < number) {
            i++;
            this.forest.push(new TREE(scene, getRandomInt(minSize,maxSize), 'pine' + i, getRandomInt(minDuration,maxDuration),getRandomPos(rayon),getRandomPos(rayon), 0));
        }

        //this.forest.push(new TREE(scene, 15, 'pine1', 4, 30, 10, 0,0,Math.PI/4,0) );
        //this.forest.push(new TREE(scene, 10, 'pine2', 6, -60, 60, 0));

        //this.forest[0].Init(scene, 15, 'pine1', 4, 30, 10, 0);
        //this.forest[1].Init(scene, 10, 'pine2', 4, -60, 60, 0);
    },
    Update: function (delta) {
        for (var t of this.forest) {
            //console.log(t.trees);
            t.Update(delta);
        }
    }

};