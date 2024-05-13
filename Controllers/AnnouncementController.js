import Announcement from '../Models/Announcement.js';

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateAnnouncement = async (req, res) => {
  const { id: _id } = req.body;
  const announcement = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No announcement with that id');
  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
    _id,
    { ...announcement, _id },
    { new: true }
  );
  res.json(updatedAnnouncement);
};
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No announcement with that id');
  await Announcement.findByIdAndRemove(id);
  res.json({ message: 'Announcement deleted successfully' });
};
