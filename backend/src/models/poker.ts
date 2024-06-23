export type PokerHand = [PokerCard, PokerCard, PokerCard, PokerCard, PokerCard];

export type PokerCard = {
  value: PokerValue;
  suit: PokerSuit;
};

export type PokerValue =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 't'
  | 'j'
  | 'q'
  | 'k'
  | 'a';

export type PokerSuit = 's' | 'h' | 'r' | 'k';
