var player,gameState;
var sun1,sun2,co,fertilizer,water;
var human;
var sunImage,coImage,ferImage,waterImage, humanImage;
var seed,sapling,sTree,bTree, bgImage;
var buttonImage, titleImage;
var gameState;
var start = 0;
var round1 =1;
var edges;
var sunCount = 0;
var round2= 2;
var END = 5;


function preload(){
sunImage = loadImage("sunImage.png");
coImage = loadImage("co2Image.png");
ferImage = loadImage("fertilizerImage.png");
waterImage = loadImage("waterImage.png");
seed = loadImage("seedImage.png");
sapling = loadImage("saplingImage.png");
sTree = loadImage("smallTreeImage.png");
bTree = loadImage("bigTreeImage.png");
bgImage = loadImage("backgroundImage.png");
humanImage = loadImage("humanImage.png");
buttonImage = loadImage("PlayButtonImage.png");
titleImage = loadImage("titleImage.png");
}

function setup() {
  createCanvas(windowWidth-50,windowHeight-50);
  edges = createEdgeSprites();
  gameState = start;

  button = createSprite(width/2, 400, 80, 50);
  button.addImage("buttonImage",buttonImage);
  button.scale = 0.2;

 title = createSprite(width/2,200,50,50);
 title.addImage("titleImage",titleImage);

 player = createSprite(600,height-80,30,10);
 player.addImage("seedImage",seed);
 player.addImage("sapling",sapling);
    player.scale = 0.1;
    player.visible = false;

    sun1 = createSprite(width,random(100,height-200));
    sun1.addImage("sun1Image",sunImage);
    sun1.scale = 0.5;
    sun1.velocityX = -(random(4,8));
    sun1.velocityY = -(random(4,8));
    sun1.visible = false;
  
    sun2 = createSprite(0,random(200,height-300));
    sun2.addImage("sun2Image",sunImage);
    sun2.scale = 0.5;
    sun2.velocityX = (random(4,8));
    sun2.velocityY = (random(4,8));
    sun2.visible = false;

    water1 = createSprite(30,random(200,height-300));
    water1.addImage("waterImage",waterImage);
    water1.scale = 0.2;
    water1.velocityX= (random(4,8));
    water1.velocityY = (random(4,8));
    water1.visible = false;

    water2 = createSprite(50,random(200,height-300));
    water2.addImage("waterImage",waterImage);
    water2.scale = 0.2;
    water2.velocityX= (random(4,8));
    water2.velocityY = -(random(4,8));
    water2.visible = false;

    water3 = createSprite(width-10,random(200,height-300));
    water3.addImage("waterImage",waterImage);
    water3.scale = 0.2;
    water3.velocityX= -(random(4,8));
    water3.velocityY = (random(4,8));
    water3.visible = false;

    water4 = createSprite(width-20,random(200,height-300));
    water4.addImage("waterImage",waterImage);
    water4.scale = 0.2;
    water4.velocityX= -(random(4,8));
    water4.velocityY = -(random(4,8));
    water4.visible = false;

    humanGroup = new Group();
}

function draw() {
  background(bgImage);

  sun1.bounceOff(edges);
  sun2.bounceOff(edges);
  
  water1.bounceOff(edges);
  water2.bounceOff(edges);
  water3.bounceOff(edges);
  water4.bounceOff(edges);


  
  player.bounce(edges);

  if(mousePressedOver(button)){
    button.visible = false;
    title.visible = false;
    gameState = round1;
  }
  if(gameState === round1){

    player.addImage("seedImage",seed);

    player.visible = true;
    textSize(30);
    fill("black");
    stroke(255);
    strokeWeight(3);
    text("Catch Sun",windowWidth/10,windowHeight/10);
    text("Sun Count: "+sunCount,windowWidth/10,windowHeight/10+50);

    
   

    sun1.bounce(sun2);

    if(keyDown(UP_ARROW)){
      player.y = player.y-10;
    }
    if(keyDown(DOWN_ARROW)){
      player.y = player.y+10;
    }
    if(keyDown(RIGHT_ARROW)){
      player.x = player.x+10;
    }
    if(keyDown(LEFT_ARROW)){
      player.x = player.x-10;
    }
    if(frameCount%30===0){
    enemies();
    }
    humanGroup.bounceOff(edges[2]);
    humanGroup.bounceOff(edges[3]);
    humanGroup.bounceOff(edges[1]);

    sun1.visible = true;
    sun2.visible = true;

    if(sun1.isTouching(player)){
      sun1.destroy();
      sunCount = sunCount+1;
    }
    if(sun2.isTouching(player)){
      sun2.destroy();
      sunCount = sunCount+1;
    }
    if(sunCount===2){
      gameState = round2;
      humanGroup.destroyEach();
    }

    if(humanGroup.isTouching(player)){
      gameState=END;
      

   }

  }

  if(gameState===round2){
      water1.visible = true;
      water2.visible = true;
      water3.visible = true;
      water4.visible = true;

      player.changeImage("sapling",sapling);
      player.scale = 0.7;


      water1.bounce(water2);
      water1.bounce(water3);
      water1.bounce(water4);
      water2.bounce(water3);
      water2.bounce(water4);
      water3.bounce(water4);

      if(keyDown(UP_ARROW)){
        player.y = player.y-10;
      }
      if(keyDown(DOWN_ARROW)){
        player.y = player.y+10;
      }
      if(keyDown(RIGHT_ARROW)){
        player.x = player.x+10;
      }
      if(keyDown(LEFT_ARROW)){
        player.x = player.x-10;
      }
      if(frameCount%50===0){
      enemies();
      }
    humanGroup.bounceOff(edges[2]);
    humanGroup.bounceOff(edges[3]);
    humanGroup.bounceOff(edges[1]);

    if(humanGroup.isTouching(player)){
      gameState=END;
      

   }
  }

  if(gameState===END){
    background(0);
    humanGroup.destroyEach();
      sun1.destroy();
      sun2.destroy();
      player.visible = false
      textSize(50);
      fill("white");
      text("Game Over",windowWidth/3,windowHeight/2)
  }
  

  drawSprites();
}
function enemies(){

    human = createSprite(width,random(50,height-100));
    human.addImage("human",humanImage);
    human.scale = 0.2;
    human.velocityX = -(random(4,8));
    human.velocityY = (random(4,8));
    human.lifetime = 1000;
    humanGroup.add(human);
    
}