import Car from "../src/Car.js";

describe("자동차는 위치 값을 가진다.", () => {
  beforeAll(() => {
    console.log("자동차 위치 테스트 시작");
  });
  describe("초기 상태 : car Location - (0,0,0)", () => {
    it("getName(), getLocation() 호출 - 초기 이름, 위치 값 설정", () => {
      // given
      const name = "hojeong";
      const location = {
        x: 0,
        y: 0,
        z: 0,
      };
      const expectedName = "hojeong";
      const expectedLocation = {
        x: 0,
        y: 0,
        z: 0,
      };

      // when
      const car = new Car(name, location);
      const actualName = car.getName();
      const actualLocation = car.getLocation();

      // then
      expect(expectedName).toEqual(actualName);
      expect(expectedLocation).toMatchObject(actualLocation);
    });
  });

  afterAll(() => {
    console.log("자동차 위치 테스트 끝");
  });
});
