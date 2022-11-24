/* eslint-disable no-undef */

describe('자동차 경주 게임 요구사항을 점검한다', () => {
  const URL = '../../index.html';

  beforeEach(() => {
    cy.visit(URL);
  });

  describe('1단계: 자동차 이름을 입력한다.', () => {
    it('자동차 이름 입력 폼에 이름은 1자~5자까지만 가능하다', () => {
      expect(false).to.be.true;
    });
    it('자동차 이름 입력 확인 버튼이 있다', () => {
      expect(false).to.be.true;
    });
    it('자동차 이름 입력 후 확인 버튼을 누르면 시도할 횟수를 입력하는 상자가 뜬다', () => {
      expect(false).to.be.true;
    });
    it('자동차 이름 입력 후 엔터를 누르면 시도할 횟수를 입력하는 상자가 뜬다', () => {
      expect(false).to.be.true;
    });
  });

  describe('2단계: 시도할 횟수를 입력한다', () => {
    it('시도 횟수는 1회 이상이어야 한다', () => {
      expect(false).to.be.true;
    });
    it('시도 횟수 입력 후 확인 버튼을 누를 수 있다', () => {
      expect(false).to.be.true;
    });
    it('시도 횟수 입력 후 확인 버튼을 누르면  누르면 자동차 경주를 시작한다', () => {
      expect(false).to.be.true;
    });
    it('시도 횟수 입력 후 엔터를 누르면 자동차 경주를 시작한다', () => {
      expect(false).to.be.true;
    });
  });

  describe('3단계: 경주를 시작한다', () => {
    it('경주 종료 후 화살표의 개수는 "시도횟수-1개"이다', () => {
      expect(false).to.be.true;
    });
    // TODO: 2단계와 3단계 요구사항은 STEP2 이후에 입력
  });
});
