import { Request, Response } from 'express';
import { createHand, getHands, compareHands } from '../services/pokerService';

export const createPokerHand = (_: Request, res: Response) => {
  const hand = createHand();
  res.status(201).json(hand);
};

export const getAllPokerHands = (_: Request, res: Response) => {
  const hands = getHands();
  res.status(200).json(hands);
};

export const comparePokerHands = (req: Request, res: Response) => {
  const { hand1, hand2 } = req.body;
  const result = compareHands(hand1, hand2);
  res.status(200).json(result);
};
