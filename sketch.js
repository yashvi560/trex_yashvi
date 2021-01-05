var PLAY = 1;
var END = 0;
var GameState = PLAY;
var gameover , gameoverimg, restart , restartimg;

var diesound,checkPointsound,jumpsound;
var trex , trex_running, ground, groundImage, invisibleground , cloud , cloudimage, cloudgroup,trex_collided;

var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,score, obstaclegroup;

function preload() {
  //loading imagessss
  trex_running = loadAnimation("trex1.png" , "trex3.png" , "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadAnimation("ground2.png");
  cloudimage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
   obstacle2 = loadImage("obstacle2.png");
   obstacle3 = loadImage("obstacle3.png");
   obstacle4 = loadImage("obstacle4.png");
   obstacle5 = loadImage("obstacle5.png");
   obstacle6 = loadImage("obstacle6.png");
  
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  
  diesound = loadSound("die.mp3");
  checkPointsound = loadSound("checkPoint.mp3");
  jumpsound = loadSound("jump.mp3");
}

function setup() {
  createCanvas(600,200);
  //create trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running" , trex_running);
  trex.addAnimation("collided", trex_collided);
  //adjusting trex scale
  trex.scale = 0.5;
  trex.x = 50;
  //create groubd sprite
  ground = createSprite(200,180,400,20);
  ground.addAnimation("ground", groundImage);
  ground.x = ground.x/2;
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  
  restart = createSprite(300,140);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  
  //making the ground invisible 
   invisibleground = createSprite(200,190,400,10);
  invisibleground.visible = false;
  //creating cloud and obstacle group
  obstaclegroup = new Group();
  cloudgroup = new Group();
  score = 0;
  
  trex.setCollider("circle",0,0,40);
  
}


function draw() {
 
  trex.collide(invisibleground);
  
  
  
  console.log(frameCount);
  
  background("white");
  
  text("Score: " + score, 500,30);
  
  
 
  
  if (GameState === PLAY){
    //move the ground
    ground.velocityX = -6;
    //update the score
    score = score + Math.round(frameCount/60);
    
    if(score>0 && score%1000 === 0){
      checkPointsound.play();
    }
    
    gameover.visible = false;
    restart.visible = false;
    //reseting the ground
      if(ground.x<0){
    ground.x = ground.width/2;
      
  }
   //jump space when pressed
   if(keyDown("space") && trex.y>=100 ){
trex.velocityY = -12;
     jumpsound.play();
  }
  trex.velocityY = trex.velocityY + 0.8;
    //to spawn clouds
        spawnClouds();
  //to spawn obstacles
  spawnObstacles();
    
    if (obstaclegroup.isTouching(trex)){
      GameState = END;
      diesound.play();
      
    }
  }
 else if(GameState === END){
    //stop the ground
   ground.velocityX = 0;
   //making trex velocity 0
   trex.velocityY = 0;
   //stopping clouds and obstacles
cloudgroup.setVelocityXEach(0);
      obstaclegroup.setVelocityXEach(0);
   //change the trex animation
trex.changeAnimation("collided", trex_collided);
   //setting lifetime to negative
   cloudgroup.setLifetimeEach(-1);
   obstaclegroup.setLifetimeEach(-1);
   
   gameover.visible = true;
   restart.visible = true;
  }
  
  drawSprites();
}

function spawnClouds(){
    //code to spawn clouds
  if(frameCount % 60 === 0){
  cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudimage);
    cloud.y= Math.round(random(20,90));
    cloud.scale = 0.5;
  cloud.velocityX = -3;
    //code to give depth to the cloud
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    //giving the clouds a lifetime
    cloud.lifetime = 200;
    
    //adding cloud to the group
    cloudgroup.add(cloud);
}
}

function spawnObstacles(){
  //code to spawn obstacles
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(5 + score/1000);

    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch (rand){
     case 1 : obstacle.addImage(obstacle1);
        break;
     case 2 : obstacle.addImage(obstacle2);
        break;
     case 3 : obstacle.addImage(obstacle3);
        break;
     case 4 : obstacle.addImage(obstacle4);
        break;
     case 5 : obstacle.addImage(obstacle5);
        break;
     case 6 : obstacle.addImage(obstacle6);
        break;
      default : break;
    }
    
    //assign scale and lifetime to the object
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //adding obstacle to the group
    obstaclegroup.add(obstacle);
  }
}
