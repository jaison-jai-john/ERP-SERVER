import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

export const userVerification = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return { status: false };
  }
  return await jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return { status: false };
    } else {
      const user = await User.findById(data.id);
      if (user) return { status: true, user: user.UID, role: user.role };
      else return { status: false };
    }
  });
};

export const verifyAccess = (req, res, role) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return false;
    } else {
      const user = await User.findById(data.id);
      if (user) return user.role === role;
      else return false;
    }
  });
};

export default userVerification;
