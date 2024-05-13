import mongoose from 'mongoose';
import { Counter } from './Counter.js';

export const classSchema = new mongoose.Schema({
  CID: {
    type: Number,
  },
  className: {
    type: String,
    required: [true, 'Class name is required'],
  },
  subjectCode: {
    type: Number,
    required: [true, 'Class code is required'],
  },
  teacher: {
    type: Number,
    required: [true, 'Teacher is required'],
  },
  created: {
    type: Date,
    default: new Date(),
  },
  gclass: {
    type: String,
  },
  whatsapp: {
    type: String,
  },
  slot: {
    type: Number,
  },
});

classSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findById('classCounter');
  if (!counter) {
    await Counter.create({ _id: 'classCounter', count: 0 });
  }
  const updatedCounter = await Counter.findByIdAndUpdate(
    'classCounter',
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  )
    .then((count) => {
      doc.CID = count.count;
      next();
    })
    .catch((error) => {
      throw new Error(error);
    });
  next();
});

export default mongoose.model('Class', classSchema);
