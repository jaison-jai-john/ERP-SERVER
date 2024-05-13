import Router from 'express';
import { Login, Signup } from '../Controllers/AuthController.js';
import { verifyAccess } from '../middleware/Authmiddleware.js';

export const router = Router();
router.post('/signup', Signup);
router.post('/login', Login);
router.get('/verify', verifyAccess);

export default router;
