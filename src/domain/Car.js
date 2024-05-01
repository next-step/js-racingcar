import { MOVE_THRESHOLD } from "../constants/index.js";

class Car { 
  name;
  position = 0;
  
  constructor(name){
    this.name = name;
  };

  getRandomValue(){
    return Math.floor(Math.random() * 10);
  };

  moveForward(randomValue){
    if(randomValue >= MOVE_THRESHOLD) this.position++;
  };
};

export default Car;