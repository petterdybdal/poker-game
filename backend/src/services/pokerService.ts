import { PokerHand } from '../models/poker';
import { PokerHandViewModel } from '../models/pokerViewModels';
import { compareMultipleHands } from '../utils/comparing';
import { handToViewModel, viewModelToHand } from '../utils/mappers';
import { createDeck, shuffleDeck } from '../utils/pokerUtils';

export const createHand = (): PokerHandViewModel => {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  return handToViewModel(shuffledDeck.slice(0, 5));
};

export const getHands = (): PokerHand[] => {
  return [];
};

export const compareHands = (
  hands: PokerHandViewModel[]
): PokerHandViewModel[] => {
  const winners = compareMultipleHands(hands.map(viewModelToHand));
  return winners.map(handToViewModel);
};
