function pausa() {
  if(hitpoints>0){
      panel.style.visibility = 'hidden';
        if(IDpausa!=1){
          clearInterval(idTimer);
          ctx.fillStyle  = "rgba(61,64,224,0.7)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#E09539";
          ctx.strokeStyle = "#F00";
          ctx.font = "italic 80pt Arial";
          ctx.fillText("Пауза",20,100);
          ctx.fill();
          IDpausa = 1;
        }
      }
    }

function new_game(){
  clearInterval(idTimer);
  panel.style.visibility = 'visible';

  Progress_fire_Bar = document.getElementById("fire_bar");//готовность стрелять
  widthProgressBar = 0;//перезарядка

  rockets = [];// массив пуль
  type_R = 1;// массив какой тип пуль..1 одна пуля 2 тройная 3 лазер
  bullet_flight = 0;// определение полета пули если 1 надо двигать если 0 нет

  enemies = [];// массив врагов
  Enemies_flight = 1;//определение полета врага если 1 надо если 0 нет

  IDpausa = 0;//0 нет паузы, 1 пауза

  level = 0;//1,2,3,4
  wave = 1;//1,2,3,4

  expoints = 0;//опыт
  hitpoints = 100;//жизнь

  BOSS_HP = 100;
  var Bar = document.getElementById("BOSS_Progress");
  Bar.style.visibility = "hidden";
  Progress_HPBOSS_Bar.style.width = 0;

  move_back_fon = 0;
  idTimer = setInterval("sprite.start()",1);
}

function picture(){
  ctx.fillStyle  = "rgba(61,64,224,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#E09539";
  ctx.strokeStyle = "#F00";
  ctx.font = "italic 80pt Arial";
  ctx.fillText("Game Over",20,100);
  ctx.fill();
}

function end_game(){
  panel.style.visibility = 'hidden';
  clearInterval(idTimer);
  IDpausa = 1;
  var Flag_search = 0;//если найден игрок 1 если нет 0
  if (table_player == null) table_player = [];
  for(var i = 0; i < table_player.length; i++){
    if(table_player[i][0] == PlayerName){
      Flag_search = 1;
      if(table_player[i][1]<expoints)table_player[i][1] = expoints;
      break;
    }
  }
  if(Flag_search == 0){
    var new_player = [];
    new_player.push(PlayerName);
    new_player.push(expoints);
    table_player.push(new_player);
  }
  for(var i = 0;i < table_player.length - 1; i++)
      for(var j = 0;j < table_player.length - i - 1; j++)
        if(parseInt(table_player[j][1])<parseInt(table_player[j+1][1]))
          [table_player[j],table_player[j+1]] = [table_player[j+1],table_player[j]];
  localStorage.setItem('game_plane', JSON.stringify(table_player));
 //show_table_player(); 
 picture();
}

function show_table_player(){
  ctx.fillStyle = "#EC1B24";
  ctx.fillRect(50, 0, canvas.width, 50);
  ctx.fillStyle = "#6400F9";
  ctx.fillRect(0, 0, 50, 50);

  ctx.fillStyle = "black";
  ctx.font = "italic 30pt Arial";
  ctx.fillText("№",0,40);
  ctx.fillText("Игрок",150,40);
  ctx.fillText("Опыт",550,40);
  ctx.fill();
  for(var i = 50, j = 1; i < 500; i += 50, j++){
    if(i % 100 == 0){
      ctx.fillStyle = "#FDCA0A";
      ctx.fillRect(50, i, canvas.width, 50);
      ctx.fillStyle = "#A549A2";
      ctx.fillRect(0, i, 50, 50);
    }
    else{
      ctx.fillStyle = "#FDF202";
      ctx.fillRect(50, i, canvas.width, 50);
      ctx.fillStyle = "#A549F9";
      ctx.fillRect(0, i, 50, 50);
    }
    ctx.fillStyle = "black";
      ctx.font = "italic 30pt Arial";
      ctx.fillText(j,10,40+i);
      if(j-1<table_player.length){
        ctx.fillText(table_player[j-1][0],90,40+i);
        ctx.fillText(table_player[j-1][1],550,40+i);
      }
      ctx.fill();
  }
  ctx.fillStyle = "black";
  ctx.fillRect(400, 0, 1, canvas.height);
  ctx.fill();
}

function onclick_show_table(){
  pausa();
  show_table_player();
}

function swap_player(){
  PlayerName = prompt('Введите свое имя(12 символов)','');//имя игрока
  while(PlayerName.length>13){
  alert('введено больше 12 силволов');
  PlayerName = prompt('Введите свое имя(12 символов)','');
  };
  if(!PlayerName)PlayerName = "Пустой игрок";
  $("#PlayerName").text("Игрок: "+PlayerName);
  new_game();
}

