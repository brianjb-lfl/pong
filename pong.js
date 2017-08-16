let stopGame = false;

// canvas vars
let canv;
let ctx;
let canvH;
let canvW;
let canvMargT;

// gameplay vars
let spdIncr;        // number of volleys between speed increases
let currSc;         // current score
let currV;          // current volley, counts toward speed increase
let incrX;          // current ball delta-x for each iteration
let incrY;          // current ball delta-y for each iteration
let dot;            // object holding draw info for ball
let pdlPosn;        // object holding draw info for paddle
let tones = [];        // array holding tone IDs
let activeTone;     // array pointer to current strike tone

function initPong(){
	canv = document.getElementById("pField");
	ctx = canv.getContext("2d");
    canv.addEventListener("mousemove", pdlMove, false);
	canvH = 600;
	canvW = 900;
    canvMargT = canv.getBoundingClientRect().top;
    tones = ['tone265', 'tone265', 'tone329', 'tone329', 'tone395', 'tone395', 
        'tone524', 'tone524'];
    startGame();
}

function startGame(){
    activeTone = 0;
	currSc = 0;
	document.getElementById("scoreTxt").innerHTML = currSc;
	spdIncr = 3;
	currV = 1;
	incrX = -3;
	incrY = 3;
    stopGame = false;
    document.getElementById("pField").style.cursor = "none";

	// randomize ball starting  dir and vert posn
    if(Math.round(Math.random())+1 >1){
		incrY = -3;
	}
    let startY = Math.floor(Math.random()*canvH);

	// start dot
	dot = {x: 850, y: startY, radius: 5};

	// paddles
	pdlPosn = {x: 878, y: 265, w: 12, h: 70}

    document.getElementById("playBtn").style.visibility = "hidden";
	reDraw();

    // start ball motion
	setTimeout(function(){
		window.requestAnimationFrame(moveDot);
	}, 2000);
}

function moveDot(){
    chkBallStrike();

	if((dot.x + incrX) > canvW){
        // player missed
        dot.x = canvW - Math.ceil(dot.radius/2);
        stopGame = true;
    }
    else if((dot.x + incrX) < 0){
        // hit left wall
        incrX = -incrX;
        document.getElementById(tones[activeTone]).play()
    }

	if((dot.y + incrY > canvH) || (dot.y + incrY < 0)){
        // hit horizontal wall
		incrY = -incrY;
		document.getElementById(tones[activeTone]).play()
	}

	dot.x += incrX;
	dot.y += incrY;
	reDraw();

	if(stopGame === false){
		window.requestAnimationFrame(moveDot);
	}
    else{
        document.getElementById("playBtn").style.visibility = "visible";
        document.getElementById("pField").style.cursor = "auto";
    }
}

function pdlMove(evt){
    let tempY = evt.clientY - canvMargT;
    //check for bottom edge reached
    if ((tempY + pdlPosn.h) > canvH){
        tempY = canvH - pdlPosn.h;
    }
    pdlPosn.y = tempY;
}

function chkBallStrike(){
    if(dot.x >= pdlPosn.x && dot.x <= (pdlPosn.x + pdlPosn.w) && 
        dot.y >= pdlPosn.y && dot.y <= (pdlPosn.y + pdlPosn.h)){
        // successful ball strike
        currSc += 1;
        currV += 1;
        if (currV > spdIncr){
            incrX = incrX + 1;
            currV = 1;
            activeTone = Math.min((activeTone + 1), 7);
        }        

        if(dot.y >= pdlPosn.y && dot.y <= (pdlPosn.y + 15)){
            // sharp up return
            incrY = Math.ceil(-1.5 * incrX);
        }
        else if(dot.y >= (pdlPosn.y + pdlPosn.h - 15) && dot.y <= (pdlPosn.y + pdlPosn.h)){
            // sharp down return
            incrY = Math.floor(1.5 * incrX);
        }
        else{
            // standard return
            incrY = (incrY / Math.abs(incrY)) * incrX;
        }
        document.getElementById("scoreTxt").innerHTML = currSc;
        incrX = -incrX;
        dot.x = pdlPosn.x - 1;
        document.getElementById(tones[activeTone]).play()
    }
}

function reDraw(){

    ctx.clearRect(0, 0, canvW, canvH);

	// draw court
    // horizontal centerline
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(0, 300);
    ctx.lineTo(450, 300);
    ctx.closePath();
    ctx.stroke();
    // vertical "net"
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.moveTo(450, 0);
    ctx.lineTo(450, 600);
    ctx.closePath();
    ctx.stroke();

    // draw ball
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();

    // draw paddle
    ctx.beginPath();
    ctx.rect(pdlPosn.x, pdlPosn.y, pdlPosn.w, pdlPosn.h);
    ctx.fillStyle = '#001780';
    ctx.fill();
}

