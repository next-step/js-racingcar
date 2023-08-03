import { createInterface } from 'readline'

export const gamePrompt = createInterface({
  input: process.stdin,
  output: process.stdout
})
