var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj, room;
var changeState, readState;
var bedroom_img, garden_img, washroom_img;
var gameState;
var foodstocksprite, foodstocksprite_img;



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("Happy.png");
room=loadImage("room.jpg");
bedroom_img=loadImage("Bed Room.png");
garden_img=loadImage("Garden.png");
washroom_img=loadImage("Wash Room.png");
foodstocksprite_img=loadImage("Food Stock.png");
}



function setup() {
  database=firebase.database();
  createCanvas(1000,800);

  //read gameState from database
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.5;
  
  feed=createButton("Feed the dog");
  feed.position(800,95);
  feed.style('width', '150px');
  feed.style('height', '50px');
  feed.style('font-size', '16px');
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(950,95);
  addFood.style('width', '150px');
  addFood.style('height', '50px');
  addFood.style('font-size', '16px');
  addFood.mousePressed(addFoods);
}



function draw() {
  background(room);
  foodObj.display();
  //codes for fedtime refering to the databse
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  //codes related to time and change in background
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  } else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  } else if(currentTime>(lastFed+2)&&currentTime<(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  } else {
    update("Hungry");
    foodObj.display();
    foodstocksprite=createSprite(180,620,10,10);
    foodstocksprite.addImage(foodstocksprite_img);
    foodstocksprite.scale = 0.38;
  }
  //codes when the gameState is not in the hungry state
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
 
  fill(255,255,254);
  textSize(23);
  if(lastFed>=12){
    text("Drago was last fed at :  "+ lastFed%12 + " PM", 40,40);
   }else if(lastFed==0){
     text("Drago was last fed at : 12 AM",40,40);
   }else{
     text("Drago was last fed at : "+ lastFed + " AM", 40,40);
   }
  drawSprites();
}




//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}