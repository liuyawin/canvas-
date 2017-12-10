function SpriteSheetPainter(cells) {
    this.cells = cells || [];
    this.cellIndex = 0;
}

SpriteSheetPainter.prototype = {
    constructor: SpriteSheetPainter,

    advance: function () {
        if (this.cellIndex == this.cells.length - 1) {
            this.cellIndex = 0;
        } else {
            this.cellIndex++;
        }
    },

    paint: function (sprite, context) {
        var cell = this.cells[this.cellIndex];
        context.drawImage(spritesheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, cell.width, cell.height);
    }
}