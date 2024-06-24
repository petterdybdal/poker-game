import { PokerHandViewModel } from '../models/pokerViewModels';
import { client } from '../redisClient';

const HANDS_KEY = 'poker:hands';

export const storeHand = async (handId: string, hand: PokerHandViewModel) => {
  try {
    await client.hSet(HANDS_KEY, handId, hand.toString());
  } catch (err) {
    console.error('Redis hSet error:', err);
    throw err;
  }
};

export const getAllHands = async () => {
  try {
    const hands = await client.hGetAll(HANDS_KEY);
    return hands;
  } catch (err) {
    console.error('Redis hGetAll error:', err);
    throw err;
  }
};
