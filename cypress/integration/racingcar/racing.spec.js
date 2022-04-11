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

before(function () {
  cy.fixture('racingcar/normal').then((data) => {
    this.normal = data;
  });
  cy.fixture('racingcar/fail').then((data) => {
    this.fail = data;
  });
});

afterEach(() => {
  cy.reload();
});

const startCars = (names, tryCounts) => {
  cy.typeAndClick($namingInput, $namingButton, names);
  cy.typeAndClick($tryCountInput, $tryCountButton, tryCounts);
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
  context(
    '이름을 입력하고 확인버튼을 클릭하면 시도할 횟수를 입력하는 공간이 보인다.',
    () => {
      it('1대의 자동차', function () {
        cy.typeAndClick($namingInput, $namingButton, this.normal.one_car_name);
        $tryCountSection().should('be.visible');
      });

      it('3대의 자동차', function () {
        cy.typeAndClick($namingInput, $namingButton, this.normal.three_car_names);
        $tryCountSection().should('be.visible');
      });
    },
  );

  context('이름을 입력하고 엔터를 입력하면 시도할 횟수를 입력하는 공간이 보인다.', () => {
    it('1대의 자동차', function () {
      cy.typeAndEnter($namingInput, this.normal.one_car_name);
      $tryCountSection().should('be.visible');
    });

    it('3대의 자동차', function () {
      cy.typeAndEnter($namingInput, this.normal.three_car_names);
      $tryCountSection().should('be.visible');
    });
  });

  context(
    '5자 초과의 이름을 입력하고 확인버튼을 클릭하면 사용자에게 경고 메시지를 보여준다.',
    () => {
      it('1대의 자동차', function () {
        cy.typeAndClick($namingInput, $namingButton, this.fail.one_car_name);
        alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
      });

      it('3대의 자동차', function () {
        cy.typeAndClick($namingInput, $namingButton, this.fail.three_car_names);
        alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
      });
    },
  );

  context(
    '5자 초과의 이름을 입력하고 엔터를 입력하면 사용자에게 경고 메시지를 보여준다.',
    () => {
      it('1대의 자동차', function () {
        cy.typeAndClick($namingInput, $namingButton, this.fail.one_car_name);
        alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
      });

      it('3대의 자동차', function () {
        cy.typeAndClick($namingInput, $namingButton, this.fail.three_car_names);
        alertMessageContainsCheck(NOT_ALLOWED_NAME_LENGTH);
      });
    },
  );
});

describe('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
  beforeEach(function () {
    cy.typeAndClick($namingInput, $namingButton, this.normal.one_car_name);
  });

  context(
    '시도활 횟수를 입력하고 버튼을 클릭하면 움직임을 시작할 자동차가 보인다.',
    () => {
      it('1회', function () {
        cy.typeAndClick($tryCountInput, $tryCountButton, 1);
        $playCars().should('be.visible');
      });

      it('3회', function () {
        cy.typeAndClick($tryCountInput, $tryCountButton, 3);
        $playCars().should('be.visible');
      });
    },
  );

  context(
    '시도활 횟수를 입력하고 엔터를면입력하면 움직임을 시작할 자동차가 보인다.',
    () => {
      it('1회', function () {
        cy.typeAndEnter($tryCountInput, 1);
        $playCars().should('be.visible');
      });

      it('3회', function () {
        cy.typeAndEnter($tryCountInput, 3);
        $playCars().should('be.visible');
      });
    },
  );

  context(
    '0회 이하를 입력하고 버튼을 클릭하면 사용자에게 경고 메시지를 보여준다. ',
    () => {
      it('0회', function () {
        cy.typeAndClick($tryCountInput, $tryCountButton, 0);
        alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
      });
      it('-1회', function () {
        cy.typeAndClick($tryCountInput, $tryCountButton, -1);
        alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
      });
    },
  );

  context(
    '0회 이하를 입력하고 엔터를 입력하면 사용자에게 경고 메시지를 보여준다..',
    () => {
      it('0회', function () {
        cy.typeAndEnter($tryCountInput, 0);
        alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
      });
      it('-1회', function () {
        cy.typeAndEnter($tryCountInput, -1);
        alertMessageContainsCheck(NOT_ALLOWED_TRY_COUNT);
      });
    },
  );
});

describe.skip('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {});

describe.skip('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {});
