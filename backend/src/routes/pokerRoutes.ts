import { Router } from 'express';
import cors from 'cors';
import {
  createPokerHand,
  getAllPokerHands,
  comparePokerHands,
} from '../controllers/pokerController';

const router = Router();

const corsOptions = {
  origin: ['http://localhost:5000', 'http://localhost:3000'],
};

router.get('/create', cors(corsOptions), createPokerHand);
router.get('/hands', getAllPokerHands);
router.post('/compare', comparePokerHands);

export default router;
