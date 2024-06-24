import { Request, Response } from 'express';
import { createHand, compareHands } from '../services/pokerService';
import { CompareRequest, CreateResponse } from '../models/api';
import { getAllHands, storeHand } from '../services/redisService';
import { v4 as uuidv4 } from 'uuid';

export const createPokerHand = (_: Request, res: Response<CreateResponse>) => {
  const hand = createHand();
  const handId = uuidv4();

  try {
    storeHand(handId, hand.hand);
    res.status(201).json(hand);
  } catch (error) {
    console.error('Error storing hand in Redis:', error);
    res.status(500);
  }
};

export const getAllPokerHands = async (_: Request, res: Response) => {
  try {
    const hands = await getAllHands();
    res.status(200).json(hands);
  } catch (error) {
    console.error('Error retrieving hands from Redis:', error);
    res.status(500).json({ error: 'Failed to retrieve hands' });
  }
};

export const comparePokerHands = (
  req: Request<any, any, CompareRequest>,
  res: Response
) => {
  const { hands } = req.body;
  const result = compareHands(hands);
  res.status(200).json(result);
};
