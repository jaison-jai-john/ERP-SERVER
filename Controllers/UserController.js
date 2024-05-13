import { ObjectId } from 'mongodb';
import User from '../Models/User.js';
// make use
export const addUser = async (req, res) => {
  // try to catch if upload fails
  try {
    // create a new user
    let newUser = {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role ? req.body.role : 'student',
      joined: Date.now(),
    };

    // get the collection
    // insert the new user
    let result = await User.create(newUser);
    // send the result
    res.send(result).status(204);
  } catch (err) {
    // failed to upload
    console.log(err);
    res.status(500).send('Error adding record');
  }
};

// get users
export const getUsers = async (req, res) => {
  // get the collection
  // get all the users
  let results = await User.find({});
  res.send(results).status(200);
};

// get user
export const getUser = async (req, res) => {
  try {
    // get the user by id]
    let result = await User.findOne({ UID: req.params.UID });

    // if not found
    if (!result) res.send('Not found').status(404);
    // else send the result
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting record');
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    // update the user by id
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
      },
    };

    let result = await User.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating record');
  }
};

// del user
export const delUser = async (req, res) => {
  try {
    // get the collection
    // delete the user by id
    const query = { _id: new ObjectId(req.params.id) };
    let result = await User.deleteOne(query);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting record');
  }
};
