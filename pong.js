let stopGame = false;

function pong(){
	let canv = document.getElementById('pField');
	const ctx = canv.getContext('2d');
	const canvH = 600;
	const canvW = 900;

	let currSc = 0;
	document.getElementById("scoreTxt").innerHTML = currSc;
	const spdIncr = 5;
	let currV = 1;
	let incrX = 3;
	let incrY = 3;
	if(Math.round(Math.random())+1 >1){
		incrY = -3;
	}
	let mouseY = 265;

	// start dot
	let startY = Math.floor(Math.random()*canvH);
	let dot = {x: 25, y: startY, radius: 5};

	// start paddles
	let pdlPosn = {x1: 10, x2: 878, y: mouseY, w: 12, h: 70}

	reDraw();

	setTimeout(function(){
		window.requestAnimationFrame(moveDot);
	}, 1500);

    function moveDot(){
    	ctx.clearRect(0, 0, canvW, canvH);
    	if((dot.x+incrX > canvW) || (dot.x+incrX < 0)){
    		currSc+=1;
    		document.getElementById("scoreTxt").innerHTML = currSc;
    		currV+=1;
    		incrX = -incrX;
    		document.getElementById('edgeTone').play()
    	}
    	if((dot.y+incrY > canvH) || (dot.y+incrY < 0)){
    		incrY = -incrY;
    		document.getElementById('edgeTone').play()
    	}
    	dot.x+=incrX;
    	dot.y+=incrY;
    	reDraw();
    	if (currV > spdIncr){
    		incrX+=(incrX/Math.abs(incrX));
    		incrY+=(incrY/Math.abs(incrY));
    		currV =1;
    	}
    	if(stopGame==false){
			window.requestAnimationFrame(moveDot);
    	}
    }

    function reDraw(){
    	drawCourt();
    	drawDot(dot);
    	drawPaddles(pdlPosn);
    }

    function drawDot(dot){
    	ctx.beginPath();
    	ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
    	ctx.fillStyle = 'yellow';
    	ctx.fill();
    }

    function drawPaddles(pP){
    	ctx.beginPath();
    	ctx.rect(pP.x1, pP.y, pP.w, pP.h);
    	ctx.fillStyle = 'blue';
    	ctx.fill();

    	ctx.beginPath();
    	ctx.rect(pP.x2, pP.y, pP.w, pP.h);
    	ctx.fillStyle = 'red';
    	ctx.fill();

    }

    function drawCourt(){
    	// horizontal centerline
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.setLineDash([]);
    	ctx.moveTo(0, 300);
    	ctx.lineTo(900, 300);
    	ctx.closePath();
    	ctx.stroke();

    	// vertical "net"
		ctx.strokeStyle = 'gray';
		ctx.lineWidth = 7;
		ctx.beginPath();
		ctx.setLineDash([5, 15]);
    	ctx.moveTo(450, 0);
    	ctx.lineTo(450, 600);
    	ctx.closePath();
    	ctx.stroke();
    }
}

function gameStart(){
	stopGame = false;
}


function gameEnd(){
	if(stopGame){
		stopGame=false;
	}
	else{
		stopGame=true;
	}
}