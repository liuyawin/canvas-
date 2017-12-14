function Shape() {
    this, x = undefined;
    this.y = undefined;

    this.strokeStyle = 'rgba(255, 253, 208, 0.9)';
    this.fillStyle = 'rgba(147, 197, 114, 0.8)';
}

//Prototype
Shape.prototype = {
    constructor: Shape,

    collidesWith: function (shape) {
        var axes = this.getAxes().concat(shape.getAxes());
        return !this.separationOnAxes(axes, shape);
    },

    separationOnAxes: function (axes, shape) {
        for (var i = 0; i < axes.length; ++i) {
            var axis = axes[i];
            projection1 = shape.project(axis);
            projection2 = this.project(axis);

            if (!projection1.overlaps(projection2)) {
                return true;
            }
        }
        return false;
    },

    project: function (axis) {

    },

    getAxes: function () {
        var v1 = new Vector(),
            v2 = new Vector(),
            axes = [];

        for (var i = 0; i < this.points.length - 1; i++) {
            v1.x = this.points[i].x;
            v1.y = this.points[i].y;

            v2.x = this.points[i + 1].x;
            v2.y = this.points[i + 1].y;

            axes.push(v1.edge(v2).normal());
        }

        v1.x = this.points[this.points.length - 1].x;
        v1.y = this.points[this.points.length - 1].y;

        v2.x = this.points[0].x;
        v2.y = this.points[0].y;

        axes.push(v1.edge(v2).normal());

        return axes;
    },

    move: function (dx, dy) {

    },

    createPath: function (context) {

    },

    fill: function (context) {
        context.save();
        context.fillStyle = this.fillStyle;
        this.createPath(context);
        context.fill();
        context.restore();
    },

    stroke: function (context) {
        context.save();
        context.strokeStyle = this.strokeStyle;
        this.createPath(context);
        context.stroke();
        context.restore();
    },

    isPointInPath: function (context, x, y) {
        this.createPath(context);
        return context.isPointInPath(x, y);
    }
}