import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  created: {
    type: Date,
    default: new Date(),
  },
});

export const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
