var canvas = document.getElementById("canvas"),
	context = canvas.getContext('2d'),
	snapshotButton = document.getElementById("snapshotButton"),
	snapshotImage = document.getElementById("snapshotImage");
	
context.font = "38pt Arial";
context.fillStyle = "cornflowerblue";
context.strokeStyle = "blue";

context.fillText("Hello Canvas", canvas.width/2-150, canvas.height/2+15);
context.strokeText("Hello Canvas", canvas.width/2-150, canvas.height/2+15);

snapshotButton.onclick = function(e){
	var dataUrl;
	
	if (snapshotButton.value == "Take Snapshot") {
		dataUrl = canvas.toDataURL();
		snapshotImage.src = dataUrl;
		snapshotImage.style.display = "inline";
		canvas.style.display = "none";
		snapshotButton.value = "Return to Canvas";
	} else{
		canvas.style.display = "inline";
		snapshotImage.style.display = "none";
		snapshotButton.value = "Take Snapshot";
	}
}

