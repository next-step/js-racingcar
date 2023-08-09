import { getUserInputByQuestion } from '../../src/utils/getUserInputByQuestion';

const USER_ANSWER = '사용자 입력 값';

jest.mock('node:readline/promises', () => {
  return {
    createInterface: jest.fn().mockReturnValue({
      question: jest.fn(() => Promise.resolve(USER_ANSWER)),
      close: jest.fn(),
    }),
  };
});

describe('getUserInput 테스트', () => {
  it('사용자가 입력한 값을 받을 수 있다.', async () => {
    const response = await getUserInputByQuestion('질문');

    expect(response).toBe(USER_ANSWER);
  });
});
