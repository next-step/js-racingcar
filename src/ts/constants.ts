export type AnyObj = { [key: string]: any }
export type StrObj = { [key: string]: string }
export type Elem = HTMLElement | string

export enum Status {
  idle = 'idle',
  playing = 'playing',
  finished = 'finished',
}

export const Boundaries = {
  ForwardCutOff: 4,
  MaximumNameLength: 5,
}

export const ErrorMsgs = {
  NAME_LENGTH_LIMIT: '이름은 5글자 이하만 가능',
}

export const CongratulationMsg = '님 축하합니다.'
