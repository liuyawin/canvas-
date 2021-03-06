var canvas = document.getElementById("canvas"),
	context = canvas.getContext('2d'),
	readout = document.getElementById('readout'),
	spritesheet = new Image();

function windowToCanvas(canvas, x, y) {
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
}

function drawBackground() {
	var VERTICAL_LINE_SPACING = 12,
		i = context.canvas.height;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = 'red';
	context.lineWidth = 1;

	while(i > VERTICAL_LINE_SPACING * 4) {
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(context.canvas.width, i);
		context.stroke();
		i -= VERTICAL_LINE_SPACING;
	}
}

function drawSpritesheet() {
	context.drawImage(spritesheet, 0, 0);
}

function drawGuideLines(x, y) {
	context.strokeStyle = 'rgba(0, 0, 230, 0.8)';
	context.lineWidth = 0.5;
	drawVerticleLine(x);
	drawHorizontalLine(y);
}

function updateReadout(x, y) {
	readout.innerHTML = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
}

function drawVerticleLine(x) {
	context.beginPath();
	context.moveTo(x + 0.5, 0);
	context.lineTo(x + 0.5, context.canvas.height);
	context.stroke();
}

function drawHorizontalLine(y) {
	context.beginPath();
	context.moveTo(0, y + 0.5);
	context.lineTo(context.canvas.width, y + 0.5);
	context.stroke();
}

canvas.onmousemove = function(e) {
	var loc = windowToCanvas(canvas, e.clientX, e.clientY);

	drawBackground();
	drawSpritesheet();
	drawGuideLines(loc.x, loc.y);
	updateReadout(loc.x, loc.y);
}

spritesheet.src = './images/test.png';
spritesheet.onload = function(e) {
	drawSpritesheet();
}

drawBackground();