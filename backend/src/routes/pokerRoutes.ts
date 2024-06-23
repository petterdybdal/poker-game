import { Router } from 'express';
import {
  createPokerHand,
  getAllPokerHands,
  comparePokerHands,
} from '../controllers/pokerController';

const router = Router();

router.get('/create', createPokerHand);
router.get('/hands', getAllPokerHands);
router.post('/compare', comparePokerHands);

export default router;
