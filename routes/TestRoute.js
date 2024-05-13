import express from 'express';
import {
  deleteTest,
  getTest,
  updateTest,
} from '../Controllers/TestController.js';

const router = express.Router();

router.get('/', getTest);
router.patch('/', updateTest);
router.delete('/', deleteTest);

export default router;
