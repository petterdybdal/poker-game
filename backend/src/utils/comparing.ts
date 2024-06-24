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

export const getHandRankName = (hand: PokerHand): string => {
  return handRank[getHandRank(hand)];
};

const getCardValue = (card: PokerCard): number => {
  return valueRank[card.value];
};

const sortByValueDescending = (hand: PokerHand): PokerHand => {
  return hand.sort((a, b) => getCardValue(b) - getCardValue(a));
};

const getNumberOfDuplicates = (hand: PokerHand): any => {
  const values = hand.map((card) => card.value);
  const valueCounts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.values(valueCounts);
};

const getNumberOfUniquePairs = (hand: PokerHand): number => {
  const values = hand.map((card) => card.value);
  return new Set(
    values.filter((value) => values.filter((v) => v === value).length === 2)
  ).size;
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

const isFullHouse = (hand: PokerHand): boolean => {
  return (
    getNumberOfDuplicates(hand).includes(3) &&
    getNumberOfDuplicates(hand).includes(2)
  );
};

const isFourOfAKind = (hand: PokerHand): boolean => {
  return getNumberOfDuplicates(hand).includes(4);
};

const isThreeOfAKind = (hand: PokerHand): boolean => {
  return getNumberOfDuplicates(hand).includes(3);
};

const isTwoPair = (hand: PokerHand): boolean => {
  return getNumberOfUniquePairs(hand) === 2;
};

const isPair = (hand: PokerHand): boolean => {
  return getNumberOfUniquePairs(hand) === 1;
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

// Takes an array of pokerhands
// Returns the winning hand
// If there is a tie, return all the winning hands
export const compareMultipleHands = (hands: PokerHand[]): PokerHand[] => {
  const sortedHands = hands.map((hand) => sortByValueDescending(hand));
  const rankedHands = sortedHands.map((hand) => ({
    hand,
    rank: getHandRank(hand),
  }));
  const maxRank = Math.max(...rankedHands.map((rh) => rh.rank));
  const winningHands = rankedHands
    .filter((rh) => rh.rank === maxRank)
    .map((wh) => wh.hand);
  if (winningHands.length === 1) return winningHands;

  // There are multiple winning hands by rank, so we need to compare them further
  switch (maxRank) {
    case 1:
      return comparePairs(winningHands);
    case 2:
      return compareTwoPairs(winningHands);
    case 3:
      return compareThreeOrFourOfAKind(winningHands, 3);
    case 6:
      return compareFullHouse(winningHands);
    case 7:
      return compareThreeOrFourOfAKind(winningHands, 4);
    // For flush, straight, straight flush and high card, we can just compare the highest card
    default:
      return compareHighCard(winningHands);
  }
};

const compareHighCard = (hands: PokerHand[]): PokerHand[] => {
  let winningHands = hands;
  for (let i = 0; i < hands[0].length; i++) {
    const highestCardValue = Math.max(
      ...winningHands.map((h) => getCardValue(h[i]))
    );
    winningHands = winningHands.filter(
      (h) => getCardValue(h[i]) === highestCardValue
    );
  }
  return winningHands.map((h) => h);
};

const comparePairs = (hands: PokerHand[]): PokerHand[] => {
  let winningHands = hands;
  // figure out which hand has the highest pair
  const highestPairValue = Math.max(
    ...winningHands.map((h) => {
      const values = h.map((c) => c.value);
      return parseInt(
        values.find((v) => values.filter((value) => value === v).length === 2)!
      );
    })
  );
  winningHands = winningHands.filter((h) =>
    h.find((c) => c.value === highestPairValue.toString())
  );
  if (winningHands.length === 1) return winningHands;
  // Multiple hands have the same pair, so we compare high card
  return compareHighCard(winningHands);
};

const compareTwoPairs = (hands: PokerHand[]): PokerHand[] => {
  let winningHands = hands;
  // figure out which hand has the highest pair
  const highestPairValue = Math.max(
    ...winningHands.map((h) => {
      const values = h.map((c) => c.value);
      return parseInt(
        values.find((v) => values.filter((value) => value === v).length === 2)!
      );
    })
  );
  winningHands = winningHands.filter((h) =>
    h.find((c) => c.value === highestPairValue.toString())
  );
  if (winningHands.length === 1) return winningHands;
  // figure out which hand has the highest second pair
  const secondHighestPairValue = Math.max(
    ...winningHands.map((h) => {
      const values = h.map((c) => c.value);
      return parseInt(
        values.find(
          (v) =>
            values.filter((value) => value === v).length === 2 &&
            v !== highestPairValue.toString()
        )!
      );
    })
  );
  winningHands = winningHands.filter((h) =>
    h.find((c) => c.value === secondHighestPairValue.toString())
  );
  if (winningHands.length === 1) return winningHands;
  // Multiple hands have the same pairs, so we compare high card
  return compareHighCard(winningHands);
};

const compareThreeOrFourOfAKind = (
  hands: PokerHand[],
  numberOfDuplicates: number
): PokerHand[] => {
  let winningHands = hands;
  // Figure out which hand has the highest three or four of a kind
  // No two hands can have the same three or four of a kind, so we don't need to check for ties
  const highestValue = Math.max(
    ...winningHands.map((h) => {
      const values = h.map((c) => c.value);
      return parseInt(
        values.find(
          (v) =>
            values.filter((value) => value === v).length === numberOfDuplicates
        )!
      );
    })
  );
  return winningHands.filter((h) =>
    h.find((c) => c.value === highestValue.toString())
  );
};

const compareFullHouse = (hands: PokerHand[]): PokerHand[] => {
  // For a full house, we only need to compare the three of a kind
  // Since no two full houses can have the same three of a kind, we don't need to check for ties
  const highestThreeOfAKindValue = Math.max(
    ...hands.map((h) => {
      const values = h.map((c) => c.value);
      return parseInt(
        values.find((v) => values.filter((value) => value === v).length === 3)!
      );
    })
  );
  return hands.filter((h) =>
    h.find((c) => c.value === highestThreeOfAKindValue.toString())
  );
};
