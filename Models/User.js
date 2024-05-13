import { hash } from 'bcrypt';
import mongoose from 'mongoose';
import { Counter } from './Counter.js';

const userSchema = new mongoose.Schema({
  UID: {
    type: Number,
  },
  userName: {
    type: String,
    required: [true, 'Your username is required'],
  },
  password: {
    type: String,
    required: [true, 'Your password is required'],
  },
  email: {
    type: String,
    required: [true, 'Your email address is required'],
    unique: true,
  },
  role: {
    type: String,
    default: 'student',
    required: [true, 'Your role is required'],
  },
  joined: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre('save', async function (next) {
  const doc = this;
  this.password = await hash(this.password, 12);
  const counterExists = await Counter.findById('userCounter');
  if (!counterExists) {
    const counter = await Counter.create({ _id: 'userCounter', count: 0 });
  }
  const updatedCounter = await Counter.findByIdAndUpdate(
    'userCounter',
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  )
    .then((count) => {
      doc.UID = count.count;
    })
    .catch((error) => {
      throw new Error(error);
    });
});
export const user = mongoose.model('User', userSchema);

export default user;
