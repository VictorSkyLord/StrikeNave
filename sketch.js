var score =0;
var nave,blueBubble,redbubble, bullet, backBoard;

var naveImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;



var life =3;
var score=0;
var gameState=1

function preload(){
  naveImg = loadImage("kisspng-spacecraft-clip-art-spaceship-png-file-5a7852b5a11907.5780419415178349336599.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("pngwing.com.png")
  blueBubbleImg = loadImage("kisspng-meteoroid-meteorite-meteor-shower-meteoro-5b163a454373c1.1077210415281833652763.png")
  redBubbleImg = loadImage("satelite.png")
  backBoardImg= loadImage("espaco-tres-dimensoes-3d.jpg")
}
function setup() {
  createCanvas(800, 600);

  backBoard= createSprite(50, width/2, 400,height);
  backBoard.visible = false
  
  nave= createSprite(100, height/2, 50,50);
  nave.addImage(naveImg)
  nave.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(backBoardImg);
  
  heading.html("Vidas: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Pontuação: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    nave.y=mouseY  

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    //if(keyDown("space")){
     // shootBullet();
    //}

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    drawSprites();
  }
    
  
}

function drawblueBubble(){
  blueBubble = createSprite(800,random(20,580),40,40);
  blueBubble.addImage(blueBubbleImg);
  blueBubble.scale = 0.1;
  blueBubble.velocityX = -8;
  blueBubble.lifetime = 400;
  blueBubbleGroup.add(blueBubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,580),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= nave.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg)
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Fim de Jogo`,
        text: "Oops você perdeu o jogo!",
        text: "Sua pontuação é: " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      });
    }
  
}

function keyReleased(){
if (keyCode === 32){
   shootBullet();
}


}