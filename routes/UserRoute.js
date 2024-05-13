import express from 'express';

import {
  addUser,
  delUser,
  getUser,
  getUsers,
  updateUser,
} from '../Controllers/UserController.js';

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// creating users
router.get('/', getUsers);

router.get('/:UID', getUser);

router.post('/add', addUser);

router.patch('/update/:UID', updateUser);

router.delete('/delete/:UID', delUser);

export default router;
