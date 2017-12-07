//浮雕滤镜
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
    var data = imageData.data;
    var width = imageData.width;
    var length = data.length;
    for (var i = 0; i < length; i++) {
        if (i <= length - width * 4) {
            if ((i + 1) % 4 !== 0) {
                if ((i + 4) % (width * 4) == 0) {
                    data[i] = data[i - 4];
                    data[i + 1] = data[i - 3];
                    data[i + 2] = data[i - 2];
                    data[i + 3] = data[i - 1];
                    i += 4;
                } else {
                    data[i] = 244 / 2 + 2 * data[i] - data[i + 4] - data[i + width * 4];
                }
            }
        } else {
            if ((i + 1) % 4 !== 0) {
                data[i] = data[i - width * 4];
            }
        }
    }
    context.putImageData(imageData, 0, 0);
}