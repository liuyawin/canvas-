var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	gradient = context.createLinearGradient(0, 0, canvas.width, 0);

gradient.addColorStop(0, 'blue');
gradient.addColorStop(0.25, 'white');
gradient.addColorStop(0.5, 'purple');
gradient.addColorStop(0.75, 'red');
gradient.addColorStop(1, 'yellow');

context.fillStyle = gradient;
context.rect(0, 0, canvas.width, canvas.height);
context.fill();

var canvas2 = document.getElementById('canvas2'),
	context2 = canvas2.getContext('2d'),
	gradient2 = context2.createRadialGradient(canvas2.width / 2, canvas2.height, 10,
		canvas2.width / 2, 0, 100);

gradient2.addColorStop(0, 'blue');
gradient2.addColorStop(0.25, 'white');
gradient2.addColorStop(0.5, 'purple');
gradient2.addColorStop(0.75, 'red');
gradient2.addColorStop(1, 'yellow');

context2.fillStyle = gradient2;
context2.rect(0, 0, canvas2.width, canvas2.height);
context2.fill();