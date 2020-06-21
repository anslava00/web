class Sprite {
    constructor(options) {
        this.ctx = options.ctx;

        this.image = options.image;

        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame || 0;
        this.numberOfFrames = options.numberOfFrames || 1;

        this.width = options.width;
        this.height = options.height;
               
    }

      start() {if(pausa!=1){
        panel.style.visibility = 'visible';
        this.tickCount++;
        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
        drawBack(ctx,canvas.width,canvas.height);
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            0,
            mouseY - 31,
            this.width / this.numberOfFrames,
            this.height
        )

        if(widthProgressBar<100){
          widthProgressBar+=0.8;
          Progress_fire_Bar.style.width = widthProgressBar + "%";
          Progress_fire_Bar.innerHTML = "reload";
        }else Progress_fire_Bar.innerHTML = "fire"
        if(bullet_flight==1){
         moveBullet();
        }
        //уровни и враги
        if(Enemies_flight==0){
          moveEnemies();
          check_on_colis_fire();
        }else{
           $("#level").text("level "+(level+1));
           $("#wave").text("волна "+wave);
          if(level<3){/////////////////shitch
            if(wave<=level_mas[level][0]){
              creatEnem(level_mas[level][wave]);
              wave++;
            }
            else{
              wave = 1;
              level++;
            }
          }
          else {
            var Bar = document.getElementById("BOSS_Progress");
            Bar.style.visibility = "visible";
            boss_fight();
            if(dragon_bullet.length!=0)moveDragonBullet();
            check_on_colis_bullet_boss();
            Progress_HPBOSS_Bar.style.width = BOSS_HP + "%";
            Progress_HPBOSS_Bar.innerHTML = "БОСС:"+BOSS_HP;
            if(BOSS_HP<=0){
              expoints += 500;
              end_game();
            }
          }
        }
      }
        //уровни и враги
        
        check_on_colis_plane();
        
        Progress_HP_Bar.style.width = hitpoints + "%";
        Progress_HP_Bar.innerHTML = hitpoints;
        Progress_EXP_Bar.style.width = (expoints/4040)*100 + "%";
        Progress_EXP_Bar.innerHTML = "EXP:"+expoints;
        if(expoints<=700)type_rocket(1);
        else if (expoints<=2200)type_rocket(2);
        else type_rocket(3);
        if(hitpoints<=0)end_game();
     }
}
let canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
let planeImage = new Image();
planeImage.src = 'img/plane.png';
//моделька самолета
let sprite = new Sprite({
  ctx: ctx,
  image: planeImage,
  width: 319,
  height: 62,
  numberOfFrames: 5,
  ticksPerFrame: 50,
});
var level_mas = [[5,2,3,2,3,2],[5,4,3,4,3,4],[4,3,4,3,3]];//уровни
//1 уровень 40 ex / 2 70 ex/ 3 100ex / босс 1000ex
var panel = document.getElementById("form");//отображение интерфейса

var Progress_fire_Bar = document.getElementById("fire_bar");//готовность стрелять
var widthProgressBar = 0;//перезарядка

var rockets = [];// массив пуль
var type_R = 1;// массив какой тип пуль..1 одна пуля 2 тройная 3 лазер
var bullet_flight = 0;// определение полета пули если 1 надо двигать если 0 нет

var enemies = [];// массив врагов
var Enemies_flight = 1;//определение полета врага если 1 надо если 0 нет

var IDpausa = 0;//0 нет паузы, 1 пауза

var level = 0;//1,2,3,4
var wave = 1;//1,2,3,4

var expoints = 0;//опыт
var hitpoints = 100;//жизнь
var Progress_EXP_Bar = document.getElementById("EXP");
var Progress_HP_Bar = document.getElementById("HP");

var Progress_HPBOSS_Bar = document.getElementById("BOSS");
var BOSS_HP = 100;

var PlayerName = prompt('Введите свое имя(12 символов)','');//имя игрока
while(PlayerName.length>13){
alert('введено больше 12 силволов');
PlayerName = prompt('Введите свое имя(12 символов)','');
};
if(!PlayerName)PlayerName = "Пустой игрок";
$("#PlayerName").text("Игрок: "+PlayerName);

var table_player;//загрузка таблицы игроков
var table_player = JSON.parse(localStorage.getItem('game_plane'));


var idTimer;//запуск анимации и игры
idTimer = setInterval("sprite.start()",1);

