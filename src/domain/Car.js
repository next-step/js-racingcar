import { MOVE_THRESHOLD, RANDOM_BOUND } from "../constants/index.js";

class Car { 
  name;
  position = 0;
  
  constructor(name){
    this.name = name;
  };

  getRandomValue(){
    return Math.floor(Math.random() * RANDOM_BOUND);
  };

  moveForward(randomValue){
    if(randomValue >= MOVE_THRESHOLD) this.position++;
  };
};

export default Car;