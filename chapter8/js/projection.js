function Projection(min, max){
    this.min = min;
    this.max = max;
}

Projection.prototype = {
    constructor: Projection,

    overlaps: function(projection){
        return this.max > projection.min && projection.max > this.min;
    }
}