import { Car } from '../../src/domain/Car';

describe("Car Test", () => {
    describe("Car가 생성될 때", () => {
        describe("이름이", () => {
            describe("비어있다면", () => {
                it("에러가 발생한다", () => {
                    expect(() => new Car('')).toThrow('Car name should not be empty');
                });
            })
    
            describe("빈 공백이라면", () => {
                it("에러가 발생한다", () => {
                    expect(() => new Car(' ')).toThrow('Car name should not be empty');
                });
            });
            
            describe("5자 초과라면", () => {
                it("에러가 발생한다", () => {
                    expect(() => new Car('pobicon')).toThrow('Car name length should be less than 5');
                });
            })
            
            describe("5자 이하라면", () => {
                it("생성된다", () => {
                    const car = new Car('pobi');
                    expect(car.name).toBe('pobi');
                });
            })
    
    
        });
    })
    
    describe("Car가 생성되고", () => {
    
        const car = new Car('pobi');
    
        describe("move를 호출하면", () => {
    
            it("1만큼 이동한다", () => {
                car.move();
                expect(car.position).toBe(1);
            });
        });
    
        describe("position을 조회하면", () => {
            it("현재 위치를 반환한다", () => {
                expect(car.position).toBe(1);
            });
        });
    
        describe("name을 조회하면", () => {
            it("현재 이름을 반환한다", () => {
                expect(car.name).toBe('pobi');
            });
        });
    });
})


