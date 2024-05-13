import mongoose from 'mongoose';
import { Counter } from './Counter.js';

const attachment = new mongoose.Schema({
  filePath: {
    type: String,
  },
  fileName: {
    type: String,
  },
  UID: {
    type: Number,
  },
});

const QA = new mongoose.Schema({
  question: {
    type: String,
  },
  options: [String],
  answer: {
    type: String,
  },
  marks: {
    type: Number,
  },
  Qtype: {
    type: String,
  },
});

export const postSchema = new mongoose.Schema({
  PID: {
    type: Number,
  },
  postType: {
    type: String,
    required: [true, 'Post type is required'],
  },
  message: {
    type: String,
  },
  content: {
    type: String,
  },
  CID: {
    type: Number,
    required: [true, 'Class ID is required'],
  },
  created: {
    type: Date,
    default: new Date(),
  },
  due: {
    type: Date,
    default: null,
  },
  attachments: [attachment],
  QA: [QA],
});

postSchema.pre('save', async function (next) {
  const doc = this;
  const counter = await Counter.findById('postCounter');
  if (!counter) {
    await Counter.create({ _id: 'postCounter', count: 0 });
  }
  const updatedCounter = await Counter.findByIdAndUpdate(
    'postCounter',
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  )
    .then((count) => {
      doc.PID = count.count;
      next();
    })
    .catch((error) => {
      throw new Error(error);
    });
});

export const post = mongoose.model('Post', postSchema);

export default post;
