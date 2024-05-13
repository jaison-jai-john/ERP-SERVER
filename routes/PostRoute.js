import express from 'express';
import {
  addPost,
  deletePostById,
  getAllPosts,
  getPostById,
  updatePostById,
} from '../Controllers/PostController.js';

const router = express.Router();
router.get('/class/:CID', getAllPosts);
router.get('/:PID', getPostById);
router.post('/', addPost);
router.patch('/:PID', updatePostById);
router.delete('/:PID', deletePostById);

export default router;
