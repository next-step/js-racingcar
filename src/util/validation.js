import { SETTING, ERROR } from '../constants/index.js'

export const validation = (name) => {
  const { MAX_NAME_LENGTH, MIN_NAME_LENGTH } = SETTING
  const { MAX_NAME, MIN_NAME } = ERROR

  if(name.length > MAX_NAME_LENGTH) {
    throw new Error(MAX_NAME)
  }

  if(name.length < MIN_NAME_LENGTH) {
    throw new Error(MIN_NAME)
  }
  return name
}