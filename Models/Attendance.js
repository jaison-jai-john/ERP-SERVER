import mongoose from 'mongoose';

const attendanceScheme = new mongoose.Schema({
  CID: {
    type: Number,
    required: [true, 'Class ID is required'],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  students: [Number],
});

export const Attendance = mongoose.model('Attendance', attendanceScheme);
export default Attendance;
