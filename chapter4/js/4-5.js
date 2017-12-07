var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    image = new Image(),

    scaleOutput = document.getElementById('scaleOutput'),
    scaleSlider = document.getElementById('scaleSlider'),
    scale = scaleSlider.value,
    MIN_SCALE = 1.0,
    MAX_SCALE = 3.0;

//Function......
function drawScaled() {
    var w = canvas.width,
        h = canvas.height,
        sw = w * scale,
        sh = h * scale;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    drawWatermark();

    context.drawImage(canvas, 0, 0, canvas.width, canvas.height, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
}

function drawScaleText(value) {
    var text = parseFloat(value).toFixed(2);
    var percent = parseFloat(value - MIN_SCALE) / parseFloat(MAX_SCALE - MIN_SCALE);

    scaleOutput.innerHTML = text;
    percent = percent < 0.35 ? 0.35 : percent;
    scaleOutput.style.fontSize = percent * MAX_SCALE / 1.5 + 'em';
}

function drawWatermark() {
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

//Initialization......
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'yellow';
context.shadowColor = 'rgba(50,50,50,1.0)';
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 10;

var glassSize = 150;
// var scale = 1.0;

image.src = 'imgs/boat.png';
image.onload = function () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    drawWatermark();
    drawScaleText(scaleSlider.value);
}