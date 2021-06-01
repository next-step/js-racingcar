import { contentType } from "mime-types";
import { MESSAGE } from "../../src/js/constant.js";

describe("racing", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  const arrayToString = (ary) => {
    return ary.join(", ");
  }

  const inputCarName = (ary, isSuccess) => {
    let str = arrayToString(ary);
    cy.get("#carname>input").type(str);
    cy.get("#carname>button").click();
    if (isSuccess){
      cy.get("#carname>button").should("be.disabled");
      cy.get("#count_filed").should("be.exist");
    }
    else{
      cy.get("#count_filed").should("not.exist");
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains(MESSAGE.CAR_NAME);
      })
    }
  }

  const proceedRacing = (time, names) => {
    let distance;
    cy.wait(time).get(".mr-2").find("div.car-player").then(($div)=>{
      distance = new Array($div.length).fill(0);
      for(let i = 0; i < $div.length; i++){
        let nodes = $div[i].parentNode.childNodes;
        nodes.forEach((x) => {
           if (x.nodeName != "#text" && x.className.indexOf("forward") >= 0){
             distance[i]++;
           }
        });
      }
    });
    cy.get("#result_section").should("be.exist");
    cy.get("#result_section").find("h2").then(($h2)=>{
      let max = Math.max.apply(null, distance);
      let winner = $h2[0].innerHTML;
      let flag = 1;
      distance.forEach((x, i) => {
        if(x == max && winner.indexOf(names[i]) < 0){
          flag = 0;
        }
      })
      expect(flag).to.equal(1);
    })

    cy.wait(2000);
    cy.on('window:alert',(txt)=>{
      expect(txt).to.contains(MESSAGE.CELEBRATE);
    })
  }

  const inputCount = (str, names, isSuccess) => {
    cy.get("#count>input").type(str);
    cy.get("#count>button").click();

    if (isSuccess){
      cy.get("#count>button").should("be.disabled");
      cy.get("#process_section").should("be.exist");
      proceedRacing(parseInt(str) * 1000, names);
    }
    else{
      cy.get("#process_section").should("not.exist");
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains(MESSAGE.RUN_TIME);
      });
    }
  }

  const clickRestart = () => {
    cy.get("#restart").click();
    cy.get("#input_section").should("be.exist");
    cy.get("#process_section").should("not.exist");
    cy.get("#result_section").should("not.exist");
  }

  it("Case 1 - 자동차 이름 입력에서 에러 1", () => {
    let names = ["AAAAAA", "B", "C", "D"];

    inputCarName(names, 0);
  });

  it("Case 2 - 자동차 이름 입력에서 에러 2", () => {
    let names = ["A", "BB", "", "DDDD"];

    inputCarName(names, 0);
  });

  it("Case 3 - 횟수 입력에서 에러 1", () => {
    let names = ["AAA", "BBB", "CCC", "DDD"];

    inputCarName(names, 1);
    inputCount("0", names, 0)
  });

  it("Case 4 - 횟수 입력에서 에러 2", () => {
    let names = ["AAA", "BBB", "CCC", "DDD"];
    inputCarName(names, 1);
    inputCount("-15", names, 0)
  });

  it("Case 5 - 우승자가 제대로 출력되고 있는가?", () => {
    let names = ["AAA", "BBB", "CCC", "DDD"];
    
    inputCarName(names, 1);
    inputCount("3", names, 1);
  });

  it("Case 6 - 전체 입력 후 다시 시작 버튼 클릭", () => {
    let names = ["AA", "BB", "CC", "DD"];

    inputCarName(names, 1);
    inputCount("5", names, 1);
    clickRestart();
  });

  it("Case 7 - 여러 번 플레이", () => {
    let names = ["AA", "BB", "CC", "DD"];
    
    inputCarName(names, 1);
    inputCount("5", names, 1);
    clickRestart();

    cy.wait(5000);
    names = ["Apple", "Beef", "Chees", "Donut"];

    inputCarName(names, 1);
    inputCount("2", names, 1);
    clickRestart();

    names = ["AAAAA", "BBBBB", "CCCCC", "DDDDD", "EEEEE", "FFFFF"];

    inputCarName(names, 1);
    inputCount("10", names, 1);
    clickRestart();

    names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

    inputCarName(names, 1);
    inputCount("15", names, 1);
    clickRestart();
  });

});
