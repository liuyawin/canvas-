var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    paused = true,
    discus = [
        {
            x: 150,
            y: 250,
            lastX: 150,
            lastY: 250,
            radius: 25,
            velocityX: -3.2,
            velocityY: 3.5,
            innerColor: 'rgba(255, 255, 0, 1)',
            middleColor: 'rgba(255,155,0,0.7)',
            outterColor: 'rgba(255,255,0,0.5)',
            strokeStyle: 'gray'
        },
        {
            x: 50,
            y: 150,
            lastX: 50,
            lastY: 150,
            radius: 25,
            velocityX: 2.2,
            velocityY: 2.5,
            innerColor: 'rgba(100, 145, 230, 1)',
            middleColor: 'rgba(100, 145, 230,0.7)',
            outterColor: 'rgba(100, 145, 230,0.5)',
            strokeStyle: 'blue'
        },
        {
            x: 150,
            y: 75,
            lastX: 150,
            lastY: 75,
            radius: 25,
            velocityX: 1.2,
            velocityY: 1.5,
            innerColor: 'rgba(255, 0, 0, 1)',
            middleColor: 'rgba(255, 0, 0,0.7)',
            outterColor: 'rgba(255, 0, 0,0.5)',
            strokeStyle: 'red'
        },
    ],
    numDiscs = discus.length,
    animateButton = document.getElementById('animateButton');

//Funtions.......
function update() {
    var disc = null;
    for (var i = 0; i < numDiscs; ++i) {
        disc = discus[i];

        if (disc.x + disc.velocityX + disc.radius > canvas.width || disc.x + disc.velocityX - disc.radius < 0) {
            disc.velocityX = -disc.velocityX;
        }
        if (disc.y + disc.velocityY + disc.radius > canvas.height || disc.y + disc.velocityY - disc.radius < 0) {
            disc.velocityY = -disc.velocityY;
        }

        disc.x += disc.velocityX;
        disc.y += disc.velocityY;
    }
}

function draw(){
    var disc = null;
    for (var i = 0; i < numDiscs; i++) {
        disc = discus[i];

        var gradient = context.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius);
        gradient.addColorStop(0.3, disc.innerColor);
        gradient.addColorStop(0.3, disc.middleColor);
        gradient.addColorStop(0.3, disc.outterColor);

        context.save();
        context.beginPath();
        context.arc(disc.x, disc.y, disc.radius, 0, Math.PI*2, false);
        context.fillStyle = gradient;
        context.strokeStyle = disc.strokeStyle;
        context.fill();
        context.stroke();
        context.restore();
    }
}

function animate(time){
    if (!paused) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        update();
        draw();

        context.fillStyle = 'cornflowerblue';
        context.fillText(calculateFps().toFixed() + 'fps', 20, 60);

        window.requestNextAnimationFrame(animate)
    }
}

var lastTime = 0;
function calculateFps(){
    var now = +new Date(),
        fps = 1000 / (now - lastTime);
    
    lastTime = now;
    return fps;
}

animateButton.onclick = function(e){
    paused = paused ? false : true;
    if (paused) {
        animateButton.innerHTML = 'Animate';
    }else{
        window.requestNextAnimationFrame(animate);
        animateButton.innerHTML = 'Pause';
    }
}

context.font = '48px Helvetica';