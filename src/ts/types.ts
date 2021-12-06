export type AnyObj = { [key: string]: any }
export type StrObj = { [key: string]: string }
export type Elem = HTMLElement | string

export enum Actions {
  init = 'init',
  reset = 'reset',
  setCarNames = 'setCarNames',
  setTotalAttempts = 'setTotalAttempts',
  race = 'race',
  raceFinished = 'raceFinished',
  notifyWinner = 'notifyWinner',
}

export enum Status {
  idle = 'idle',
  playing = 'playing',
  finished = 'finished',
}

export enum StateKeys {
  cars = 'cars',
  totalAttempts = 'totalAttempts',
  trial = 'trial',
  scores = 'scores',
  processing = 'processing',
  winners = 'winners',
  status = 'status',
}

export type State = {
  cars: string[]
  totalAttempts: number
  trial: number
  scores: number[][]
  processing: boolean
  winners: string[]
  status: Status
}

export type Dispatch = {
  actionType: typeof Actions
  data: AnyObj
}

export type DispatchEvent = CustomEvent & {
  detail: Dispatch
}

export type StoreMapper = (store: any) => PartialState

export type PartialState = Partial<State>
