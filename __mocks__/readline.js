const obj = {
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn((questionText, input) => {
      // TODO: 콘솔 출력을 위한 코드
      console.log(questionText);

      return input;
    }),
  }),
};

export default obj;
