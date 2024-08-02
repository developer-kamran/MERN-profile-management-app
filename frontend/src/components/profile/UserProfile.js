import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Container,
  Typography,
  Paper,
  Avatar,
  Box,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Loader from '../Loader';
import EditProfile from './EditProfile';
import { useAuth } from '../../AuthProvider';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, setUser, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete your account?'
    );
    if (!isConfirmed) return false;
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/me/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);

      toast.success('Account deleted successfully');
      navigate('/auth/signin');
    } catch (error) {
      toast.error('Failed to delete account');
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/me/profile/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data.user);
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (authLoading || loading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 6, px: isSmallScreen ? 2 : 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          sx={{
            textAlign: 'center',
            '@media (max-width: 600px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Avatar
            src='null'
            alt={profile.name}
            sx={{
              width: isSmallScreen ? 80 : 100,
              height: isSmallScreen ? 80 : 100,
            }}
          />

          <Typography
            variant='h4'
            gutterBottom
            sx={{
              fontSize: isSmallScreen ? '1.5rem' : '2rem',
              marginTop: '0.95rem',
              display: 'flex',
              gap: '0.5rem',
            }}
          >
            {profile.name}
            {profile.email === process.env.REACT_APP_ADMIN && (
              <Button variant='outlined' size='small' color='warning'>
                Admin
              </Button>
            )}
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            sx={{ fontSize: '1rem' }}
          >
            {profile.email}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            sx={{ fontSize: '0.85rem' }}
          >
            Joined on: {new Date(profile.createdAt).toLocaleDateString()}
          </Typography>
          {profile.isAdmin && (
            <Chip label='Admin' color='primary' sx={{ mt: 1 }} />
          )}
          {user && user._id === profile._id && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button
                variant='contained'
                size={isSmallScreen ? 'small' : 'medium'}
                color='primary'
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant='contained'
                size={isSmallScreen ? 'small' : 'medium'}
                color='error'
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
      <EditProfile
        open={isEditing}
        onClose={() => setIsEditing(false)}
        user={user}
        setUser={setUser}
        setProfile={setProfile}
      />
    </Container>
  );
};

export default UserProfile;
