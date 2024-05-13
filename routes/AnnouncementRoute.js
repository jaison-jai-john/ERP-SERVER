import express from 'express';
import {
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from '../Controllers/AnnouncementController.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.patch('/', updateAnnouncement);
router.delete('/', deleteAnnouncement);

export default router;
