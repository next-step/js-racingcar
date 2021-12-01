interface GetRandomNumberProps {
  min: number
  max: number
}

const getRamdomNumber = ({ min, max }: GetRandomNumberProps) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { getRamdomNumber }
