import express from 'express';
import {
  deleteAttendance,
  getAttendance,
  getStudentAttendance,
  updateStudentAttendance,
} from '../Controllers/AttendanceController.js';

const router = express.Router();

router.get('/:CID', getAttendance);
router.post('/', getStudentAttendance);
router.patch('/', updateStudentAttendance);
router.delete('/', deleteAttendance);

export default router;
