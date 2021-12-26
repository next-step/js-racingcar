export const createRandomNumber = () => Math.floor(Math.random() * 10)
export const cloneDeep = (data) => JSON.parse(JSON.stringify(data))

export const delay = (func, ms = 2000) => {
  setTimeout(func, ms)
}
