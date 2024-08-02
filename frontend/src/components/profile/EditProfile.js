import React, { useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

const EditProfile = ({ open, onClose, user, setUser, setProfile }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/me/profile',
        { name, email, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
      setProfile(response.data.user);
      toast.success('Profile updated successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='edit-profile-modal-title'
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            color: 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id='edit-profile-modal-title'
          variant='h6'
          component='h2'
          gutterBottom
        >
          Edit Profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            label='Name'
            fullWidth
            margin='normal'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label='Email'
            type='email'
            fullWidth
            margin='normal'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            variant='outlined'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={loading}
              sx={{ mr: 1 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProfile;
