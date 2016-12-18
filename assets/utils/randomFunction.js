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