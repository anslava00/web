
TRocket = new Class({
      initialize: function(pX,pY,dist,rX,rY)  {
        this.distanation = dist;
        this.posX = pX; 
        this.posY = pY; 

        this.rangX = rX;
        this.rangY = rY;
      },
      distanation:"",
      posX: 0,
      posY: 0,
      rangX: 0,
      rangY: 0,
      draw : function(ctx,RtypeR,dist){
        with (this){
          ctx.beginPath();
          let bulletImage = new Image();
          if(RtypeR!=3){
            if(dist=="UP")bulletImage.src = 'img/bulletUP.png';
            if(dist=="DOWN")bulletImage.src = 'img/bulletDOWN.png';
            if(dist=="FRONT"){
              bulletImage.src = 'img/bullet.png';
              ctx.drawImage(
              bulletImage,
              0,0,
              rangX,rangY,
              posX,posY,
              rangX,rangY,)
            }
            else{
            ctx.drawImage(
              bulletImage,
              0,0,
              rangX,rangY,
              posX,posY,
              rangX,rangY,);
            }
          }
          else if(RtypeR==3){       
            bulletImage.src = 'img/lazer.png';
              ctx.drawImage(
              bulletImage,
              0,0,
              rangX,rangY,
              posX+25,posY-5,
              canvas.width,rangY)
          }
          ctx.lineTo(posX, posY);
          ctx.closePath();
          ctx.fill();
        }
      }
    });

function type_rocket(type){
  type_R = type;
}


function moveBullet() {
  for(var i = 0;i<rockets.length;){
    if(rockets[i].distanation=="UP"){
      rockets[i].posX += 4;
      rockets[i].posY -= 4;
    }
    else if(rockets[i].distanation=="DOWN"){
      rockets[i].posX += 4;
      rockets[i].posY += 4;
    }
    else if(rockets[i].distanation=="FRONT"){
      rockets[i].posX += 4;
    }
    else if(rockets[i].distanation=="RECTANGL"){
      rockets[i].rangY += 0.3;
    }
    rockets[i].draw(ctx,type_R,rockets[i].distanation);
    if((rockets[i].posX>canvas.width)||(type_R==3&&rockets[i].rangY>20)){
      rockets.splice(i,1);
    }
    else i++;
  }
  if(rockets.length==0)bullet_flight = 0;
 
}


////////////////////////////выстрел при нажатии
var button = document.querySelector("canvas");
  button.onmousedown = function() {
    if(hitpoints<=0){
      show_table_player();
    }
    else
    if(IDpausa==0){
      if(widthProgressBar>=100){
        widthProgressBar = 0;
        Progress_fire_Bar.style.width = widthProgressBar + "%";
        if (type_R==1){
          var item = new TRocket(40,mouseY,"FRONT",50,11);
          item.draw(ctx, type_R,"FRONT");
          rockets.push(item);
        }
        else if(type_R==2){
          var item = new TRocket(40,mouseY,"UP",39,38);
          item.draw(ctx, type_R,"UP");
          rockets.push(item);
          var item = new TRocket(40,mouseY,"DOWN",39,38);
          item.draw(ctx, type_R,"DOWN");
          rockets.push(item);
          var item = new TRocket(40,mouseY,"FRONT",50,11);
          item.draw(ctx, type_R,"FRONT");
          rockets.push(item);
        }
        else if(type_R==3){
          var item = new TRocket(40,mouseY,"RECTANGL",63,11);
          item.draw(ctx, type_R,"");
          rockets.push(item);
        } 
        bullet_flight = 1;
      };
    }else{
    if(BOSS_HP>0){
      idTimer = setInterval("sprite.start()",1);  
      IDpausa = 0;
    }
  }
}
/////////////////////////////выстрел при нажатии
canvas.style.cursor = "crosshair";

