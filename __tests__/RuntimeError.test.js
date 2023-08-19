import RuntimeError from "../src/RuntimeError";

describe("getMessage() 테스트", () => {
  describe("message를 반환한다.", () => {
    it.each(["", " ", "message", "Long message like this....!!"])(
      "%p",
      (message) => {
        const runtimeError = new RuntimeError(message);
        expect(runtimeError.getMessage()).toBe(message);
      }
    );
  });
});
