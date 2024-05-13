import Attendance from '../Models/Attendance.js';

export const getAttendance = async (req, res) => {
  try {
    const { CID } = req.params;
    const attendance = await Attendance.find({ CID: CID });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentAttendance = async (req, res) => {
  try {
    const { CID, UID, date } = req.body;

    const attendance = await Attendance.findOne({
      CID: CID,
      students: { $eleMatch: UID },
      date: date ? date : new Date(),
    });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStudentAttendance = async (req, res) => {
  try {
    const { CID, UID, date, status } = req.body;
    const attendance = await Attendance.findOne({ CID: CID, date: date });
    if (attendance) {
      if (status === 'present') {
        if (!attendance.students.includes(UID)) {
          attendance.students.push(UID);
        }
      } else {
        if (attendance.students.includes(UID)) {
          attendance.students = attendance.students.filter(
            (student) => student !== UID
          );
        }
      }
      await Attendance.findByIdAndUpdate(attendance._id, attendance, {
        new: true,
      });
    } else {
      const newAttendance = new Attendance({
        CID: CID,
        date: date,
        students: [UID],
      });
      await newAttendance.save();
    }
    res.status(200).json({ message: 'Attendance updated successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await Attendance.findByIdAndRemove(id);
    res.json({ message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
