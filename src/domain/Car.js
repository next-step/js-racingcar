import { MOVE_THRESHOLD } from "../constants/index.js";

class Car { 
  name;
  position = 0;
  
  constructor(name){
    this.name = name;
  };

  moveForward(randomValue){
    if(randomValue >= MOVE_THRESHOLD) this.position++;
  };
};

export default Car;