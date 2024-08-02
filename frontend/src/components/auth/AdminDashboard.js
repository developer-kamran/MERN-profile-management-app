import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Loader from '../Loader';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:5000/api/admin/users',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemove = async (userId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to remove this user?'
    );
    if (!isConfirmed) return false;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleUploadPdf = async (event, userId) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/admin/users/${userId}/pdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, pdf: response.data.pdf } : user
        )
      );
    } catch (error) {
      console.error('Error uploading PDF', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography
        variant='h4'
        gutterBottom
        sx={{ fontSize: isSmallScreen ? '1.5rem' : '2rem' }}
      >
        Admin Dashboard
      </Typography>
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No</TableCell>
              <TableCell>Profile Pic</TableCell>
              <TableCell>Name</TableCell>
              {!isSmallScreen && <TableCell>Email</TableCell>}
              <TableCell>PDF</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid',
                      borderColor: 'grey.300',
                      mb: 2,
                    }}
                  >
                    <img
                      src={
                        user?.profileImage
                          ? `http://localhost:5000${user?.profileImage}`
                          : './user.png'
                      }
                      alt={user?.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/profile/${user._id}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {user.name}
                  </Link>
                </TableCell>
                {!isSmallScreen && <TableCell>{user.email}</TableCell>}
                <TableCell>
                  {user.pdf ? (
                    <Tooltip title='View PDF'>
                      <IconButton
                        component='a'
                        href={`http://localhost:5000/uploads/${user.pdf}`}
                        target='_blank'
                      >
                        <PictureAsPdfIcon color='action' />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <input
                        accept='application/pdf'
                        style={{ display: 'none' }}
                        id={`pdf-upload-${user._id}`}
                        type='file'
                        onChange={(event) => handleUploadPdf(event, user._id)}
                      />
                      <label htmlFor={`pdf-upload-${user._id}`}>
                        <Tooltip title='Upload PDF'>
                          <IconButton color='primary' component='span'>
                            <CloudUploadIcon />
                          </IconButton>
                        </Tooltip>
                      </label>
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {user.email === process.env.REACT_APP_ADMIN ? (
                    <Button variant='contained' color='info' size='small'>
                      Admin
                    </Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='error'
                      size='small'
                      sx={{ textTransform: 'capitalize' }}
                      onClick={() => handleRemove(user._id)}
                    >
                      Remove
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
