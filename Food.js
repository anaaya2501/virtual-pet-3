class Food{
 constructor(){
this.image = loadImage("Milk.png")
this.foodStock=0;
this.lastFed=0;
 }

 getFoodStock(){
    return this.foodStock;
 }

 updateFoodStock(foodstock){
     this.foodStock= foodstock;
 }

getFedTime(lastFed){
    this.lastFed = lastFed;
}
 deductFood(){
if(this.foodStock >0){
    this.foodStock= this.foodStock-1;
}
 }
 
 display(){
    var x=80,y=100;
    background(46,139,87) ;
    
    imageMode(CENTER);
    image(this.image,720,220,70,70);
    
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

  bedroom(){
    background(bedroom, 550,500);
  }
  garden(){
    background(garden, 550,500);
  }
}