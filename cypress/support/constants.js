const CAR_NAMES = 'EAST, WEST, SOUTH, NORTH'
const CAR_NAMES_ARRAY = CAR_NAMES.split(',').map((name) => name.trim())
const WRONG_CAR_NAMES = CAR_NAMES + ', VERY_LONG_NAME'

export { CAR_NAMES, WRONG_CAR_NAMES, CAR_NAMES_ARRAY }
