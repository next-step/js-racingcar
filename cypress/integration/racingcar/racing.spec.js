import {
  NOT_ALLOWED_NAME_LENGTH,
  NOT_ALLOWED_TRY_COUNT,
} from '../../../src/racingcar/constatns/messages';

before(() => cy.visit('../../dist/index.html'));

const $namingInput = () => cy.get('[data-target="racingcar-naming-input"]');
const $namingButton = () => cy.get('[data-target="racingcar-naming-button"]');
const $tryCountSection = () => cy.get('[data-target="racingcar-try-count-section"]');

const $tryCountInput = () => cy.get('[data-target="racingcar-try-count-input"]');
const $tryCountButton = () => cy.get('[data-target="racingcar-try-count-button"]');

const $playCars = () => cy.get('[data-target="racingcar-play-cars"]');
const $cars = () => cy.get('[data-target="racingcar-cars"]');
const $carPlayer = () => cy.get('[data-target="racingcar-car-player"]');

afterEach(() => {
  cy.reload();
});

const typeNameAndClick = (name) => {
  $namingInput().type(name);
  $namingButton().click();
};

const typeNameAndEnter = (name) => {
  $namingInput().type(name + '{enter}');
};

const typeTryCountAndClick = (tryCount) => {
  $tryCountInput().type(tryCount);
  $tryCountButton().click();
};

const typeTryCountAndEnter = (tryCount) => {
  $tryCountInput().type(tryCount + '{enter}');
};

const startCars = (names, tryCounts) => {
  typeNameAndClick(names);
  typeTryCountAndClick(tryCounts);
};

const alertMessageContainsCheck = (alertMessage) => {
  cy.on('window:alert', (msg) => {
    expect(msg).to.contains(alertMessage);
  });
};

describe('자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
  context('입력한 자동차 이름과 출력된 자동차 이름이 같다.', () => {
    it('1대', () => {
      const names = 'BMW';
      startCars(names, 3);
      $carPlayer().should('have.text', names);
    });

    it('3대', () => {
      const names = 'BMW, AUDI, K9';
      startCars(names, 3);

      $carPlayer().each(($ele, idx) => {
        expect($ele).to.have.text(names.split(', ')[idx]);
      });
    });
  });
});

describe('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
  context('5자 이하의 이름을 입력하고 확인버튼을 클릭한다.', () => {
    it('1대의 자동차', () => {
      typeNameAndClick('BMW');
      $tryCountSection().should('be.visible');
    });
    it('3대의 자동차', () => {
      typeNameAndClick('BMW, AUDI, K9');
      $tryCountSection().should('be.visible');
    });
  });

  context('5자 이하의 이름을 입력하고 엔터를 입력한다.', () => {
    it('1대의 자동차', () => {
      typeNameAndEnter('BMW');
      $tryCountSection().should('be.visible');
    });
    it('3대의 자동차', () => {
      typeNameAndEnter('BMW, AUDI, K9');
      $tryCountSection().should('be.visible');
    });
  });

  context('5자 초과의 이름을 입력하고 확인버튼을 클릭한다.', () => {
    it('1대의 자동차', () => {
      typeNameAndClick('MASERATI');
      alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
    });

    it('3대의 자동차', () => {
      typeNameAndClick('BMW, MERCEDES, K9');
      alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
    });
  });

  context('5자 초과의 이름을 입력하고 엔터를 입력한다.', () => {
    it('1대의 자동차', () => {
      typeNameAndEnter('MASERATI');
      alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
    });

    it('3대의 자동차', () => {
      typeNameAndEnter('BMW, MERCEDES, K9');
      alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
    });
  });
});

describe('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
  beforeEach(() => {
    $namingInput().type('BMW');
    $namingButton().click();
  });

  context('1회 이상을 입력하고 버튼을 클릭한다.', () => {
    it('1회', () => {
      typeTryCountAndClick(1);
      $playCars().should('be.visible');
    });
    it('3회', () => {
      typeTryCountAndClick(3);
      $playCars().should('be.visible');
    });
  });

  context('1회 이상을 입력하고 엔터를 입력한다.', () => {
    it('1회', () => {
      typeTryCountAndEnter(1);
      $playCars().should('be.visible');
    });
    it('3회', () => {
      typeTryCountAndEnter(3);
      $playCars().should('be.visible');
    });
  });

  context('0회 이하를 입력하고 버튼을 클릭한다.', () => {
    it('0회', () => {
      typeTryCountAndClick(0);
      alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
    });
    it('-1회', () => {
      typeTryCountAndClick(-1);
      alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
    });
  });

  context('0회 이하를 입력하고 엔터를 입력한다.', () => {
    it('0회', () => {
      typeTryCountAndEnter(0);
      alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
    });
    it('-1회', () => {
      typeTryCountAndEnter(-1);
      alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
    });
  });
});

describe.skip('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {});

describe.skip('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {});
