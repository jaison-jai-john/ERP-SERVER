import mongoose from 'mongoose';

export const joinedClassSchema = new mongoose.Schema({
  SID: {
    type: Number,
    required: [true, 'Student ID is required'],
  },
  CID: {
    type: Number,
    required: [true, 'Class ID is required'],
  },
  joined: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model('JoinedClass', joinedClassSchema);
