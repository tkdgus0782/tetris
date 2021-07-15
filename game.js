

function init(){
	window.canvas = document.getElementById('game');
	window.scr = canvas.getContext('2d');
	
	window.addEventListener('resize', updateSize);

	updateSize();

	play();
}	

function updateSize(){
	window.canvas.width = document.body.clientWidth;
	window.canvas.height = document.body.clientHeight;
}

function play(){
	window.playing = setInterval(draw, 10);
}

function gameover(){
	clearInterval(playing);
	scr.clearRect(0,0,canvas.width,canvas.height);
	scr.fillStyle = 'black';
	scr.font = '60px consolas';
	scr.fillText('GAME OVER!!', canvas.width/3, canvas.height/2);
}

function draw(){
	scr.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();
}

function drawBackground(){
	scr.fillStyle = 'rgba(100, 100, 100, 0.7)';
	scr.fillRect(0,0,canvas.width,canvas.height);
}

