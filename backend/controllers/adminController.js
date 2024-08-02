import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

export const uploadUserPdf = async (req, res) => {
  try {
    const userId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.pdf) {
      return res
        .status(400)
        .json({ error: 'PDF already uploaded for this user' });
    }

    user.pdf = file.filename;
    await user.save();

    res
      .status(200)
      .json({ message: 'PDF uploaded successfully', pdf: file.filename });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading PDF' });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing user' });
  }
};
