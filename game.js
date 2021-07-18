
//클래스들 및 너무 긴 상수들!
const types = [2, 4, 4, 4, 1, 2, 2];//각 블록의 타입들의 회전시 나올수 있는 모양의 수.

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black'];

const blocks = [
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
	
	check(x, y){
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				let temp = blocks[window.now.type][window.now.rotate % types[window.now.type]][i][j];
				
				if(temp == 1 && ((x + j > 9) || (x + j < 0))){
					return false;
				}//양옆으로 필드를 벗어남
				else if(temp == 1 && y + i > 19){
					return false;
				}
				else if(y + i < 20 && x + j < 10 && temp + this.board[y + i][x + j] == 2){
					return false;
				}//체크하는 방향으로 이동할시 블록과 겹침 ==> 다른 가능한 방향으로 이동하지 않을시 현재위치로 고정됨!
			}
		}
		return true;
	}
	
	fix(){
		for(let i=0; (i<4 && i + now.blockY < 20); i++){
			for(let j=0; (j<4 && now.blockX < 10); j++){
				if(1){
					this.board[i + now.blockY][j + now.blockX] = window.now.type;
					console.log(this.board);
				}
			}
		}
		//window.now = new block(rand(0, 6));
	}
	
	update(){
		if(this.check(window.now.nowX, window.now.nowY + 1) == true){
			window.now.drop();
		}
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
	
	rotate(){
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

	updateSize();
	window.blockL = canvas.height / 25;
	
	window.tetris = new field();
	console.log(tetris.board);
	play();
}	

function updateSize(){
	window.canvas.width = document.body.clientWidth;
	window.canvas.height = document.body.clientHeight;
}

// 게임로직에 관련된 함수들

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
	window.playing = setInterval(draw, 1000);
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

