import {describe, it, expect} from 'vitest';
import {getCommand} from "./src/module/core";

describe('core.js', () => {
    describe('getCommand', () => {
        it('4이상의 값이 주어지 면 go를 반환한다.',() => {
            expect(getCommand(4)).to.equal('go');
        })
        it('3이하의 값이 주어지 면 stop를 반환한다.',() => {
            expect(getCommand(3)).to.equal('stop');
        })
    })
})
