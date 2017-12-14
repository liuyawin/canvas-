function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    constructor: Vector,

    getMagnitude: function () {//求模
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2)
        );
    },

    add: function (vector) {//加
        var v = new Vector();
        v.x = this.x + vector.x;
        v.y = this.y + vector.y;

        return v;
    },

    substract: function (vector) {//减
        var v = new Vector();
        v.x = this.x - vector.x;
        v.y = this.y - vector.y;

        return v;
    },

    dotProduct: function (vector) {//点乘
        return this.x * vector.x + this.y * vector.y;
    },

    edge: function (vector) {
        return this.substract(vector);
    },

    perpendicular: function () {//返回边缘向量
        var v = new Vector();
        v.x = this.y;
        v.y = 0 - this.x;

        return v;
    },

    normalize: function () {//转换为单位向量
        var v = new Vector(0, 0),
            m = this.getMagnitude();//求模

        if (m != 0) {
            v.x = this.x / m;
            v.y = this.y / m;
        }

        return v;
    },

    normal: function () {//返回单位边缘法向量
        var p = this.perpendicular();
        return p.normalize();
    }
}