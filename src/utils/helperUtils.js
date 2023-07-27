export const findItemsWithCondition = (items, condition, valueGetter) => {
  const result = items.filter(condition).map(valueGetter)

  return result
}

export const findMaxValue = (items, valueGetter) => {
  let maxValue = 0

  items.forEach((item) => {
    const value = valueGetter(item)
    if (value > maxValue) maxValue = value
  })

  return maxValue
}

export const makeRandomNum = () => {
  return Math.floor(Math.random() * 10)
}
