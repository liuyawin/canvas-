var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    TEXT_FILL_STYLE = 'rgba(100, 130, 240, 0.5)',
    TEXT_STROKE_STYLE = 'rgba(200, 0, 0, 0.7)',
    TEXT_SIZE = 64,

    circle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 200
    };

//Function...
function drawCircularText(string, startAngle, endAngle) {
    var radius = circle.radius,
        angleDecrement = (startAngle - endAngle) / (string.length - 1),
        angle = parseFloat(startAngle),
        index = 0,
        character;

    context.save();

    context.fillStyle = TEXT_FILL_STYLE;
    context.strokeStyle = TEXT_STROKE_STYLE;
    context.font = TEXT_SIZE + 'px Lucida Sans';

    while (index < string.length) {
        character = string.charAt(index);

        context.save();
        context.beginPath();
        context.translate(
            circle.x + Math.cos(angle) * radius,
            circle.y - Math.sin(angle) * radius
        );

        context.rotate(Math.PI / 2 - angle);

        context.fillText(character, 0, 0);
        context.strokeText(character, 0, 0);

        angle -= angleDecrement;
        index++;

        context.restore();
    }
}

context.textAlign = 'center';
context.textBaseline = 'middle';

drawCircularText('Clockwise around the circle', Math.PI * 2, Math.PI / 8);
