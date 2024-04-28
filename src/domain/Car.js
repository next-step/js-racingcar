import { MOVE_THRESHOLD } from "../constants";

class Car { 
  name;
  position = 0;
  
  constructor(name){
    this.name = name;
  };

  get name(){
    return this.name;
  };

  get position(){
    return this.position;
  };

  getRandomValue(){
    return Math.floor(Math.random() * 10);
  };

  moveForward(randomValue){
    if(randomValue >= MOVE_THRESHOLD) this.position++;
  };
};

export default Car;