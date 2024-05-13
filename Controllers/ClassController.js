import Class from '../Models/Class.js';
import JoinedClass from '../Models/JoinedClass.js';
import user from '../Models/User.js';
import userVerification from '../middleware/Authmiddleware.js';

// Add a class
const addClass = async (req, res) => {
  try {
    const { className, subjectCode, teacher } = req.body;
    const result = await Class.create({ className, subjectCode, teacher });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a class by ID
const getClassById = async (req, res) => {
  try {
    const { CID } = req.params;
    const classObj = await Class.findOne({ CID });
    if (!classObj) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(classObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buildClass = async (item) => {
  const classInfo = await Class.findOne({ CID: item.CID });
  const teacher = await user.findOne({ UID: classInfo.teacher });
  const data = {
    CID: classInfo.CID,
    className: classInfo.className,
    subjectCode: classInfo.subjectCode,
    teacher: teacher,
  };
  return data;
};
const getClasses = async (req, res) => {
  try {
    const verifyReq = await userVerification(req, res);

    if (!verifyReq.status) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { user, role } = verifyReq;

    if (!role) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (role === 'student') {
      const classesReq = await JoinedClass.find({ SID: user });
      for (let i = 0; i < classesReq.length; i++) {
        const classObj = await buildClass(classesReq[i]);
        classesReq[i] = classObj;
      }
      return res.status(200).json(classesReq);
    } else if (role === 'teacher') {
      const classesReq = await Class.find({ teacher: user });
      for (let i = 0; i < classesReq.length; i++) {
        const classObj = await buildClass(classesReq[i]);
        classesReq[i] = classObj;
      }
      return res.status(200).json(classesReq);
    } else if (role === 'admin') {
      const classesReq = await Class.find({});
      for (let i = 0; i < classesReq.length; i++) {
        const classObj = await buildClass(classesReq[i]);
        classesReq[i] = classObj;
      }
      return res.status(200).json(classesReq);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message, reason: 'error' });
  }
};

// Delete a class by ID
const deleteClassById = async (req, res) => {
  try {
    const { CID } = req.params;
    const deletedClass = await Class.findOneAndDelete({ CID });
    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
const updateClass = async (req, res) => {
  try {
    const { CID } = req.params;
    const { name, description } = req.body;
    const updatedClass = await Class.findByOneAndUpdate(
      { CID },
      { name, description },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addClass, deleteClassById, getClassById, getClasses, updateClass };
