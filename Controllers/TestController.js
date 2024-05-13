import Test from '../Models/Test.js';

export const getTest = async (req, res) => {
  try {
    const { UID, PID } = req.params;
    const tests = await Test.findOne({ UID: UID, PID: PID });
    res.status(200).json(tests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateTest = async (req, res) => {
  const { id: _id } = req.body;
  const test = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No test with that id');
  const updatedTest = await Test.findByIdAndUpdate(
    _id,
    { ...test, _id },
    { new: true }
  );
  res.json(updatedTest);
};

export const deleteTest = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No test with that id');
  await Test.findByIdAndRemove(id);
  res.json({ message: 'Test deleted successfully' });
};
