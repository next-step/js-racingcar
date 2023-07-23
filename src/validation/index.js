import { isStringOverLength } from '../utils/common'

 export const checkOverStringLength = (value, length, message = `${length}자리 이하만 입력 가능합니다`) => {
    if(isStringOverLength(value, length)){
        throw new Error(message)
    }
 }

 export const checkEmptyString = (value) => {
    if(!value.toString().trim().length){
        throw new Error('최소 한글자 이상의 문자열을 입력해주세요.')
    }
 }