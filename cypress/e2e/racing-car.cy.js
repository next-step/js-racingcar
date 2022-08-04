describe('플레이어 이름 입력', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('빈칸만 플레이어 이름으로 입력할 경우, "플레이어 이름을 입력해주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '         ';

    cy.get('#input-car-player-name').type(carName);

    cy.get('#input-car-player-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '플레이어 이름을 입력해주세요.');
    cy.get('#input-attempt').should('not.be.visible');
  });

  it('"," 이후  플레이어 이름을 입력 안힌 경우, "플레이어 이름을 입력해주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '테스트, ';

    cy.get('#input-car-player-name').type(carName);

    // FIXME: cy.getValidationMessage(target)
    cy.get('#input-car-player-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '플레이어 이름을 입력해주세요.');
    cy.get('#input-attempt').should('not.be.visible');
  });

  it('빈칸만 플레이어 이름으로 입력할 경우, "플레이어 이름은 5자 이하로 작성해 주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '자동차테스트, 자동차';

    cy.get('#input-car-player-name').type(carName);

    cy.get('#input-car-player-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '플레이어 이름은 5자 이하로 작성해 주세요.');
    cy.get('#input-attempt').should('not.be.visible');
  });

  it('플레이어 이름을 5개 초과로 입력할 경우, "플레이어 이름을 5개이하로 입력해주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4, 자동차5, 자동차6';

    cy.get('#input-car-player-name').type(carName);

    cy.get('#input-car-player-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '플레이어 이름을 5개이하로 입력해주세요.');
    cy.get('#input-attempt').should('not.be.visible');
  });

  it('플레이어 이름을 5개 초과로 입력할 경우, "플레이어 이름을 5개이하로 입력해주세요." 텍스트를 확인할 수 있다. ', () => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4, 자동차5, 자동차6';

    cy.get('#input-car-player-name').type(carName);

    cy.get('#input-car-player-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '플레이어 이름을 5개이하로 입력해주세요.');
    cy.get('#input-attempt').should('not.be.visible');
  });

  it('빈 플레이어 이름 제출할 경우, "이 입력란을 작성하세요." 텍스트를 확인할 수 있다. ', () => {
    cy.get('#input-car-player-name')
      .invoke('prop', 'validationMessage')
      .should('eq', '이 입력란을 작성하세요.');
    cy.get('#input-attempt').should('not.be.visible');
  });

  it('플레이어 이름 입력하면, 입력이 비활성화 된다.', () => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4';

    cy.get('#input-car-player-name').type(carName);
    cy.get('#form-car-player-name').submit();

    cy.get('#form-car-player-name').find('fieldset').invoke('prop', 'disabled').should('eq', true);
  });

  it('플레이어 이름 입력 및 제출할 경우, 시도횟수를 입력할 수 있다.', () => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4';

    cy.get('#input-car-player-name').type(carName);
    cy.get('#form-car-player-name').submit();

    cy.get('#input-attempt').should('be.visible');
  });
});

describe('시도 횟수 입력', () => {
  beforeEach(() => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4';

    cy.visit('/');
    cy.get('#input-car-player-name').type(carName);
    cy.get('#form-car-player-name').submit();
  });

  it('시도횟수를 1미만으로 입력하면, "값은 1 이상이어야 합니다." Error message를 확인할 수 있다.', () => {
    const attempt = 0;

    cy.get('#input-attempt').type(attempt);

    cy.get('#input-attempt')
      .invoke('prop', 'validationMessage')
      .should('eq', '값은 1 이상이어야 합니다.');
  });

  it('시도횟수를 20초과로 입력하면, "값은 20 이하여야 합니다." Error message를 확인할 수 있다.', () => {
    const attempt = 21;

    cy.get('#input-attempt').type(attempt);

    cy.get('#input-attempt')
      .invoke('prop', 'validationMessage')
      .should('eq', '값은 20 이하여야 합니다.');
  });

  it('시도를 입력하지 않고 제출할 경우, "이 입력란을 작성하세요." 텍스트를 확인할 수 있다. ', () => {
    cy.get('#input-attempt').clear();

    cy.get('#form-attempt').submit();

    cy.get('#input-attempt')
      .invoke('prop', 'validationMessage')
      .should('eq', '이 입력란을 작성하세요.');
  });

  it('시도를 입력하면, 입력이 비활성화 된다.', () => {
    const attempt = 10;

    cy.get('#input-attempt').type(attempt);

    cy.get('#form-attempt').submit();

    cy.get('#form-attempt').find('fieldset').invoke('prop', 'disabled').should('eq', true);
  });
});

describe('레이싱', () => {
  const setup = () => {
    const carName = '자동차1, 자동차2, 자동차3, 자동차4';
    const carNameCount = 4;
    const attempt = 5;
    const waitTime = 5000;

    return {
      carName,
      carNameCount,
      attempt,
      waitTime,
    };
  };

  beforeEach(() => {
    const { carName, attempt } = setup();

    cy.visit('/');

    cy.get('#input-car-player-name').type(carName);
    cy.get('#form-car-player-name').submit();
    cy.get('#input-attempt').type(attempt);
    cy.get('#form-attempt').submit();
  });

  it('플레이어 이름와 시도를 정상적으로 입력하면, 플레이를 볼 수 있다.', () => {
    const { carNameCount } = setup();

    cy.get('.car-player').then($player => {
      cy.wrap($player).should('have.length', carNameCount);
      cy.wrap($player[0]).should('have.text', '자동차1');
      cy.wrap($player[1]).should('have.text', '자동차2');
      cy.wrap($player[2]).should('have.text', '자동차3');
      cy.wrap($player[3]).should('have.text', '자동차4');
    });
  });

  it('플레이어 이름와 시도를 정상적으로 입력하면, 플레이 시간이 끝나면 결과를 볼 수 있다.', () => {
    const { waitTime } = setup();

    cy.wait(waitTime);

    cy.get('#race-result').should('be.visible');
  });
});
