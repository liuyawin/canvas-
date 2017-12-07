var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    fontSelect = document.getElementById('font'),
    sizeSelect = document.getElementById('size'),
    strokeStyleSelect = document.getElementById('strokeStyle'),
    fillStyleSelect = document.getElementById('fillStyle'),

    drawingSurfaceImageData,

    blinkingInterval,
    line,
    BLINK_TIME = 1000,
    BLINK_OFF = 300,

    cursor = new TextCursor();

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();

    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height),
    }
}

function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function setFont() {
    context.font = sizeSelect.value + 'px ' + fontSelect.value;
}

function blinkCursor(x, y) {
    clearInterval(blinkingInterval);
    blinkingInterval = setInterval(function () {
        cursor.erase(context, drawingSurfaceImageData);

        setTimeout(function () {
            if (cursor.left == x && cursor.top + cursor.getHeight(context) == y) {
                cursor.draw(context, x, y);
            }

        }, 300);
    }, 1000);
}

function moveCursor(x, y) {
    cursor.erase(context, drawingSurfaceImageData);
    saveDrawingSurface();
    context.putImageData(drawingSurfaceImageData, 0, 0);

    cursor.draw(context, x, y);
    blinkCursor(x, y);
}

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY),
        fontHeight = context.measureText('W').width;

        fontHeight += fontHeight / 6,
        line = new TextLine(loc.x, loc.y);

    moveCursor(loc.x, loc.y);
}

fillStyleSelect.onchange = function(){
    cursor.fillStyle = fillStyleSelect.value;
    context.fillStyle = fillStyleSelect.value;
}

strokeStyleSelect.onchange = function(){
    cursor.strokeStyle = strokeStyleSelect.value;
    context.strokeStyle = strokeStyleSelect.value;
}

document.onkeydown = function(e){
    if (e.keyCode === 8 || e.keyCode === 13) {
        e.preventDefault();
    }
    if (e.keyCode === 8) {
        context.save();

        line.erase(context, drawingSurfaceImageData);
        line.removeCharacterBeforeCharet();

        moveCursor(line.left + line.getWidth(context), line.bottom);

        line.draw(context);
        context.restore();
    }
}

document.onkeypress = function(e){
    var key = String.fromCharCode(e.which);

    if (e.keyCode != 8 && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();

        context.save();

        line.erase(context, drawingSurfaceImageData);
        line.insert(key);

        moveCursor(line.left + line.getWidth(context), line.bottom);

        line.draw(context);
        context.restore();
    }
}

fontSelect.onchange = setFont;
sizeSelect.onchange = setFont;

cursor.fillStyle = fillStyleSelect.value;
context.fillStyle = fillStyleSelect.value;

cursor.strokeStyle = strokeStyleSelect.value;
context.strokeStyle = strokeStyleSelect.value;

context.fontWith = 2.0;

setFont();
saveDrawingSurface();