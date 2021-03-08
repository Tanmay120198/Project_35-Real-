var database,pos;
var balloon,b1,bg;

function preload(){
  	bg=loadImage("Hot Air Ballon-01.png");
	b1=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}
function setup() {
  	database=firebase.database();
	createCanvas(1300,600);

    balloon=createSprite(400, 0, 50, 50);
    balloon.addAnimation("add",b1);
    balloon.scale=0.6;
	var ps=database.ref('balloon/height');
	ps.on("value",readPosition,showError);
	
}

function draw() {
	background(bg);  

    textSize(40);
    fill("brown");
    stroke("orange");
    text("**Use arrow keys to move hot air balloon",10,50);

    if(pos!==undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-4,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(4,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-10);
            balloon.scale=balloon.scale-0.01;
     }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+10);
            balloon.scale=balloon.scale+0.01;
     }
        drawSprites();
   }

}
function changePosition(x,y){
    database.ref('balloon/height').set({
        x:pos.x+x,
        y:pos.y+y
    });
    }

function readPosition(data){
    pos=data.val();
    balloon.x=pos.x;
    balloon.y=pos.y;

}
function showError(){
    console.log("error");
}
