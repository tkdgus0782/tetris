
//클래스들 및 너무 긴 상수들!

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
	]
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
		this.now = new block(rand(0, 6));
		this.timer = setInterval(drop, 1000);//1초마다 떨어지게 함.
	}
		
	check(x, y){
		
	}
	
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
		this.nowY -= 1;
	}
}


//초기화및 화면 관련 함수

function init(){
	window.canvas = document.getElementById('screen');
	window.scr = canvas.getContext('2d');
	
	d = new field();
	
	window.addEventListener('resize', updateSize);

	updateSize();

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
	window.playing = setInterval(draw, 10);
}

function draw(){
	scr.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();
}

function drawBackground(){
	scr.fillStyle = 'rgba(100, 100, 100, 0.7)';
	scr.fillRect(0,0,canvas.width,canvas.height);
}

