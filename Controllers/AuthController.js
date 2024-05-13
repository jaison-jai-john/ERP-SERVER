import { compare } from 'bcrypt';
import User from '../Models/User.js';
import { createSecretToken } from '../util/SecretToken.js';

export const Signup = async (req, res, next) => {
  try {
    const { email, password, userName, role, joined } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }
    const user = await User.create({
      email,
      password,
      userName,
      role,
      createdAt,
    });
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: 'User signed in successfully', success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.json({ message: `invalid username` });
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: `invalid credentials` });
    }
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.json({
      message: 'User signed in successfully',
      success: true,
      user,
    });
    next();
  } catch (err) {
    console.log(err);
  }
};
