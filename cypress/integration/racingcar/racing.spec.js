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

afterEach(() => {
  cy.reload();
});

describe('자동차에 이름을 부여할 수 있다. 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {});

describe('자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.', () => {
  const typeNameAndClick = (name) => {
    $namingInput().type(name);
    $namingButton().click();
    $tryCountSection().should('be.visible');
  };

  const typeNameAndEnter = (name) => {
    $namingInput().type(name + '{enter}');
    $tryCountSection().should('be.visible');
  };

  const typeNameAndClickGotAlert = (name) => {
    $namingInput().type(name);
    $namingButton().click();
    cy.on('window:alert', (msg) => {
      expect(msg).to.contains(NOT_ALLOWED_NAME_LENGTH);
    });
  };

  const typeName다ndEnterGotAlert = (name) => {
    $namingInput().type(name + '{enter}');
    cy.on('window:alert', (msg) => {
      expect(msg).to.contains(NOT_ALLOWED_NAME_LENGTH);
    });
  };

  context('5자 이하의 이름을 입력하고 확인버튼을 클릭한다.', () => {
    it('1개의 자동차', () => {
      typeNameAndClick('BMW');
    });
    it('3개의 자동차', () => {
      typeNameAndClick('BMW, AUDI, K9');
    });
  });

  context('5자 이하의 이름을 입력하고 엔터를 입력한다.', () => {
    it('1개의 자동차', () => {
      typeNameAndEnter('BMW');
    });
    it('3개의 자동차', () => {
      typeNameAndEnter('BMW, AUDI, K9');
    });
  });

  context('5자 초과의 이름을 입력하고 확인버튼을 클릭한다.', () => {
    it('1개의 자동차', () => {
      typeNameAndClickGotAlert('MASERATI');
    });

    it('3개의 자동차', () => {
      typeNameAndClickGotAlert('BMW, MERCEDES, K9');
    });
  });

  context('5자 초과의 이름을 입력하고 엔터를 입력한다.', () => {
    it('1개의 자동차', () => {
      typeName다ndEnterGotAlert('MASERATI');
    });

    it('3개의 자동차', () => {
      typeName다ndEnterGotAlert('BMW, MERCEDES, K9');
    });
  });
});

describe.only('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
  beforeEach(() => {
    $namingInput().type('BMW');
    $namingButton().click();
  });

  const typeTryCountAndClick = (tryCount) => {
    $tryCountInput().type(tryCount);
    $tryCountButton().click();
    $playCars().should('be.visible');
  };

  const typeTryCountAndEnter = (tryCount) => {
    $tryCountInput().type(tryCount + '{enter}');
    $playCars().should('be.visible');
  };

  const typeTryCountAndClickGotAlert = (tryCount) => {
    $tryCountInput().type(tryCount);
    $tryCountButton().click();
    cy.on('window:alert', (msg) => {
      expect(msg).to.contains(NOT_ALLOWED_TRY_COUNT);
    });
  };

  const typeTryCountAndEnterGotAlert = (tryCount) => {
    $tryCountInput().type(tryCount + '{enter}');
    cy.on('window:alert', (msg) => {
      expect(msg).to.contains(NOT_ALLOWED_TRY_COUNT);
    });
  };

  context('1회 이상을 입력하고 버튼을 클릭한다.', () => {
    it('1회', () => {
      typeTryCountAndClick(1);
    });
    it('3회', () => {
      typeTryCountAndClick(3);
    });
  });

  context('1회 이상을 입력하고 엔터를 입력한다.', () => {
    it('1회', () => {
      typeTryCountAndEnter(1);
    });
    it('3회', () => {
      typeTryCountAndEnter(3);
    });
  });

  context('0회 이하를 입력하고 버튼을 클릭한다.', () => {
    it('0회', () => {
      typeTryCountAndClickGotAlert(0);
    });
    it('-1회', () => {
      typeTryCountAndClickGotAlert(-1);
    });
  });

  context('0회 이하를 입력하고 엔터를 입력한다.', () => {
    it('0회', () => {
      typeTryCountAndEnterGotAlert(0);
    });
    it('-1회', () => {
      typeTryCountAndEnterGotAlert(-1);
    });
  });
});

describe('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {});

describe('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {});
