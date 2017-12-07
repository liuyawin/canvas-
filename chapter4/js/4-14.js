//黑白滤镜
var canvas = document.getElementById('canvas');
context = canvas.getContext('2d'),
    offscreenCanvas = document.createElement('canvas'),
    offscreenContext = offscreenCanvas.getContext('2d'),
    image = new Image();

offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;
image.src = 'imgs/boat.png';
image.onload = function () {
    offscreenContext.drawImage(image, 0, 0, canvas.width, canvas.height);
    var imageData = offscreenContext.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < imageData.data.length - 4; i += 4) {
        var average = (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3;
        imageData.data[i] = average;
        imageData.data[i + 1] = average;
        imageData.data[i + 2] = average;
    }
    context.putImageData(imageData, 0, 0);
}