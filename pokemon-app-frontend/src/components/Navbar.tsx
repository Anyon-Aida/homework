import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav>
      <div>
        <h1>Pokemon App</h1>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ color: 'white', marginRight: '20px' }}>Hello, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
