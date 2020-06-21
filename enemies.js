TEnemies = new Class({
			initialize: function(pX,pY,rX,rY,dist,hp)  {
		        this.posX = pX; 
		        this.posY = pY; 
		        this.rangX = rX;
		        this.rangY = rY;
		        this.distan = dist;
		        this.hp = hp;
		      },
		      posX: 0,
		      posY: 0,
		      rangX: 0,
		      rangY: 0,
		      distan: 0,
		      hp: 1,
			draw : function(ctx){
				with (this){
					ctx.beginPath();
          			let bulletImage = new Image();
					bulletImage.src = 'img/ememies2.png';
		              ctx.drawImage(
		              bulletImage,
		              0,0,
		              rangX,rangY,
		              posX,posY,
		              rangX,rangY,)
            		ctx.lineTo(posX, posY);
					ctx.closePath();
					ctx.fill();
				}
			}
		});



function moveEnemies() {
if(per_for_swap_dist>150){
	for(var i = 0; i<enemies.length;i++)
		if(enemies[i].distan==1)
			enemies[i].distan = 0;
		else if(enemies[i].distan==0)
			enemies[i].distan = 1;
	per_for_swap_dist = 0;
	}
  for(var i = 0;i<enemies.length;){	
      enemies[i].posX -= 1.5;
      if(enemies[i].distan==0)
      	enemies[i].posY -= 1;
      else if (enemies[i].distan==1)
      	enemies[i].posY += 1;
    enemies[i].draw(ctx);

    if(enemies[i].posX<-100){
      enemies.splice(i,1);
    }
    else i++;
  }
  per_for_swap_dist++;
  if(enemies.length==0)Enemies_flight = 1;
}

function creatEnem(kol){
	Enemies_flight = 0;
		for (var i = 1; i<=kol;i++){
			var max = (500/kol)*i-30;
			var min = max - (500/kol)+30;
			if(level==0){
				var item = new TEnemies((canvas.width),Math.random()*(max - min) + min, 100 ,100,2,1);
			}
			else if(level==1){
				var item = new TEnemies((canvas.width),Math.random()*(max - min) + min, 100 ,100,Math.random().toFixed(0),1);
			}
			else{
				var item = new TEnemies((canvas.width),Math.random()*(max - min) + min, 100 ,100,Math.random().toFixed(0),2);
			}			
			item.draw(ctx);
			enemies.push(item);
		}
}


function moveDragonBullet() {
  for(var i = 0;i<dragon_bullet.length;){	
      dragon_bullet[i].posX -= 1.5;
    dragon_bullet[i].draw(ctx);

    if(dragon_bullet[i].posX<-84){
      dragon_bullet.splice(i,1);
    }
    else i++;
  }
}

function creatBossFire(){
		var item = new TDRAGONBULLET(boss.posX, boss.posY ,84,33);	
		item.draw(ctx);
		dragon_bullet.push(item);		
}

var boss;
var per_for_swap_dist = 0;
var dragon_bullet = [];

function boss_fight(){
	if(Progress_HPBOSS_Bar.style.width==0){
			BOSS_HP = 100;
			boss = new TBOSS(canvas.width-210, 20 ,210,128,1,100,1,1);
		}
		Progress_HPBOSS_Bar.style.width = BOSS_HP + "%";
		Progress_HPBOSS_Bar.innerHTML = "БОСС:"+BOSS_HP;
		boss.draw(ctx);
		boss.tickFram++;
		if(boss.tickFram==35||boss.tickFram==175)boss.numFram=0;
		if(boss.tickFram==70||boss.tickFram==210)boss.numFram=1;
		if(boss.tickFram==105||boss.tickFram==245)boss.numFram=2;
		if(boss.tickFram==140||boss.tickFram==280){
			boss.numFram=3;
			if(boss.tickFram==280){
				boss.tickFram=1;
				creatBossFire();
			}
		}
		if(boss.dist==1)
			boss.posY--;
		else
			boss.posY++;
		if(boss.posY==350)boss.dist = 1;
		if(boss.posY==50)boss.dist = 0;	
}



TBOSS = new Class({
			initialize: function(pX,pY,rX,rY,dist,hp,num,tick)  {
		        this.posX = pX; 
		        this.posY = pY; 
		        this.rangX = rX;
		        this.rangY = rY;
		        this.distan = dist;
		        this.hp = hp;
		        this.numFram = num;
		        this.tickFram = tick;
		      },
		      numFram: 0,
		      posX: 0,
		      posY: 0,
		      rangX: 0,
		      rangY: 0,
		      distan: 1,
		      hp: 1,
		      tickFram: 1,

			draw : function(ctx){
				with (this){
					ctx.beginPath();
          			let ImageDragon = new Image();
					ImageDragon.src = 'img/dragon.png';
		            ctx.drawImage(
		              ImageDragon,
		              numFram*210,0,
		              numFram*210+rangX,rangY,
		              posX,posY,
		              numFram*210+rangX,rangY,)
            		ctx.lineTo(posX, posY);
					ctx.closePath();
					ctx.fill();
				}
			}
		});

TDRAGONBULLET = new Class({
			initialize: function(pX,pY,rX,rY)  {
		        this.posX = pX; 
		        this.posY = pY; 
		        this.rangX = rX;
		        this.rangY = rY;
		      },
		      posX: 0,
		      posY: 0,
		      rangX: 0,
		      rangY: 0,
			draw : function(ctx){
				with (this){
					ctx.beginPath();
          			let bullet_fire = new Image();
					bullet_fire.src = 'img/dragon_fire_ball.png';
		              ctx.drawImage(
		              bullet_fire,
		              0,0,
		              rangX,rangY,
		              posX,posY,
		              rangX,rangY,)
            		ctx.lineTo(posX, posY);
					ctx.closePath();
					ctx.fill();
				}
			}
		});