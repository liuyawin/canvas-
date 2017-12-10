var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

context.strokeStyle = 'rgba(240, 0, 0 ,0.3)';
context.save();
context.beginPath();
context.translate(50, 50);
context.strokeRect(0, 0, 100, 80);
context.restore();

context.beginPath();
context.save();
context.rotate(Math.PI / 4);
context.strokeRect(220, 60, 100, 80);
context.moveTo(0, 0);
context.lineTo(canvas.width, 0);
context.lineWidth = 0.5;
context.stroke();
context.restore();

context.beginPath();
context.save();
context.strokeRect(220, 60, 100, 80);