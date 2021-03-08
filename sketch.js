var hypnoticBall;
var database,position;

function preload(){
    carImage = loadImage("car.png")
}

function setup(){
  database = firebase.database();
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.addImage(carImage);
    hypnoticBall.scale=0.3;


    var hypnoticBallPosition = database.ref('ball/position');
    hypnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position!== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
    }
}

//
//function changePosition(x,y){
 //   hypnoticBall.x = hypnoticBall.x + x;
 //   hypnoticBall.y = hypnoticBall.y + y;
//}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x+x,
        'y': position.y+y
    })
}

function readPosition(data){
    position= data.val();
    hypnoticBall.x=position.x;
    hypnoticBall.y=position.y;
}

function showError(){
    console.log("error in writing to the database");
}





















