import { Request, Response } from 'express';
import { createHand, getHands, compareHands } from '../services/pokerService';
import { PokerHandViewModel } from '../models/pokerViewModels';

export const createPokerHand = (_: Request, res: Response) => {
  const hand = createHand();
  res.status(201).json(hand);
};

export const getAllPokerHands = (_: Request, res: Response) => {
  const hands = getHands();
  res.status(200).json(hands);
};

export const comparePokerHands = (
  req: Request<any, any, { hands: PokerHandViewModel[] }>,
  res: Response
) => {
  const { hands } = req.body;
  const result = compareHands(hands);
  res.status(200).json(result);
};
