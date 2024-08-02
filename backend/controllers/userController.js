import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.file) {
      user.profileImage = `/uploads/images/${req.file.filename}`;
      await user.save();
      res.status(200).json({ user, profileImage: user.profileImage });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error uploading profile image' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user profile' });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user profile' });
  }
};
