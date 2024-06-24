import { PokerHandViewModel } from './pokerViewModels';

export type CreateResponse = {
  hand: PokerHandViewModel;
  rank: string;
};

export type CompareRequest = {
  hands: PokerHandViewModel[];
};
