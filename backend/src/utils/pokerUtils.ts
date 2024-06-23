import { PokerCard, PokerHand } from '../models/poker';

const suits: PokerCard['suit'][] = ['s', 'h', 'r', 'k'];
const values: PokerCard['value'][] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  't',
  'j',
  'q',
  'k',
  'a',
];

export const createDeck = (): PokerCard[] => {
  const deck: PokerCard[] = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ value, suit });
    }
  }
  return deck;
};

export const shuffleDeck = (deck: PokerCard[]): PokerCard[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
};

export const compareTwoHands = (hand1: PokerHand, hand2: PokerHand): string => {
  return 'Not implemented yet';
};
