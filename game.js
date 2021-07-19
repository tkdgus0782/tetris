
//클래스들 및 너무 긴 상수들!
const types = [0, 2, 4, 4, 4, 1, 2, 2];//각 블록의 타입들의 회전시 나올수 있는 모양의 수.

const colors = ['white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black'];

const blocks = [
	[
		[
			[]
		]
	],
	[
		[
			[1, 0, 0, 0],
	 		[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0]
		],	
		[
			[1, 1, 1, 1],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	],
	[
		[
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[1, 1, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[1, 1, 1, 0],
			[1, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[1, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[0, 0, 1, 0],
			[1, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	],	
	[
		[
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[1, 1, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[1, 0, 0, 0],
			[1, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[1, 1, 0, 0],
			[1, 0, 0, 0],
			[1, 0, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[1, 1, 1, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	],
	[
		[
			[0, 1, 0, 0],
			[1, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[0, 1, 0, 0],
			[1, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[0, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[0, 0, 0, 0],
			[1, 1, 1, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		]
	],
	[
		[
			[1, 1, 0, 0],
			[1, 1, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	],
	[
		[
			[0, 1, 1, 0],
			[1, 1, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[1, 0, 0, 0],
			[1, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 0, 0]
		]
	],
	
	[
		[
			[1, 1, 0, 0],
			[0, 1, 1, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		[
			[0, 1, 0, 0],
			[1, 1, 0, 0],
			[1, 0, 0, 0],
			[0, 0, 0, 0]
		]
	]
	
	
]; //블록을 4*4 회전포함 3차원배열로 저장! 한것을 배열로 저장 == 4차원배열..

class field{
	constructor(){
		this.board = new Array(); //필드의 상태!
		for(let i=0; i<20; i++){
			this.board.push([0]);
			for(let j=0; j<9; j++){
				this.board[i].push(0);
			}
		}
		window.now = new block(rand(0, 6));
		window.timer = setInterval(() => {this.update();}, 500);//1초마다 떨어지게 함.
	}
	
	check(x, y, r){
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				let temp = blocks[window.now.type][r % types[window.now.type]][i][j];
				
				if(temp == 1 && ((x + j > 9) || (x + j < 0))){
					return false;
				}//양옆으로 필드를 벗어남
				else if(temp == 1 && y + i > 19){
					return false;
				}
				else if(y + i < 20 && x + j < 10 && temp==1 && this.board[y + i][x + j] != 0){
					return false;
				}//체크하는 방향으로 이동할시 블록과 겹침 ==> 다른 가능한 방향으로 이동하지 않을시 현재위치로 고정됨!
			}
		}
		return true;
	}
	
	fix(){
		console.log(now);
		console.log(this.board);
		for(let i=0; (i<4 && i + now.nowY < 20); i++){
			for(let j=0; (j<4 && j + now.nowX < 10); j++){
				if(blocks[now.type][now.rotate % types[now.type]][i][j]){
					this.board[i + now.nowY][j + now.nowX] = window.now.type;
				}
			}
		}
		window.now = new block(rand(1, 7));
	}
	
	async update(){
		if(this.check(window.now.nowX, window.now.nowY + 1, window.now.rotate) == true){
			window.now.drop();
		}//내려갈수 있다면? 내려간다.
		else{
			this.fix();
		}
	}//1초마다 필드를 업데이트!

}

class block{ // 현재 조종하는중인 테트리스 블록에 관한 클래스~
	constructor(type){
		this.type = type;//블록 종류
		this.rotate = 0;//총 회전 수
		this.nowX = 0;
		this.nowY = 0;
	}
	
	goLeft(){
		this.nowX -= 1;
	}
	
	goRight(){
		this.nowX += 1;
	}
	
	goRotate(){
		this.rotate += 1;
	}
	
	drop(){
		this.nowY += 1;
	}
}


//초기화및 화면 관련 함수

function init(){
	window.canvas = document.getElementById('screen');
	window.scr = canvas.getContext('2d');
	
	window.addEventListener('resize', updateSize);
	window.addEventListener('keydown', (e) => {clicked(e);});
	window.addEventListener('keyup', (e) => {unclicked(e);});

	updateSize();
	window.blockL = canvas.height / 25;
	window.Flag = [0, 0, 0, 0];
	
	window.tetris = new field();
	console.log(tetris.board);
	play();
}	

function updateSize(){
	window.canvas.width = document.body.clientWidth;
	window.canvas.height = document.body.clientHeight;
}

// 게임로직에 관련된 함수들

function clicked(click){
	if(click.key == "ArrowDown"){
		if(Flag[0] == 0){
			clearInterval(timer);
			timer = setInterval(() => {tetris.update();}, 250);
			Flag[0]++;
		}
	}//하강
	else if(click.key == "ArrowLeft"){
		if(tetris.check(now.nowX - 1, now.nowY, now.rotate) && Flag[1] == 0){
			now.goLeft();
		}
		Flag[1]++;
	}//왼쪽
	else if(click.key == "ArrowRight"){
		if(tetris.check(now.nowX  + 1, now.nowY, now.rotate)  && Flag[2] == 0){
			now.goRight();
		}
		Flag[2]++;
	}//오른쪽
	else if(Flag[3] == 0){
		if(tetris.check(now.nowX, now.nowY, now.rotate+1)  && Flag[3] == 0){
			now.goRotate();
		}
		Flag[3]++;
	}//회전
}

function unclicked(click){
	if(click.key == "ArrowDown"){
		clearInterval(timer);
		timer = setInterval(() => {tetris.update();}, 500);
		Flag[0] = 0;
	}//하강
	else if(click.key == "ArrowLeft"){
		Flag[1] = 0;
	}//왼쪽
	else if(click.key == "ArrowRight"){
		Flag[2] = 0;
	}//오른쪽
	else{
		Flag[3] = 0;
	}//회전
}

function rand(m, M){
	return Math.floor(Math.random()*(M-m)) + m;
}

function gameover(){
	clearInterval(playing);
	scr.clearRect(0,0,canvas.width,canvas.height);
	scr.fillStyle = 'black';
	scr.font = '60px consolas';
	scr.fillText('GAME OVER!!', canvas.width/3, canvas.height/2);
}

//게임의 요소의 출력에 관련된 함수들

function play(){
	window.playing = setInterval(draw, 10);
}

function draw(){
	scr.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();
	drawField();
}

function drawBackground(){
	scr.fillStyle = 'rgba(100, 100, 100, 0.7)';
	scr.fillRect(0,0,canvas.width,canvas.height);
}

function drawField(){
	for(let i=0; i<20; i++){
		for(let j=0; j<10; j++){
			scr.fillStyle = 'white';
			scr.fillRect(j*blockL, i*blockL, blockL, blockL);
		}
	}
	
	for(let i=0; i<20; i++){
		for(let j=0; j<10; j++){
			if(tetris.board[i][j])
			{
				scr.fillStyle = colors[tetris.board[i][j]];
				scr.fillRect(j*blockL, i*blockL, blockL, blockL);
			}
		}
	}
	
	for(let i=0; i<4; i++){
		for(let j=0; j<4; j++){
			scr.fillStyle = colors[now.type];
			if(blocks[now.type][now.rotate % types[now.type]][i][j]){
				scr.fillRect((now.nowX+j)*blockL, (now.nowY+i)*blockL, blockL, blockL);
			}
		}
	}
}