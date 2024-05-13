import JoinedClass from '../Models/JoinedClass.js';
import user from '../Models/User.js';

export const addJoinedClass = async (req, res) => {
  try {
    const { SID, CID } = req.body;
    const result = await JoinedClass.create({ SID, CID });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJoinedClassByStudent = async (req, res) => {
  try {
    const { SID } = req.params;
    const classes = await JoinedClass.find({ SID });
    return classes;
  } catch (error) {
    return false;
  }
};

export const getJoinedStudents = async (req, res) => {
  try {
    const { CID } = req.params;
    var students = [];
    const studentsJoined = await JoinedClass.find({ CID });
    if (!studentsJoined) {
      return res.status(404).json({ error: 'no Students joined' });
    }
    for (let i = 0; i < studentsJoined.length; i++) {
      const student = await user.findOne({ UID: studentsJoined[i].SID });
      students.push(student);
    }
    return res.json(students);
  } catch (error) {
    return false;
  }
};

export const deleteJoinedClass = async (req, res) => {
  try {
    const { SID, CID } = req.body;
    const deletedClass = await JoinedClass.findOneAndDelete({ SID, CID });
    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
