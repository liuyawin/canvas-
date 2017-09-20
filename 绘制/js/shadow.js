var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';

context.shadowColor = SHADOW_COLOR;
context.shadowOffsetX = 1;
context.shadowOffsetY = 1;
context.shadowBlur = 2;
context.lineWidth = 20;
context.strokeRect(75, 75, 160, 160);

context.shadowOffsetX = 4;
context.shadowOffsetY = 4;
context.shadowBlur = 5;
context.lineWidth = 20;
context.strokeRect(275, 75, 160, 160);

context.shadowOffsetX = -4;
context.shadowOffsetY = -4;
context.shadowBlur = 5;
context.lineWidth = 20;
context.strokeRect(475, 75, 160, 160);

//做一个橡皮擦效果
var ERASER_LINE_WIDTH = 5,
	ERASER_SHADOW_STYLE = 'blue',
	ERASER_STROLE_STYLE = 'rgba(0,0,255,0.6)';
ERASER_SHADOW_OFFSET = -5,
	ERASER_SHADOW_BLUR = 20,
	ERASER_RADIUS = 30;

function setEraserAttribute() {
	context.lineWidth = ERASER_LINE_WIDTH;
	context.shadowColor = ERASER_SHADOW_STYLE;
	context.shadowOffsetX = ERASER_SHADOW_OFFSET;
	context.shadowOffsetY = ERASER_SHADOW_OFFSET;
	context.shadowBlur = ERASER_SHADOW_BLUR;
	context.strokeStyle = ERASER_STROLE_STYLE;
}

function drawEraser(loc) {
	context.save();
	setEraserAttribute();

	context.beginPath();
	context.arc(loc.x, loc.y, ERASER_RADIUS, 0, Math.PI * 2, false);
	context.clip();
	context.stroke();

	context.restore();
}

function mousePosition(ev) {
	if(ev.pageX || ev.pageY) { //firefox、chrome等浏览器
		return {
			x: ev.pageX,
			y: ev.pageY
		};
	}
	return { // IE浏览器
		x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y: ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}

function mouseClick(ev) {
	ev = ev || window.event;
	var mousePos = mousePosition(ev);
	drawEraser(mousePos);
}
document.onclick = mouseClick;