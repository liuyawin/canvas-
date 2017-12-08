var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    img = new Image();

img.onload = function(){
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    context.save();
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 300, 0, Math.PI * 2, false);
    context.clip();

    context.fillStyle = 'blue';
    context.font = '128px Arial'
    context.fillText('HAHAHAhahaha', canvas.width / 2, canvas.height / 2);

    context.restore();

}

img.src = 'imgs/boat.png';