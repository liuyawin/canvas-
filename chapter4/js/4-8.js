var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    offscreenCanvas = document.createElement('canvas'),
    offscreenContext = offscreenCanvas.getContext('2d'),

    img = new Image(),

    scaleOutput = document.getElementById('scaleOutput'),
    canvasRadio = document.getElementById('canvasRadio'),
    imageRadio = document.getElementById('imageRadio'),
    scaleSlider = document.getElementById('scaleSlider'),

    scale = scaleSlider.value,
    MIN_SCALE = 1.0,
    MAX_SCALE = 3.0;

//Function
function drawScaled() {
    var w = canvas.width,
        h = canvas.height,
        sw = w * scale,
        sh = h * scale;

    context.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
}

function drawScaleText(value) {
    var text = parseFloat(value).toFixed(2);

    scaleOutput.innerText = text;
}

function drawWatermark(context) {
    var lineOne = 'Copyright';
    var lineTwo = 'Liuyawin';
    var textMetrics;
    var FONT_HEIGHT = 128;

    context.save();
    context.font = FONT_HEIGHT + 'px Arial';

    textMetrics = context.measureText(lineOne);

    context.globalAlpha = 0.6;
    context.translate(canvas.width / 2, canvas.height / 2 - FONT_HEIGHT / 2);

    context.fillText(lineOne, -textMetrics.width / 2, 0);
    context.strokeText(lineOne, -textMetrics.width / 2, 0);

    textMetrics = context.measureText(lineTwo);
    context.fillText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT);
    context.strokeText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT);

    context.restore();
}

scaleSlider.onchange = function (e) {
    scale = e.target.value;

    if (scale < MIN_SCALE) {
        scale = MIN_SCALE;
    } else if (scale > MAX_SCALE) {
        scale = MAX_SCALE;
    }

    drawScaled();
    drawScaleText(scale);
}

offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

img.src = 'imgs/boat.png';
img.onload = function(){
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    offscreenContext.drawImage(img, 0, 0, canvas.width, canvas.height);

    drawWatermark(context);
    drawWatermark(offscreenContext);
    drawScaleText(scaleSlider.value);
}