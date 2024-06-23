import { PokerCard, PokerHand } from '../models/poker';

const valueRank: Record<string, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  't': 10,
  'j': 11,
  'q': 12,
  'k': 13,
  'a': 14,
};

const handRank: Record<number, string> = {
  0: 'High card',
  1: 'Pair',
  2: 'Two pair',
  3: 'Three of a kind',
  4: 'Straight',
  5: 'Flush',
  6: 'Full house',
  7: 'Four of a kind',
  8: 'Straight flush',
};

const getCardValue = (card: PokerCard): number => {
  return valueRank[card.value];
};

const sortByValueDescending = (hand: PokerHand): PokerHand => {
  return hand.sort((a, b) => getCardValue(b) - getCardValue(a));
};

const isFlush = (hand: PokerHand): boolean => {
  return hand.every((card) => card.suit === hand[0].suit);
};

const isStraight = (hand: PokerHand): boolean => {
  const values = hand.map(getCardValue);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return max - min === 4 && new Set(values).size === 5;
};

const isFourOfAKind = (hand: PokerHand): boolean => {
  const values = hand.map((card) => card.value);
  return (
    values.filter((value) => values.filter((v) => v === value).length === 4)
      .length === 1
  );
};

const isFullHouse = (hand: PokerHand): boolean => {
  const values = hand.map((card) => card.value);
  return (
    values.filter((value) => values.filter((v) => v === value).length === 3)
      .length === 1 &&
    values.filter((value) => values.filter((v) => v === value).length === 2)
      .length === 1
  );
};

const isThreeOfAKind = (hand: PokerHand): boolean => {
  const values = hand.map((card) => card.value);
  return (
    values.filter((value) => values.filter((v) => v === value).length === 3)
      .length === 1
  );
};

const isTwoPair = (hand: PokerHand): boolean => {
  const values = hand.map((card) => card.value);
  return (
    values.filter((value) => values.filter((v) => v === value).length === 2)
      .length === 2
  );
};

const isPair = (hand: PokerHand): boolean => {
  const values = hand.map((card) => card.value);
  return (
    values.filter((value) => values.filter((v) => v === value).length === 2)
      .length === 1
  );
};

const getHandRank = (hand: PokerHand): number => {
  if (isFlush(hand) && isStraight(hand)) return 8;
  if (isFourOfAKind(hand)) return 7;
  if (isFullHouse(hand)) return 6;
  if (isFlush(hand)) return 5;
  if (isStraight(hand)) return 4;
  if (isThreeOfAKind(hand)) return 3;
  if (isTwoPair(hand)) return 2;
  if (isPair(hand)) return 1;
  return 0;
};

export const compareTwoHands = (
  hand1: PokerHand,
  hand2: PokerHand
): PokerHand | null => {
  hand1 = sortByValueDescending(hand1);
  hand2 = sortByValueDescending(hand2);

  const rank1 = getHandRank(hand1);
  const rank2 = getHandRank(hand2);

  if (rank1 > rank2) return hand1;
  else if (rank1 < rank2) return hand2;

  const compareKickers = (hand1: PokerHand, hand2: PokerHand): PokerHand | null => {
    for (let i = 0; i < 5; i++) {
      if (getCardValue(hand1[i]) > getCardValue(hand2[i])) return hand1;
      else if (getCardValue(hand1[i]) < getCardValue(hand2[i])) return hand2;
    }
    return null;
  }

  // If ranks are equal, we need to figure out who has the better hand
  switch (rank1) {
    // For these cases, we can just compare the cards in the sorted hands
    case 8: // Straight flush
    case 5: // Flush
    case 4: // Straight
    case 0: // High card
      return compareKickers(hand1, hand2);
    // For three of a kind and four of a kind, the middle card will always be part of the set
    case 7: // Four of a kind
    case 3: // Three of a kind
      const value1 = hand1[2].value;
      const value2 = hand2[2].value;
      if (valueRank[value1] > valueRank[value2]) return hand1;
      else if (valueRank[value1] < valueRank[value2]) return hand2;
      // If the sets are the same, we need to compare the kickers
      else return compareKickers(hand1, hand2);
    case 6: // Full house
    
      

};
