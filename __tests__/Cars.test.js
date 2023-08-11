import { Car } from '../src/model/Car'
import { Cars } from '../src/model/Cars'

const CAR_NAMES = ['산들', '뿌꾸']

describe('Cars: 경주에 참여하는 자동차들', () => {
  it('entries: 경주에 참여하는 자동차들의 컬렉션을 보유한다.', () => {
    const cars = new Cars(CAR_NAMES)
    expect(cars.entries.length).toBe(CAR_NAMES.length)
  })

  describe('자동차 이름을 받아와 이를 바탕으로 바탕으로 자동차 객체를 만든다.', () => {
    const cars = new Cars(CAR_NAMES)
    it('Car 객체의 인스턴스인지 확인', () => {
      cars.entries.forEach((car) => {
        expect(car).toBeInstanceOf(Car)
      })
    })

    it('만들어진 인스턴스의 이름이 주어진 이름과 일치하는지 확인', () => {
      CAR_NAMES.forEach((name, index) => {
        expect(cars.entries[index].name).toBe(name)
      })
    })

    test.each([[['산들', '뿌꾸', '천둥']], [['a', 'b', 'c', 'd', 'e']]])(
      '자동차 이름이 배열로 주어진 경우 : %s',
      (names) => {
        const cars = new Cars(names)
        expect(cars.entries.length).toBe(names.length)
      },
    )

    test.each([['산들,뿌꾸,천둥'], ['a,b,c,d,e,f']])(
      '자동차 이름이 문자열로 주어진 경우 : %s',
      (names) => {
        const cars = new Cars(names)
        const carNamesArr = names.split(',')
        expect(cars.entries.length).toBe(carNamesArr.length)
      },
    )
  })

  describe('validateNames(): 이름이 유효하지 않은 경우 프로그램을 종료한다.', () => {
    test.each([
      [[], 'names 배열이 비어있음'],
      ['', 'names가 문자열임'],
      [{}, 'names가 객체임'],
      [null, 'names가 null임'],
      [undefined, 'names가 undefined임'],
      [1, 'names가 숫자임'],
      [-1, 'names가 음수임'],
      [new Car('뿌꾸'), 'names가 Car 객체임'],
      ['배열이 아닌 문자열인 경우', 'names가 문자열임'],
      [{ carName: '산들', position: 0 }, 'names가 객체임'],
      [[1, 2, 3], 'names 가 숫자 배열임'],
      [['1', '2', '3'], 'names 가 숫자 문자열 배열임'],
      ['1,2,3', 'names 가 숫자 문자열임'],
    ])('new Cars(%s) 는 에러를 출력한다. 이유: %s', (names) => {
      expect(() => new Cars(names)).toThrow()
    })
  })

  describe('validateNames(): 이름 묶음에 중복된 값이 있을 경우 프로그램을 종료한다.', () => {
    test.each([
      [['산들', '산들', '산들']],
      [['산들', '산들', '뿌꾸']],
      [['산들', '뿌꾸', '뿌꾸']],
      [['산들', '뿌꾸', '산들']],
      [['sdsdfsdf', '뿌꾸', 'sdsdfsdf']],
      [['산들,산들,산들']],
      [['1,1,1']],
    ])('%s', (names) => {
      expect(() => new Cars(names)).toThrow()
    })
  })

  describe('move(): 자동차를 전진시켜 상태를 변경한다.', () => {
    const cars = new Cars(CAR_NAMES)
    it('전달받은 콜백함수 혹은 게임 조건 함수를 실행시켜 자동차 전진 여부를 결정한다.', () => {
      const alwaysMoveForward = () => true

      cars.move(alwaysMoveForward)

      expect(cars.status).toEqual([
        { name: '산들', position: 1 },
        { name: '뿌꾸', position: 1 },
      ])

      cars.move(alwaysMoveForward)

      expect(cars.status).toEqual([
        { name: '산들', position: 2 },
        { name: '뿌꾸', position: 2 },
      ])
    })
  })
})
