var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var fruit;
var fruitsGroup;
var banana_image;

var obstacle;
var obstaclesGroup;
var stone_image;

var score = 0;

var count = 0;

var end_image;
var end;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  banana_image = loadImage("banana.png");
  stone_image = loadImage("stone.png");

  end_image = loadImage("gameOver.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  fruitsGroup = new Group;
  obstaclesGroup = new Group;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

    spawnFruits();

    spawnObstacles();

    textSize(15);
    text("Score: " + score, 380, 100);

    if(player.isTouching(fruitsGroup)){
      fruitsGroup.destroyEach();
      score += 1;
      count += 1;
    }

    if(count >= 5){
      player.scale += 0.02;
      count = 0;
    }
  
    if(player.isTouching(obstaclesGroup)){
      obstaclesGroup.destroyEach();
      player.scale -= 0.05;
      gameState = END;
    }

    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
  }

  else if(gameState === END){
    player.visible = false;
    backgr.velocity = 0;
    fruitsGroup.lifetime = 0;
    fruitsGroup.velocity = 0;
    obstaclesGroup.lifetime = 0;
    obstaclesGroup.velocity = 0;
    end = createSprite(400, 200);
    end.addImage("end", end_image);
  }

  drawSprites();
}

function spawnFruits(){
if(frameCount % 80 === 0){
  var fruit = createSprite(805, 380, 15, 15);
  fruit.addImage("fruit", banana_image);
  fruit.velocityX = -4;
  fruit.lifetime = 280;
  fruit.scale = 0.4;
  }
 fruitsGroup.add(fruit);
}

function spawnObstacles(){
if(frameCount % 100 === 0){
  var obstacle = createSprite(805, 380, 20, 20);
  obstacle.addImage("obstacle", stone_image);
  obstacle.velocityX = -4;
  obstacle.lifetime = 300;
  obstacle.scale = 0.5;
  }
 obstaclesGroup.add(obstacle);
}