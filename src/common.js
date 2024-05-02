export const MIN_CAR_NAME_LENGTH = 1;
export const MAX_CAR_NAME_LENGTH = 5;
export const MIN_CAR_AUTOMATIC_NUMBER = 3;
export const START_CAR_POSITION = 0;

export const getRandomNum = () => {
  const number = Math.floor(Math.random() * 10);
  return number;
}

export const printMessage = async(env, msg) => {
  if(!env) {
    console.log(msg);  
  }
}