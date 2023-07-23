import Car from '../src/domain/car'
import CarRace from '../src/domain/carRace'

describe('CarRace', () => {
    it('자동차 이름은 쉼표(,)를 기준으로 구분한다.', () => {
        const carRace = new CarRace([new Car('광민'), new Car('문광민'), new Car('Jason') ])
        
        expect(carRace.participantNames).toBe('광민, 문광민, Jason')
    })
})