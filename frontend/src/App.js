import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import Navbar from './components/Navbar';
import Home from './components/Home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import UserProfile from './components/profile/UserProfile';
import AdminDashboard from './components/auth/AdminDashboard';

import { useAuth } from './AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Layout />
      </Router>
    </>
  );
}

const Layout = () => {
  const location = useLocation();
  const showNavbar = !['/auth/signin', '/auth/signup'].includes(
    location.pathname
  );
  const { user } = useAuth();

  return (
    <>
      <ToastContainer /> {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/auth/signup'
          element={!user ? <SignUp /> : <Navigate to='/' />}
        />
        <Route
          path='/auth/signin'
          element={!user ? <SignIn /> : <Navigate to='/' />}
        />
        <Route
          path='/admin'
          element={
            user && user.email === process.env.REACT_APP_ADMIN ? (
              <AdminDashboard />
            ) : (
              <Navigate to='/auth/signin' />
            )
          }
        />
        <Route
          path='/profile/:id'
          element={!user ? <Navigate to='/auth/signin' /> : <UserProfile />}
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
};

export default App;
