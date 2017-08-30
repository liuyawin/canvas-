var canvas = document.getElementById("canvas"),
	context = canvas.getContext('2d');
	
canvas.onmousedown = function(e){
	console.log("Mouse down!");
};

canvas.addEventListener('mouseup', function(e){
	console.log("Mouse up!");
});
















