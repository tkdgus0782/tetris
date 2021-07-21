
//클래스들 및 너무 긴 상수들!
const types = [0, 2, 4, 4, 4, 1, 2, 2];//각 블록의 타입들의 회전시 나올수 있는 모양의 수.

const colors = ['white', 
				'red', 
				'orange', 
				'yellow', 
				'green', 
				'blue', 
				'purple', 
				'black'
			   ];

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
		window.timer = setInterval(() => {this.update();}, 500);//0.5초마다 떨어지게 함.
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
	
	checkLine(now){
		let flag = true;
		for(let i=0; i<10; i++){
			(this.board[now][i]==0 ? flag=false : 1);
		}
		return flag;
	}
	
	skipLine(now){
		for(let i=now; i>0; i--){
			for(let j=0; j<10; j++){
				this.board[i][j] = this.board[i-1][j];
			}
		}
		this.board[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}
	
	eraseLine(){
		for(let i=19; i>=0; i--){
			if(this.checkLine(i)){
				this.skipLine(i);
				i++;
			}//한줄 지웠으므로 다시 현재칸 검사!
		}
	}
	
	dropSoft(){
		clearInterval(timer);
		timer = setInterval(() => {tetris.update();}, 100);
	}
	
	dropHard(){
		while(tetris.check(now.nowX, now.nowY + 1, now.rotate)){
			now.drop();
		}
		tetris.update();
	}
	
	preview(){
		pY = now.nowY;
		while(tetris.check(now.nowX, pY + 1, now.rotate)){
			pY++;
		}
	}
	
	fix(){
		if(now.nowY == 0){
			gameover();
			return 0;
		}
		for(let i=0; (i<4 && i + now.nowY < 20); i++){
			for(let j=0; (j<4 && j + now.nowX < 10); j++){
				if(blocks[now.type][now.rotate % types[now.type]][i][j]){
					this.board[i + now.nowY][j + now.nowX] = window.now.type;
				}
			}
		}
		
		this.eraseLine();
		
		window.now = new block(rand(1, 8));
	}
	
	update(){
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


//초기화및 화면 관련 함수ㄷㄱㄹ

function init(){
	window.canvas = document.getElementById('screen');
	window.scr = canvas.getContext('2d');
	
	window.addEventListener('resize', updateSize);
	window.addEventListener('keydown', (e) => {clicked(e);});
	window.addEventListener('keyup', (e) => {unclicked(e);});

	updateSize();
	window.blockL = canvas.height / 20;
	window.game = canvas.width/2 - blockL * 5;
	window.Flag = [0, 0, 0, 0, 0];
	
	window.tetris = new field();
	window.now = new block(rand(1, 8));
	window.pY = 0;
	
	return new Promise(function(resolve, reject){
		console.log("loading complete!")
		resolve();
	})
}	

function updateSize(){
	window.canvas.width = document.body.clientWidth;
	window.canvas.height = document.body.clientHeight;
}

function play(){
	init().then(loop);
}

function loop(){
	window.playing = setInterval(draw, 10);
}
// 게임로직에 관련된 함수들

function clicked(click){
	if(click.key == "ArrowDown"){
		if(!Flag[0]){
			tetris.dropSoft();
		}
		Flag[0]++;
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
	else if(click.key == " " && Flag[4] == 0){
		tetris.dropHard();
		Flag[4]++;
	}
	
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
	else if(click.key == " "){
		Flag[4] = 0;
	}
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



function draw(){
	tetris.preview();
	scr.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();
	drawField();
	drawPreview();
	drawBlock();
}

function drawBackground(){
	scr.fillStyle = 'rgba(100, 100, 100, 0.7)';
	scr.fillRect(0,0,canvas.width,canvas.height);
	
	for(let i=0; i<20; i++){
		for(let j=0; j<10; j++){
			scr.fillStyle = 'white';
			scr.fillRect(game + j*blockL, i*blockL, blockL, blockL);
		}
	}
}

function drawField(){
	for(let i=0; i<20; i++){
		for(let j=0; j<10; j++){
			if(tetris.board[i][j])
			{
				scr.fillStyle = colors[tetris.board[i][j]];
				scr.fillRect(game + j*blockL, i*blockL, blockL, blockL);
			}
		}
	}
}

function drawPreview(){
	scr.globalAlpha = 0.4;
	
	for(let i=0; i<4; i++){
		for(let j=0; j<4; j++){
			scr.fillStyle = colors[now.type];
			if(blocks[now.type][now.rotate % types[now.type]][i][j]){
				scr.fillRect(game + (now.nowX+j)*blockL, (pY+i)*blockL, blockL, blockL);
			}
		}
	}
	
	scr.globalAlpha = 1;
}

function drawBlock(){
	for(let i=0; i<4; i++){
		for(let j=0; j<4; j++){
			scr.fillStyle = colors[now.type];
			if(blocks[now.type][now.rotate % types[now.type]][i][j]){
				scr.fillRect(game + (now.nowX+j)*blockL, (now.nowY+i)*blockL, blockL, blockL);
			}
		}
	}
}
