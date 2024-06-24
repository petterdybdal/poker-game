import { PokerHand } from '../models/poker';
import { PokerHandViewModel } from '../models/pokerViewModels';
import { compareMultipleHands, getHandRankName } from '../utils/comparing';
import { handToViewModel, viewModelToHand } from '../utils/mappers';
import { createDeck, shuffleDeck } from '../utils/pokerUtils';

export const createHand = (): { hand: PokerHandViewModel; rank: string } => {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  const hand = shuffledDeck.slice(0, 5) as PokerHand;

  return {
    hand: handToViewModel(hand),
    rank: getHandRankName(hand),
  };
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
