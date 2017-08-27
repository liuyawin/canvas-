var canvas = document.getElementById("canvas"),
	context = canvas.getContext('2d');
	
context.font = "38pt Arial";
context.fillStyle = "cornflowerblue";
context.strokeStyle = "blue";

context.fillText("Hello Canvas", canvas.width/2-150, canvas.height/2+15);
context.strokeText("Hello Canvas", canvas.width/2-150, canvas.height/2+15);

//当元素本身大小不符合其绘图表面的大小时，
//浏览器会对绘图表面进行缩放，使其符合元素的大小。
var canvas2 = document.getElementById("canvas2"),
	context2 = canvas2.getContext('2d');
	
context2.font = "38pt Arial";
context2.fillStyle = "cornflowerblue";
context2.strokeStyle = "blue";

context2.fillText("Hello Canvas", canvas2.width/2-150, canvas2.height/2+15);
context2.strokeText("Hello Canvas", canvas2.width/2-150, canvas2.height/2+15);

