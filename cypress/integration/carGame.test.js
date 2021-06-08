import { canvasToBlob } from "blob-util";

describe("ui-counter", () => {
  const ERRORNAME =
    "유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.";

  beforeEach(() => {
    cy.visit("http://localhost:1112/");
    // 페이지 접속. 띄워진 서버 port를 작성해주세요.
  });

  const clickBtn = () => {
    cy.get("#carName button").click();
  };
  const setInput = (input) => {
    cy.get("#carName input").type(input);
    //.type(input);
  };

  it("아무것도 입력하지 않음", () => {
    clickBtn();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(ERRORNAME);
    });
  });

  it("띄어쓰기만 입력", () => {
    setInput("  ");
    clickBtn();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(ERRORNAME);
    });
  });

  it("한 단어만 입력", () => {
    setInput(" 안녕 ");
    clickBtn();
    cy.get("#carGameList .car-player").should("have.text", "안녕");
  });

  it("여러 단어 입력", () => {
    const input = "안녕 , 헬로우, 잘가!";
    const splitStr = input.split(",");
    setInput(input);
    clickBtn();
    for (let str of splitStr) {
      cy.get("#carGameList .car-player").contains(str.trim());
    }
  });
});
