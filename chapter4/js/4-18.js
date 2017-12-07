var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    offscreenCanvas = document.createElement('canvas'),
    offscreenContext = offscreenCanvas.getContext('2d'),
    image = new Image(),
    sunglassButton = document.getElementById('sunglassButton'),
    sunglassOn = false,
    sunglassFilter = new Worker('js/sunglassFilter.js'),

    LENS_RADIUS = canvas.width / 5;

//Funtion...........
function drawLenses(leftLensLocation, rightLensLocation) {
    context.save();
    context.beginPath();

    context.arc(leftLensLocation.x, leftLensLocation.y, LENS_RADIUS, 0, Math.PI * 2, false);
    context.stroke();

    context.moveTo(rightLensLocation.x, rightLensLocation.y);
    context.arc(rightLensLocation.x, rightLensLocation.y, LENS_RADIUS, 0, Math.PI * 2, false);
    context.stroke();

    context.clip();

    context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);

    context.restore();
}

function drawWire(center) {
    context.beginPath();
    context.moveTo(center.x - LENS_RADIUS / 4, center.y - LENS_RADIUS / 2);

    context.quadraticCurveTo(center.x, center.y - LENS_RADIUS + 20, center.x + LENS_RADIUS / 4, center.y - LENS_RADIUS / 2);//绘制一条二次贝塞尔曲线
    context.stroke();
}

function drawConnectors(center) {
    context.beginPath();

    context.fillStyle = 'sliver';
    context.strokeStyle = 'rgba(0,0,0,0.4)';
    context.lineWidth = 2;

    context.arc(center.x - LENS_RADIUS / 4, center.y - LENS_RADIUS / 2, 4, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();

    context.beginPath();
    context.arc(center.x + LENS_RADIUS / 4, center.y - LENS_RADIUS / 2, 4, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
}

function putSunglassOn() {
    var imagedata,
        center = {
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        leftLensLocation = {
            x: center.x - LENS_RADIUS - 10,
            y: center.y
        },
        rightLensLocation = {
            x: center.x + LENS_RADIUS + 10,
            y: center.y
        },
        imagedata = context.getImageData(0, 0, canvas.width, canvas.height);

    sunglassFilter.postMessage(imagedata);

    sunglassFilter.onmessage = function (e) {
        offscreenContext.putImageData(e.data, 0, 0);
        drawLenses(leftLensLocation, rightLensLocation);
        drawWire(center);
        drawConnectors(center);
    }
}

function drawOriginImage() {
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
}

//Event Handler
sunglassButton.onclick = function () {
    if (sunglassOn) {
        sunglassButton.value = 'Suglasses';
        drawOriginImage();
        sunglassOn = false;
    } else {
        sunglassButton.value = 'Original picture';
        putSunglassOn();
        sunglassOn = true;
    }
}

offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

image.src = 'imgs/boat.png';
image.onload = function () {
    drawOriginImage();
}
