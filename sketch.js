var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImage,obstacles,obstaclesImage;
var bananaGroup,obstaclesGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage = loadImage("banana.png");
obstaclesImage = loadImage("stone.png");
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
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() { 
  background(0);
 

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
spawnFood();
spawnObstacles();
if (bananaGroup.isTouching(player)){
  bananaGroup.destroyEach();
  score = score+2;
  player.scale += 0.05;

}

  }
  if (obstaclesGroup.isTouching(player)){
    gameState = END;
  }
  else if(gameState === END){
   backgr.velocityX =0;
player.visible = false;

bananaGroup.destroyEach();
obstaclesGroup.destroyEach();

textSize(30);
fill("white");
text("Game Over!",300,200)

}

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("score : " + score,700,100);
}
function spawnFood(){
if(frameCount%80 === 0 ){
  var banana = createSprite(600,250,40,10);
  banana.y = Math.round( random(120,200));
  banana.addImage(bananaImage);
banana.scale = 0.10;
banana.velocityX = -6;
banana.lifeTime = 250;
player.depth = banana.depth+1;
bananaGroup.add(banana);
}
}
function spawnObstacles(){
  if(frameCount%200 === 0){
  obstacles = createSprite(550,300);
  obstacles.y = Math.round(random(300,350));
  obstacles.addImage(obstaclesImage);
  obstacles.scale = 0.25;
  obstacles.velocityX = -4;
  obstacles.lifeTime = 200;
  obstacles.depth = player.depth+1;
  obstaclesGroup.add(obstacles);
  }
}