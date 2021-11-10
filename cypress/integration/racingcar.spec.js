import { Messages } from '../../src/js/constants.js';

/**
 * Math.random 함수 mocking
 *
 * - Math.random() * 9의 값이 입력한 배열의 원소가 되도록 한다
 * - Math.random()을 호출할 때마다 입력한 배열의 원소를 순회하면서 값이 반환된다
 *
 * ex) returnValues: [3,6,7]
 *  1번째: 3
 *  2번째: 6
 *  3번째: 7
 *  4번째: 3
 *  5번째: 6
 *  6번째: 7
 *  ...
 */
function mockMathRandom(returnValues) {
  const returnMockValues = returnValues.map((value) => value / 9);
  let i = -1;

  const mockFn = () => {
    i += 1;
    return returnMockValues[i % returnMockValues.length];
  };

  cy.window().then((window) => {
    window.Math.random = mockFn;
  });
}

/**
 * alert 테스트를 위한 stub 생성 및 이벤트 등록
 *
 * - window.alert 이벤트 발생 시 stub함수 호출
 */
function addStubOnAlert() {
  const stub = cy.stub();
  cy.on('window:alert', stub);

  return stub;
}

/**
 * 자동차 이름 입력 기능
 *
 * - 자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.
 * - 자동차 이름을 입력받은 다음에는 입력폼이 비활성화되어야 한다
 */
describe('자동차 이름 입력 기능', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('페이지가 로드되고 자동차 이름을 입력할 수 있는 상태가 되어야 한다.', () => {
    cy.getNameInput().should('be.visible').and('not.be.disabled').and('have.text', '');
    cy.getNameButton().should('be.visible').and('not.be.disabled');
  });

  it('이름 입력창을 제외한 나머지 영역은 보이지 않아야 한다.', () => {
    cy.getCountField().should('not.be.visible');
    cy.getProcessSection().should('not.be.visible');
    cy.getResultSection().should('not.be.visible');
  });

  describe('자동차 이름을 입력하지 않고 확인버튼을 누르면', () => {
    it('에러 메세지를 알림창으로 표시해야 한다.', () => {
      const stub = addStubOnAlert();
      const message = Messages.EMPTY_NAME;

      cy.getNameButton().click();
      cy.shouldStubToBeCalledWith(stub, message);
    });
  });

  describe('자동차 이름으로 빈 문자열을 입력하면', () => {
    it('에러 메세지를 알림창으로 표시해야 한다.', () => {
      const stub = addStubOnAlert();
      const message = Messages.INVALID_NAME;

      cy.getNameInput().type('A,B,,C');
      cy.getNameButton().click();
      cy.shouldStubToBeCalledWith(stub, message);
    });
  });

  describe('자동차 이름으로 6자 이상을 입력하면', () => {
    it('에러 메세지를 알림창으로 표시해야 한다.', () => {
      const stub = addStubOnAlert();
      const message = Messages.INVALID_NAME;

      cy.getNameInput().type('A,LOONGG');
      cy.getNameButton().click();
      cy.shouldStubToBeCalledWith(stub, message);
    });
  });

  describe('정상적으로 자동차 이름을 입력하면', () => {
    it('이름 입력 폼이 비활성화되어야 한다.', () => {
      cy.getNameInput().type('A,B,C');
      cy.getNameButton().click();
      cy.getNameInput().should('be.disabled');
      cy.getNameButton().should('be.disabled');
    });
  });
});

/**
 * 시도 횟수 입력 기능
 *
 * - 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
 * - 레이싱 횟수는 1이상이여야 한다.
 * - 시도 횟수를 입력받은 다음에는 입력폼이 비활성화되어야 한다
 */
describe('시도 횟수 입력 기능', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.getNameInput().type('A,B,C');
    cy.getNameButton().click();
  });

  it('이름을 입력한 뒤 시도 횟수 입력 폼은 입력받을 수 있는 상태가 되어야 한다.', () => {
    cy.getCountField().should('be.visible');
    cy.getCountInput().should('not.be.disabled').and('have.text', '');
    cy.getCountButton().should('not.be.disabled');
  });

  describe('횟수를 입력하지 않고 확인 버튼을 누르면', () => {
    it('에러 메세지를 알림창으로 표시해야 한다.', () => {
      const stub = addStubOnAlert();
      const message = Messages.INVALID_COUNT;

      cy.getCountButton().click();
      cy.shouldStubToBeCalledWith(stub, message);
    });
  });

  describe('횟수를 0으로 입력하고 확인 버튼을 누르면', () => {
    it('에러 메세지를 알림창으로 표시해야 한다.', () => {
      const stub = addStubOnAlert();
      const message = Messages.INVALID_COUNT;

      cy.getCountInput().type(0);
      cy.getCountButton().click();
      cy.shouldStubToBeCalledWith(stub, message);
    });
  });

  describe('정상적으로 시도 횟수를 입력하면', () => {
    it('시도 횟수 입력 폼이 비활성화되어야 한다.', () => {
      cy.getCountInput().type(5);
      cy.getCountButton().click();
      cy.getCountInput().should('be.disabled');
      cy.getCountButton().should('be.disabled');
    });
  });
});

/**
 * 자동차 경주 기능
 *
 * - 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
 * - 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
 * - 전진 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.
 * - 자동차 경주 게임의 턴이 진행 될 때마다 1초의 텀(progressive 재생)을 두고 진행한다.
 */
describe('자동차 경주 기능', () => {
  const names = 'A,B,C,D';
  const count = 5;
  const carNames = names.split(',');

  beforeEach(() => {
    cy.visit('/');
    cy.clock();
    cy.getNameInput().type(names);
    cy.getNameButton().click();
    cy.getCountInput().type(count);
    cy.getCountButton().click();
    mockMathRandom([2, 3, 4, 5]);
  });

  describe('경주가 시작되고', () => {
    it('자동차들은 각각의 이름으로 표시되어야 한다.', () => {
      cy.getProcessSection()
        .find('[data-cy="car-player"]')
        .should('have.length', carNames.length)
        .each(($el, idx) => cy.wrap($el).should('have.text', carNames[idx]));
    });

    it('자동차 아래 스피너가 표시되어야 한다.', () => {
      cy.getProcessSection().find('[data-cy="spinner"]').should('have.length', carNames.length);
    });

    describe('1초가 지나면', () => {
      it('랜덤값이 4 이상인 자동차만 전진해야 한다.', () => {
        cy.tick(1000);

        cy.getNthCarForward(1).should('not.exist');
        cy.getNthCarForward(2).should('not.exist');
        cy.getNthCarForward(3).should('exist');
        cy.getNthCarForward(4).should('exist');
      });
    });

    describe('카운트만큼 시간이 지나면', () => {
      it('랜덤값이 4 이상인 차들은 카운트만큼 전진해야 한다.', () => {
        cy.tick(1000 * count);

        cy.getNthCarForward(1).should('not.exist');
        cy.getNthCarForward(2).should('not.exist');
        cy.getNthCarForward(3).should('have.length', count);
        cy.getNthCarForward(4).should('have.length', count);
      });
    });

    describe('카운트보다 시간이 더 지나도', () => {
      it('차들은 더이상 전진하면 안된다.', () => {
        cy.tick(1000 * count + 1000);

        cy.getNthCarForward(1).should('not.exist');
        cy.getNthCarForward(2).should('not.exist');
        cy.getNthCarForward(3).should('have.length', count);
        cy.getNthCarForward(4).should('have.length', count);
      });
    });
  });
});

/**
 * 결과 표시 기능
 *
 * - 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
 * - 우승자가 여러명일 경우 ,를 이용하여 구분한다.
 * - 정상적으로 게임의 턴이 다 동작된 후에는 결과를 보여주고, 2초 후에 축하의 alert 메세지를 띄운다.
 * - 다시 시작하기 버튼을 누르면 게임 상태를 처음으로 초기화한다.
 */
describe('우승자 표시 기능', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clock();
  });

  describe('게임이 종료되면', () => {
    it('우승자를 표시하고 2초 뒤에 알림 메세지를 보여준다.', () => {
      const stub = addStubOnAlert();
      const message = Messages.END;
      const names = 'A,B,C,D';
      const winner = 'D';
      const count = 5;

      mockMathRandom([1, 2, 3, 4]);

      cy.getNameInput().type(names);
      cy.getNameButton().click();
      cy.getCountInput().type(count);
      cy.getCountButton().click();

      cy.tick(1000 * count);

      cy.getResult().should('be.visible').and('have.text', Messages.WINNERS(winner));

      cy.tick(2000);

      cy.shouldStubToBeCalledWith(stub, message);
    });
  });

  describe('우승자가 여러명인 경우', () => {
    it(',를 이용해 구분하여 표시해야 한다.', () => {
      const names = 'A,B,C,D,E';
      const count = 4;
      const winner = 'A,D,E';

      mockMathRandom([4, 3, 2, 6, 7]);

      cy.getNameInput().type(names);
      cy.getNameButton().click();
      cy.getCountInput().type(count);
      cy.getCountButton().click();
      cy.tick(1000 * count);

      cy.getResult().should('be.visible').and('have.text', Messages.WINNERS(winner));
    });
  });

  describe('게임이 종료되고 다시 시작하기 버튼을 누르면', () => {
    it('게임 상태를 처음으로 초기화해야 한다.', () => {
      const names = 'A,B,C,D';
      const count = 5;

      mockMathRandom([3, 4, 5, 6]);

      cy.getNameInput().type(names);
      cy.getNameButton().click();
      cy.getCountInput().type(count);
      cy.getCountButton().click();

      cy.tick(1000 * count);

      cy.getResetButton().click();

      cy.getNameInput().should('be.visible').and('not.be.disabled');
      cy.getNameButton().should('be.visible').and('not.be.disabled');
      cy.getCountField().should('not.be.visible');
      cy.getProcessSection().should('not.be.visible');
      cy.getResultSection().should('not.be.visible');
    });
  });
});
