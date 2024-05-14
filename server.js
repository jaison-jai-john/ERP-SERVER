import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import announcement from './routes/AnnouncementRoute.js';
import attendance from './routes/AttendanceRoute.js';
import auth from './routes/AuthRoute.js';
import Class from './routes/ClassRoute.js';
import post from './routes/PostRoute.js';
import test from './routes/TestRoute.js';
import user from './routes/UserRoute.js';

const { ATLAS_URI } = process.env;

mongoose
  .connect(ATLAS_URI.concat('ERP'))
  .then(() => console.log('MongoDB is  connected successfully'))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://erpclient.netlify.app/',
    ],
    methods: ['POST', 'GET', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/user', user);
app.use('/auth', auth);
app.use('/class', Class);
app.use('/post', post);
app.use('/test', test);
app.use('/announcement', announcement);
app.use('/attendance', attendance);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
