import { Link } from 'react-router-dom';

import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Loader from './Loader';
import { useAuth } from '../AuthProvider';

const Home = () => {
  const { user, loading } = useAuth();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Container
        sx={{
          mt: 6,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: isSmallScreen ? 2 : 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 6,
            maxWidth: 600,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography variant={isSmallScreen ? 'h5' : 'h4'} gutterBottom>
            Welcome to Profile Management App
          </Typography>
          <Typography
            variant='body1'
            paragraph
            sx={{ fontSize: isSmallScreen ? '1rem' : '1.1rem' }}
          >
            {user
              ? `Welcome back, ${user.name}! As a logged-in user, you can manage your profile and access various features. Use the links below to view your profile, check your dashboard, or, if you are an admin, access the admin panel.`
              : "To fully utilize the features of our app, please sign in to manage your profile and access additional options. If you don't have an account yet, you can create one by signing up."}
          </Typography>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            gap={2}
            sx={{ mt: 2 }}
          >
            {!user ? (
              <>
                <Link to='/auth/signin'>
                  <Button
                    variant='contained'
                    color='primary'
                    size={isSmallScreen ? 'small' : 'medium'}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to='/auth/signup'>
                  <Button
                    variant='contained'
                    color='secondary'
                    size={isSmallScreen ? 'small' : 'medium'}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to={`/profile/${user._id}`}>
                  <Button
                    variant='contained'
                    color='primary'
                    size={isSmallScreen ? 'small' : 'medium'}
                  >
                    View Profile
                  </Button>
                </Link>
                {user.email === process.env.REACT_APP_ADMIN && (
                  <>
                    <Link to='/admin'>
                      <Button
                        variant='contained'
                        color='error'
                        size={isSmallScreen ? 'small' : 'medium'}
                      >
                        Admin Panel
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Home;
