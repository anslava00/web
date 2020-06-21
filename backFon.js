function drawBack(ctx,w,h){
			// закрашиваем канвас градиентным фоном
			
			ctx.save();
			ctx.beginPath();
			let tmp = new Image();
	          tmp.src = 'img/backfon.png';
	          ctx.drawImage(
	          tmp,
	          move_back_fon,0,
	          (move_back_fon+800),h,
	          0,0,
	          (move_back_fon+800),h);
	          
          ctx.closePath();
          ctx.fill();
          if(move_back_fon>1920)move_back_fon = 0;
          move_back_fon++;
		}
var move_back_fon = 0;