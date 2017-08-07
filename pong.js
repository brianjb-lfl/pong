function draw(){
	let canv = document.getElementById('pField');
	const ctx = canv.getContext('2d');

    	ctx.fillStyle = 'rgb(200, 0, 0)';
    	ctx.fillRect(200, 10, 5, 5);

    	ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    	ctx.fillRect(30, 30, 50, 50);
}