var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    eraseAllBtn = document.getElementById('eraseAll'),
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    fillStyleSelect = document.getElementById('fillStyleSelect'),
    fillCheckbox = document.getElementById('fillCheckbox'),
    editCheckbox = document.getElementById('editCheckbox'),
    sidesSelect = document.getElementById('sidesSelect'),
    startAngleSelect = document.getElementById('startAngleSelect'),

    drawingSurfaceImageData,

    mousedown = {},
    rubberbandReact = {},

    dragging = false,
    draggingOffsetX,
    draggingOffsetY,

    sides = 8,
    startAngle = 0,

    guidewires = true,
    editing = false,
    polygons = [];

//Functions.......................
function drawGrid(color, stepX, stepY) {
    context.save();
    context.shadowColor = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.strokeStyle = color;
    context.fillStyle = '#FFF';
    context.lineWidth = 0.5;
    context.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

    for (var i = stepX + 0.5; i < canvas.width; i += stepX) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
    }

    for (var i = stepY + 0.5; i < canvas.height; i += stepY) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
    }

    context.restore();
}

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();//canvas元素的边界框
    return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(
        0, 0, canvas.width, canvas.height
    );
}

function restoreDrawingSurface() {
    context.putImageData(drawingSurfaceImageData, 0, 0);
}

function drawPolygon(polygon) {
    context.beginPath();
    polygon.createPath(context);
    polygon.stroke(context);

    if (fillCheckbox.checked) {
        polygon.fill(context);
    }
}

function updateRubberbandRectangle(loc) {
    rubberbandReact.width = Math.abs(loc.x - mousedown.x);
    rubberbandReact.height = Math.abs(loc.y - mousedown.y);

    if (loc.x > mousedown.x) {
        rubberbandReact.left = mousedown.x;
    } else {
        rubberbandReact.left = loc.x;
    }

    if (loc.y > mousedown.y) {
        rubberbandReact.top = mousedown.y;
    } else {
        rubberbandReact.top = loc.y;
    }
}

function drawRubberbandShape(loc, sides, startAngle) {
    var polygon = new Polygon(mousedown.x, mousedown.y,
        rubberbandReact.width,
        parseInt(sidesSelect.value),
        (Math.PI / 180) * parseInt(startAngleSelect.value),
        context.strokeStyle,
        context.fillStyle,
        fillCheckbox.checked
    );

    drawPolygon(polygon);

    if (!dragging) {
        polygons.push(polygon);
    }
}

function updateRubberband(loc, sides, startAngle) {
    updateRubberbandRectangle(loc);
    drawRubberbandShape(loc, sides, startAngle);
}

function drawHorizontalLine(y) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(canvas.width, y + 0.5);
    context.stroke();
}

function drawVerticalLine(x) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, canvas.height);
    context.stroke();
}

function drawGuidewires(x, y) {
    context.save();
    context.strokeStyle = 'rgba(0, 0, 230, 0.4)';
    context.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);
    context.restore();
}

function drawPolygons() {
    polygons.forEach(function (polygon) {
        drawPolygon(polygon);
    });
}

function startDragging(loc) {
    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
}

function startEditing() {
    canvas.style.cursor = 'pointer';
    editing = true;
}

function stopEditing() {
    canvas.style.cursor = 'crosshair';
    editing = false;
}

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    e.preventDefault();

    if (editing) {
        polygons.forEach(function (polygon) {
            if (context.isPointInPath(loc.x, loc.y)) {
                startDragging(loc);
                dragging = polygon;
                draggingOffsetX = loc.x - polygon.x;
                draggingOffsetY = loc.y - polygon.y;
                return;
            }
        });
    } else {
        startDragging(loc);
        dragging = true;
    }
}

canvas.onmousemove = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);

    e.preventDefault();

    if (editing && dragging) {
        dragging.x = loc.x - draggingOffsetX;
        dragging.y = loc.y - draggingOffsetY;
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid('lightgray', 10, 10);
        drawPolygons();
    } else {
        if (dragging) {
            restoreDrawingSurface();
            updateRubberband(loc, sides, startAngle);

            if (guidewires) {
                drawGuidewires(mousedown.x, mousedown.y);
            }
        }
    }
}

canvas.onmouseup = function (e) {
    var loc = windowToCanvas(e.clientX, e.clientY);
    dragging = false;

    //e.preventDefault();

    if (editing) {
        
    }else{
        restoreDrawingSurface();
        updateRubberband(loc);
    }
}

eraseAllBtn.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid('lightgray', 10, 10);
    saveDrawingSurface();
}

strokeStyleSelect.onchange = function(){
    context.strokeStyle = strokeStyleSelect.value;
}

fillStyleSelect.onchange = function(){
    context.fillStyle = fillStyleSelect.value;
}

editCheckbox.onchange = function(){
    if (editCheckbox.checked) {
        startEditing();
    }else{
        stopEditing();
    }
}

//Initialization......................
context.strokeStyle = strokeStyleSelect.value;
context.fillStyle = fillStyleSelect.value;

// context.shadowColor = 'rgba(0, 0, 0, 0.4)';
// context.shadowOffsetX = 2;
// context.shadowOffsetY = 2;
// context.shadowBlur = 4;

drawGrid('lightgray', 10, 10);