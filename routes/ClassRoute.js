import Router from 'express';

import {
  addClass,
  deleteClassById,
  getClassById,
  getClasses,
  updateClass,
} from '../Controllers/ClassController.js';
import {
  addJoinedClass,
  deleteJoinedClass,
  getJoinedStudents,
} from '../Controllers/JoinedClassController.js';

export const router = Router();

router.get('/', getClasses);
router.get('/:CID', getClassById);
router.post('/', addClass);
router.patch('/:CID', updateClass);
router.delete('/:CID', deleteClassById);
router.post('/join', addJoinedClass);
router.delete('/leave', deleteJoinedClass);
router.get('/:CID/members', getJoinedStudents);

export default router;
