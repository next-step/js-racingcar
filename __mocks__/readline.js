const obj = {
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn((questionText, input) => {
      console.log(questionText);

      const cars = input.split(",").map((val) => val.trim());

      const isNameLessThanFive = cars.every((car) => car.length <= 5);

      if (isNameLessThanFive === false) {
        throw new Error("자동차 이름이 5자를 초과합니다.");
      }

      return cars;
    }),
  }),
};

export default obj;
