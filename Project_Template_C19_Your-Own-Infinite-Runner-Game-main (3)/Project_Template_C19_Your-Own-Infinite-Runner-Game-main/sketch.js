var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
    towerImg = loadImage("tower.png");
    ghostImg = loadImage("ghost-standing.png");
    doorImg = loadImage("door.png");
}

function setup() {
    createCanvas(600, 600);
    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY = 2;
    
    doorsGroup= new Group();
    climbersGroup = new Group();
  invisibleBlockGroup = new Group()
    ghost = createSprite(200,200,50,50)
    ghost.scale=0.3;
    ghost.addImage("ghost",ghostImg)
    
}

function draw() {

    if (gameState==="play")
    {
    if(tower.y > 400){
        tower.y = 200
      }
      spawnDoors();
      if(keyDown("left_arrow"))
      {
        ghost.x=ghost.x-2
  
      }
      if(keyDown("right_arrow")){
        ghost.x = ghost.x+2
      }
  
      if(keyDown("space"))
      {
        ghost.velocityY=-3;
      }
      ghost.velocityY=ghost.velocityY+0.8;
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY=0;
      }
      if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600)
      {
        ghost.destroy();
        gameState="end"
      }
      
      drawSprites()
    }
  if(gameState==="end"){
    stroke("yellow")
    fill("black")
    textSize(20)
    text("gameOver",200,200)
  }
  }
  function spawnDoors(){
    if (frameCount%270===0){
      var door = createSprite(200,-50)
      var climber = createSprite(200,10)
      var invisibleBlock = createSprite(200,15)
      invisibleBlock.width=climber.width
      invisibleBlock.height=2
      door.addImage(doorImg)
      climber.addImage(climberImg)
      door.x = Math.round(random(120,400))
      door.velocityY= 2
      climber.x=door.x
      climber.velocityY=2
  invisibleBlock.x=door.x
  invisibleBlock.velocityY=2
      door.lifetime = 800
      climber.lifetime= 800
      doorsGroup.add(door)
  climbersGroup.add(climber)
  invisibleBlockGroup.add(invisibleBlock)
   ghost.depth=door.depth
   ghost.depth+=1    
    }
  
  }
