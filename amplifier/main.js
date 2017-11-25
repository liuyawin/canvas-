var canvas = document.getElementById('canvas');
var resetBtn = document.getElementById('reset');
var mask = document.getElementById('mask');
var maskRec = {};
var mousedown = {};
var context = canvas.getContext('2d');
var dragging = false;

//显示图片
var img = new Image();
img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

img.src = 'timg.jpg';

//绑定事件
canvas.onmouseenter = function () {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
}

canvas.onmouseleave = function () {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mouseup', handleMouseUp);
}

resetBtn.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

//处理鼠标移动事件
function handleMouseMove(e) {
    var moveX = e.clientX;
    var moveY = e.clientY;

    e.preventDefault();
    if (dragging) {
        updateMask(moveX, moveY);
    }
    //console.log(e.clientX, e.clientY);
}

//处理鼠标down事件
function handleMouseDown(e) {
    var startX = e.clientX;
    var startY = e.clientY;

    e.preventDefault();
    maskStart(startX, startY);
    //console.log(startX, startY);
}

//处理鼠标up事件
function handleMouseUp(e) {
    var endX = e.clientX;
    var endY = e.clientY;

    e.preventDefault();
    maskEnd(endX, endY);
    //console.log(endX, endY);
}

function maskStart(x, y) {
    mousedown.x = x;
    mousedown.y = y;

    maskRec.left = mousedown.x;
    maskRec.right = mousedown.y;

    moveMask();
    showMask();

    dragging = true;
}

function updateMask(x, y) {
    maskRec.left = x < mousedown.x ? x : mousedown.x;
    maskRec.top = y < mousedown.y ? y : mousedown.y;

    maskRec.width = Math.abs(x - mousedown.x);
    maskRec.height = Math.abs(y - mousedown.y);

    moveMask();
    resizeMask();
}

function maskEnd(x, y) {
    var bbox = canvas.getBoundingClientRect();

    try {
        context.drawImage(
            canvas,
            maskRec.left - bbox.left,
            maskRec.top - bbox.top,
            maskRec.width,
            maskRec.height,
            0, 0, canvas.width, canvas.height
        );
    } catch (e) {
        console.log('Error: ', e)
    }

    resetMask();

    mask.style.width = 0;
    mask.style.height = 0;

    hideMask();

    dragging = false;
}

function moveMask() {
    mask.style.top = maskRec.top + 'px';
    mask.style.left = maskRec.left + 'px';
}

function showMask() {
    mask.style.display = 'inline';
}

function resizeMask() {
    mask.style.width = maskRec.width + 'px';
    mask.style.height = maskRec.height + 'px';
}

function resetMask() {
    maskRec = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    };
}

function hideMask() {
    mask.style.display = 'none';
}