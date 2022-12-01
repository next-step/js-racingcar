describe('레이싱카 사이트 E2E 테스트', () => {
  const $element = {
    nameSubmitButton: '.name-submit-button',
    carNameInput: '.car-name-input',
    moveExplanation: '.move-explanation',
    movesInput: '.move-input',
    moveSubmitButton: '.move-submit-button',
    carPlayer: '.car-player',
    spinner: '.spinner',
  };

  const CAR_NAME = {
    VALID: '자동차',
    OVER_LENGTH: '길이가긴차이름',
    DIVERSE_CAR_NAME: ['자동차', '자.동차', '자동.차', 'CAR', 'CAR12'],
  };

  beforeEach(() => {
    cy.visit('../../index.html');
  });

  context('자동차에 이름을 부여할 수 있다. ', () => {
    it('자동차에 이름을 부여할 input이 존재한다.', () => {
      cy.get($element.carNameInput).should('exist');
    });

    it('자동차에 부여한 이름을 제출할 버튼이 존재한다.', () => {
      cy.get($element.nameSubmitButton).should('exist');
    });

    it('각 자동차이름은 1자 미만으로 입력한 뒤 제출하면 경고창이 발생한다.,', () => {
      cy.get($element.carNameInput).clear();
      cy.get($element.nameSubmitButton).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
        );
      });
    });

    it('각 자동차이름은 5자 이상으로 입력한 뒤 제출하면 경고창이 발생한다.,', () => {
      cy.get($element.carNameInput).type(CAR_NAME.OVER_LENGTH);
      cy.get($element.nameSubmitButton).click();

      cy.on('window:alert', (text) => {
        expect(text).to.contains(
          '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
        );
      });
    });

    it('이름을 제출 한 뒤 제출버튼이 비 활성화 되어야 한다.', () => {
      cy.get($element.carNameInput).type(CAR_NAME.VALID);
      cy.get($element.nameSubmitButton).click();
      cy.get($element.nameSubmitButton).should('be.disabled');
    });

    it('이름을 제출할 때 엔터버튼을 통해 제출이 가능해야한다.', () => {
      cy.get($element.carNameInput).type(CAR_NAME.VALID).type('{enter}');
      cy.get($element.nameSubmitButton).should('be.disabled');
    });
  });

  context('사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.', () => {
    beforeEach(() => {
      cy.get($element.carNameInput).type(CAR_NAME.VALID);
      cy.get($element.nameSubmitButton).click();
      cy.get($element.nameSubmitButton).should('be.disabled');
    });
    it('이름을 제출 한 뒤 시도할 횟수를 입력할 설명이 떠야 한다.', () => {
      cy.get($element.moveExplanation).should('exist');
    });

    it('이동 횟수를 기재 할 input이 있어야 한다.', () => {
      cy.get($element.movesInput).should('exist');
    });

    it('이동 횟수를 입력한 input은 번호만 입력할 수 있어야 한다.', () => {
      const [CHAR, NUMBER] = ['안녕', '12'];

      cy.get($element.movesInput).type(CHAR + NUMBER);
      cy.get($element.movesInput).should('have.value', NUMBER);
    });

    it('이동 횟수를 제출 할 button이 있어야 한다.', () => {
      cy.get($element.moveSubmitButton).should('exist');
    });

    it('이동 횟수를 제출 한 뒤 button이 비활성화 되어야 한다.', () => {
      const MOVE_NUMBER = 3;
      cy.get($element.movesInput).type(MOVE_NUMBER);
      cy.get($element.moveSubmitButton).click();
      cy.get($element.moveSubmitButton).should('be.disabled');
    });

    it('이동 횟수를 입력하지 않고 제출하면 이벤트가 발생하지 않음.', () => {
      cy.get($element.movesInput).clear();
      cy.get($element.moveSubmitButton).click();
      cy.get($element.moveSubmitButton).should('be.disabled');
      // cy.get($element.moveSubmitButton).should('exist');
    });
  });

  context('전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.', () => {
    it('이름과 이동횟수를 제출한 경우 기입한 자동차의 이름이 출력되어야 한다.', () => {
      const MOVE_NUMBER = 3;

      cy.get($element.carNameInput).type(CAR_NAME.VALID);
      cy.get($element.nameSubmitButton).click();
      cy.get($element.movesInput).type(MOVE_NUMBER);
      cy.get($element.moveSubmitButton).click();
      cy.get($element.carPlayer).should('have.text', CAR_NAME.VALID);
    });

    it('하나이상의 자동차 이름은 쉼표(,)를 기준으로 구분되어야 한다.', () => {
      const MOVE_NUMBER = 3;

      cy.get($element.carNameInput).type(CAR_NAME.DIVERSE_CAR_NAME.join(','));
      cy.get($element.nameSubmitButton).click();
      cy.get($element.movesInput).type(MOVE_NUMBER);
      cy.get($element.moveSubmitButton).click();
      cy.get($element.carPlayer).each((eachElement, index) => {
        cy.get(eachElement).should(
          'have.text',
          CAR_NAME.DIVERSE_CAR_NAME[index]
        );
      });
    });

    it('이름이 출력된 순간 이름 아래로 Spinner가 떠야한다.', () => {
      const MOVE_NUMBER = 3;

      cy.get($element.carNameInput).type(CAR_NAME.DIVERSE_CAR_NAME.join(','));
      cy.get($element.nameSubmitButton).click();
      cy.get($element.movesInput).type(MOVE_NUMBER);
      cy.get($element.moveSubmitButton).click();
      cy.get($element.carPlayer).each((eachElement, index) => {
        cy.get(eachElement).should(
          'have.text',
          CAR_NAME.DIVERSE_CAR_NAME[index]
        );
      });
      cy.get($element.spinner).should(
        'have.length',
        CAR_NAME.DIVERSE_CAR_NAME.length
      );
    });
  });

  context('주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.', () => {
    it('전진하는 조건은 0에서 9 사이에서 random 값을 구한 후 random 값이 4 이상일 경우 전진하고, 3 이하의 값이면 멈춘다.', () => {});

    it('전진하는 경우 화살표가 추가 되어야한다.', () => {});

    it('전지하지 않는 경우 화살표가 추가 되지 않는다.', () => {});
  });

  context(
    '자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.',
    () => {
      it('하나의 자동차가 제출한 이동 횟수에 도달하게 되면 최종우승자를 알려줘야한다.', () => {});

      it('우승자가 여러명일 경우 ,를 이용하여 구분한다.', () => {});

      it('최종우승자를 알게되면 다시 시작하기 버튼이 생성되어야 한다.', () => {});

      it('최종 우승자가 나오는 경우 끝을 알리는 Alert가 발생해야 한다.', () => {});

      it('다시 시작하기 버튼 클릭 시 모든 것이 최초의 상태로 돌아간다.', () => {});
    }
  );
});
