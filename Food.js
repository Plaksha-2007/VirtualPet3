class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('milk.png');
    }

    bedroom(){
      background(bedroom_img,500,400);
    }

    washroom(){
      background(washroom_img,500,400);
    }

    garden(){
      background(garden_img,500,400);
    }

    

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    display(){
      var x=80,y=100;
      
      imageMode(CENTER);
      image(this.image,650,500,80,80);
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=80;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}
