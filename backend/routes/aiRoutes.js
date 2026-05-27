const express = require('express');
const router = express.Router();
const {
  analyzeProblem,
  chatWithAI,
  analyzeComplexity,
} = require('../controllers/aiController');

router.post('/analyze', analyzeProblem);
router.post('/chat', chatWithAI);
router.post('/complexity', analyzeComplexity);

module.exports = router;
