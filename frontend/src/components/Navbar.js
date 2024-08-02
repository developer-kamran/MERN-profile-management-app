import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useAuth } from '../AuthProvider';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'justify-between',
          paddingBlock: '0.5rem',
        }}
      >
        <ListItem button component={Link} to='/'>
          <ListItemText
            primary='Profile Management'
            primaryTypographyProps={{
              sx: {
                color: 'primary.main',
                fontWeight: 'bold',
              },
            }}
          />
        </ListItem>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {user ? (
          <>
            <ListItem button component={Link} to={`/profile/${user._id}`}>
              <ListItemText
                primary='Profile'
                primaryTypographyProps={{ sx: { color: 'primary.main' } }}
              />
            </ListItem>
            {user.email === process.env.REACT_APP_ADMIN && (
              <ListItem button component={Link} to='/admin'>
                <ListItemText
                  primary='Admin Dashboard'
                  primaryTypographyProps={{ sx: { color: 'primary.main' } }}
                />
              </ListItem>
            )}
            <ListItem button onClick={handleLogout}>
              <ListItemText
                primary='Logout'
                primaryTypographyProps={{ sx: { color: 'primary.main' } }}
              />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to='/auth/signin'>
            <ListItemText
              primary='Login'
              primaryTypographyProps={{ sx: { color: 'primary.main' } }}
            />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ paddingInline: isMobile ? '1rem' : '8rem' }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            <Link
              to='/'
              style={{
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Profile Management
            </Link>
          </Typography>
          {!isMobile && (
            <>
              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Link
                    to={`/profile/${user._id}`}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontSize: '14.5px',
                      marginRight: '16px',
                      marginTop: '1px',
                    }}
                  >
                    Profile
                  </Link>
                  {user.email === process.env.REACT_APP_ADMIN && (
                    <Link
                      to='/admin'
                      style={{
                        color: 'white',
                        textDecoration: 'none',
                        textTransform: 'uppercase',
                        fontSize: '14.5px',
                        marginRight: '16px',
                        marginTop: '1px',
                      }}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Button color='inherit' onClick={handleLogout}>
                    Logout
                  </Button>
                </Box>
              ) : (
                <Link
                  to='/auth/signin'
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'capitalize',
                    fontSize: '17.5px',
                  }}
                >
                  Login
                </Link>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </Box>
  );
}
