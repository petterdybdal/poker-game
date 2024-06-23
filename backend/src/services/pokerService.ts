import { PokerHand } from '../models/poker';
import { PokerHandViewModel } from '../models/pokerViewModels';
import { handToViewModel, viewModelToHand } from '../utils/mappers';
import { compareTwoHands, createDeck, shuffleDeck } from '../utils/pokerUtils';

export const createHand = (): PokerHandViewModel => {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  return handToViewModel(shuffledDeck.slice(0, 5));
};

export const getHands = (): PokerHand[] => {
  return [];
};

export const compareHands = (
  hand1: PokerHandViewModel,
  hand2: PokerHandViewModel
): string => {
  return compareTwoHands(viewModelToHand(hand1), viewModelToHand(hand2));
};
