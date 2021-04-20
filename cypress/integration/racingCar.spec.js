import { RacingCar, RacingCars } from "../../src/js/component/racingCar"
import { numbers } from "../../src/js/utils/constant";

describe('자동차 객체를 테스트', () => {
  let car;
  
  beforeEach('자동차 초기화', () => {
    car = new RacingCar();
  })
  
  it('자동차 객체를 생성한다.', () => {
    cy.wrap(car)
      .invoke('getForward')
      .should('eq', numbers['INIT_NUM'])
  })

  it('자동차는 전진할 수 있다.', () => {
    cy.wrap(car)
      .invoke('move', true)
    cy.wrap(car)
      .invoke('getForward')
      .should('eq', numbers['INIT_NUM'] + 1)
  })

  it('자동차는 멈출 수 있다.', () => {
    cy.wrap(car)
      .invoke('move', false)
    cy.wrap(car)
      .invoke('getForward')
      .should('eq', numbers['INIT_NUM'])
  })
})


describe('자동차목록을 테스트', () => {
  const carNum = 3;
  const tryNum = 5;
  let cars;

  beforeEach('자동차들을 초기화', () => {
    cars = new RacingCars(carNum)
  })

  it('n대의 자동차를 보유', () => {
    cy.wrap(cars)
      .invoke('getForwards')
      .its('length')
      .should('eq', carNum)
  })

  it('주어진 횟수만큼 자동차들은 전진할 수 있다.', () => {
    cy.wrap(cars)
      .invoke('move', tryNum, true)
    cy.wrap(cars)
      .invoke('getForwards')
      .each(forwards => cy.wrap(forwards).should('eq', numbers['INIT_NUM'] + tryNum))
  })

  it('주어진 횟수만큼 자동차들은 멈출 수 있다.', () => {
    cy.wrap(cars)
      .invoke('move', tryNum, false)
    cy.wrap(cars)
      .invoke('getForwards')
      .each(forwards => cy.wrap(forwards).should('eq', numbers['INIT_NUM']))
  })
})

