import { PokerCard, PokerHand, PokerSuit, PokerValue } from '../models/poker';
import {
  PokerCardViewModel,
  PokerHandViewModel,
} from '../models/pokerViewModels';

export const cardToViewModel = (card: PokerCard): PokerCardViewModel => {
  return `${card.value}${card.suit}`;
};

export const handToViewModel = (hand: PokerCard[]): PokerHandViewModel => {
  if (hand.length !== 5) throw new Error('Hand must have 5 cards');
  return hand.map(cardToViewModel) as PokerHandViewModel;
};

export const viewModelToHand = (hand: PokerHandViewModel): PokerHand => {
  if (hand.length !== 5) throw new Error('Hand must have 5 cards');
  return hand.map(viewModelToCard) as PokerHand;
};

export const viewModelToCard = (card: PokerCardViewModel): PokerCard => {
  return {
    value: card[0] as PokerValue,
    suit: card[1] as PokerSuit,
  };
};
