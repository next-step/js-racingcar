import { canvasToBlob } from "blob-util";
import { setGameCnt } from "../../src/js/components/CarGame";

describe("ui-counter", () => {
  const ERRORNAME =
    "유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.";

  beforeEach(() => {
    cy.visit("http://localhost:1038/");
    // 페이지 접속. 띄워진 서버 port를 작성해주세요.
  });

  const clickCarNameBtn = () => {
    cy.get("#carName button").click();
  };
  const setCarNameInput = (input) => {
    cy.get("#carName input").type(input);
    //.type(input);
  };
  const clickGameCntBtn = () => {
    cy.get("#gameCnt button").click();
  };
  const setGameCntInput = (input) => {
    cy.get("#gameCnt input").type(input);
    //.type(input);
  };

  const carNameInput = () => {
    setCarNameInput("a,b,c,d");
    clickCarNameBtn();
  };

  it("아무것도 입력하지 않음", () => {
    clickCarNameBtn();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(ERRORNAME);
    });
  });

  it("띄어쓰기만 입력", () => {
    setCarNameInput("  ");
    clickCarNameBtn();
    cy.on("window:alert", (str) => {
      expect(str).to.equal(ERRORNAME);
    });
  });

  it("한 단어만 입력", () => {
    setCarNameInput(" 안녕 ");
    clickCarNameBtn();
    cy.get("#carGameList .car-player").should("have.text", "안녕");
  });

  it("여러 단어 입력", () => {
    const input = "안녕 , 헬로우, 잘가!";
    const splitStr = input.split(",");
    setCarNameInput(input);
    clickCarNameBtn();
    for (let str of splitStr) {
      cy.get("#carGameList .car-player").contains(str.trim());
    }
  });

  it("a,b,c,d 입력 후 gameCnt 입력", () => {
    carNameInput();
    setGameCntInput("3");
    clickGameCntBtn();
  });
});
