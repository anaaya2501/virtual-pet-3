//Create variables here
var dog ,happyDog;
var database;
var foodS, foodStock;
var dogImage,hi;
var gameState;
var foodObj;
var fedd, addFood;
var lastFed;
function preload()
{
  //load images here
   dogImage = loadImage("images/dogImg.png");
   hi = loadImage("images/dogImg1.png");
   garden = loadImage("virtual+pet+images/virtual pet images/Garden.png")
   bedroom = loadImage("virtual+pet+images/virtual pet images/Bed Room.png")
}

function setup() {
  database= firebase.database();
  createCanvas(800, 700);
  dog = createSprite(400,350,30,30);
  dog.addImage(dogImage);
  dog.scale= 0.5;
 foodObj= new Food();
  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  database.ref("FeedTime").on("value", function(data){
    lastFed = data.val()
  })
  database.ref("gameState").on("value", function(data){
    gameState = data.val()
  })
  feed= createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood= createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() { 
 // background(46,139,87) ;

  //foodObj.display();
 
  currentmin= minute();
  if(currentmin==(Number(lastFed)+1)){
    update("play");
    foodObj.garden();
  }
  else if(currentmin==(Number(lastFed)+2)){
    update("sleep");
    foodObj.bedroom();
  }
  else{
    update("hungry");
    foodObj.display();
  }
if(gameState!="hungry"){
feed.hide();
addFood.hide();
dog.remove();
}
else{
  feed.show();
addFood.show();
dog.addImage(dogImage);
}
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(hi);
  if(foodObj.getFoodStock() <=0){
    foodObj.updateFoodStock(0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime:minute()
  })
}
function addFoods(){
  foodS = foodS+1;
  database.ref("/").update({Food :foodS});
}

function update(state){
database.ref("/").update({
  gameState: state
})
}