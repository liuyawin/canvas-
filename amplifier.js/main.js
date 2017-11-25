var canvas = document.getElementById('canvas');
var resetBtn = document.getElementById('reset');
var context = canvas.getContext('2d');

//显示图片
var img = new Image();
img.onload = function(){
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

img.src = 'timg.jpg';

//绑定事件
canvas.onmouseenter = function(){
    //console.log('mouseenter')
    window.addEventListener('mousemove', handleMouseMove);
}

canvas.onmouseleave = function(){
    //console.log('mouseleave')
    window.removeEventListener('mousemove', handleMouseMove);
}

function handleMouseMove(e){
    console.log(e.clientX, e.clientY);
}