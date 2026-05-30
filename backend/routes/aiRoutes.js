import express from 'express';
import {
  analyzeProblem,
  chatWithAI,
  analyzeComplexity,
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/analyze', analyzeProblem);
router.post('/chat', chatWithAI);
router.post('/complexity', analyzeComplexity);

export default router;
