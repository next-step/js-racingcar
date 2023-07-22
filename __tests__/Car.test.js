describe('Car', () => {
    describe('자동차에 이름을 부여할 수 있다', () => {
        test.each([
            ['광민', '광민'],
            ['json', 'jason'],
            ['Moon', 'Moon'],
            ['문 광민', '문 광민']
        ])('carName(%s, %s)', (carName, expected) => {
            const name = new Car(carName).name;
            expect(name).toBe(expected)
        })
    })

    describe('자동차 이름은 5자리 이하만 가능하다.', () => {
        test.each([
            ['자바스크립트'],
            ['json Moon'],
        ])('carName(%s)', (carName) => {
            const lengthOfCarName = 5

            expect(() => new Car(carName)).toThrowError(`자동차 이름은 ${lengthOfCarName}자리까지 가능합니다.`)
        })
    })

    describe('공백 또는 빈문자열만 있는 이름은 부여할 수 없습니다.', () => {
        test.each([
            [' '],
            ['   '],
            ['']
        ])('carName(%s)', (carName) => {
            expect(() => new Car(carName)).toThrowError(`최소 한글자 이상의 문자열을 입력해주세요.`)
        })
    })


})