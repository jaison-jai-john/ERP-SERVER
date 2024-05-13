import mongoose from 'mongoose';

const answerSchma = new mongoose.Schema({
  QID: {
    type: String,
    required: [true, 'Question ID is required'],
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
  },
});

const testSchema = new mongoose.Schema({
  UID: {
    type: Number,
    required: [true, 'User ID is required'],
  },
  PID: {
    type: Number,
    required: [true, 'Post ID is required'],
  },
  marks: {
    type: Number,
    required: [true, 'Marks is required'],
  },
  answers: [answerSchma],
  created: {
    type: Date,
    default: new Date(),
  },
});

const Test = mongoose.model('Test', testSchema);
export default Test;
