var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d');
//绘制网格
function drawGrid(context, color, stepx, stepy) {
	context.strokeStyle = color;
	context.lineWidth = 0.5;

	for(var i = 0; i < context.canvas.width; i += stepx) {
		context.beginPath();
		context.moveTo(i, 0);
		context.lineTo(i, context.canvas.height);
		context.stroke();
	}

	for(var i = 0; i < context.canvas.height; i += stepy) {
		context.beginPath();
		context.moveTo(0, i);
		context.lineTo(context.canvas.width, i);
		context.stroke();
	}
}

drawGrid(context, 'lightgray', 10, 10);

//绘制参数
context.font = '48pt Helvetica';
context.strokeStyle = 'blue';
context.fillStyle = 'red';
context.lineWidth = 2;

//文字
context.strokeText('Stroke', 60, 110);
context.fillText('Fill', 440, 110);

context.strokeText('Stroke & Fill', 650, 110);
context.fillText('Stroke & Fill', 650, 110);

//矩形
context.lineWidth = 5;
context.beginPath();
context.rect(80, 150, 150, 100);
context.stroke();

context.beginPath();
context.rect(400, 150, 150, 100);
context.fill();

context.beginPath();
context.rect(750, 150, 150, 100);
context.stroke();
context.fill();

//开放圆弧
context.beginPath();
context.arc(150, 370, 60, 0, Math.PI * 3 / 2);
context.stroke();

context.beginPath();
context.arc(475, 370, 60, 0, Math.PI * 3 / 2);
context.fill();

context.beginPath();
context.arc(820, 370, 60, 0, Math.PI * 3 / 2);
context.stroke();
context.fill();

//闭合圆弧
context.beginPath();
context.arc(150, 550, 60, 0, Math.PI * 3 / 2);
context.closePath();
context.stroke();

context.beginPath();
context.arc(475, 550, 60, 0, Math.PI * 3 / 2);
context.closePath();
context.fill();

context.beginPath();
context.arc(820, 550, 60, 0, Math.PI * 3 / 2);
context.closePath();
context.stroke();
context.fill();
