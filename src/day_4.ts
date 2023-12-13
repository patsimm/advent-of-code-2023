import { parseNumbers, splitLines } from "./helper.ts"

type Card = {
  line: string
  winningNumbers: number[]
  handNumbers: number[]
}
const parseCard = (card: string) => {
  const [winning, hand] = card.split("|")

  return {
    winningNumbers: parseNumbers(winning.trim()),
    handNumbers: parseNumbers(hand.trim()),
  }
}

const parseLine = (line: string): Card => {
  const [_, card] = line.split(":")
  return { ...parseCard(card), line }
}

const parse = (input: string) => {
  return splitLines(input)
    .map((line) => parseLine(line.trim()))
}

const winningNumbers = (card: Card) => {
  return card.handNumbers.filter((handNumber) =>
    card.winningNumbers.some((winningNumber) => winningNumber === handNumber)
  ).length
}

const cardValue = (card: Card) => {
  const winAmount = winningNumbers(card)
  let value = 0
  for (let i = 0; i < winAmount; i++) {
    value = i === 0 ? 1 : value * 2
  }
  return value
}

export const solve = (input: string): number => {
  const cards = parse(input)

  return cards.map(cardValue).reduce((prev, curr) => prev + curr, 0)
}

export const solve2 = (input: string): number => {
  const cards = parse(input)

  const cardAmount = cards.reduce(
    (prev, curr) => prev.set(curr, 1),
    new Map<Card, number>(),
  )

  for (const cardIndex of cards.keys()) {
    const amountWinning = winningNumbers(cards[cardIndex])

    const amountCurrentCard = cardAmount.get(cards[cardIndex]) || 1
    for (let i = 1; i <= amountWinning; i++) {
      const wonCard = cards.at(cardIndex + i)
      if (!wonCard) continue
      const amountWonCard = cardAmount.get(wonCard) || 1
      cardAmount.set(wonCard, amountWonCard + amountCurrentCard)
    }
  }

  return [...cardAmount.values()].reduce((prev, curr) => prev + curr, 0)
}
