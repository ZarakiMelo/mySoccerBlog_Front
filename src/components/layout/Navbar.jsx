import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAlert from '../../hooks/useAlert';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { showAlert } = useAlert();

  const getInitials = () => {
    if (!user) return '';
    return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleClose();
    showAlert('Déconnexion réussie', 'success');
  };

  const handleLogin = () => {
    navigate('/login');
    showAlert('Connexion réussie', 'success');
  };

  return (
    <Box sx={{ width: '100vw' }}>
      <AppBar 
        position="static" 
        color="transparent"
        sx={{
          borderBottom: isDarkMode 
            ? '1px solid rgba(255, 255, 255, 0.12)'  
            : '1px solid rgba(0, 0, 0, 0.12)',      
          boxShadow: 'none', 
          transition: 'all 0.1s ease',
          width: '100%'
        }}
      >
        <Box sx={{ 
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: isDarkMode ? '#121212' : '#ffffff'
        }}>
          <Toolbar 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1280px',
              padding: '0 20px'
            }}
          >
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                flex: 1
              }}
            >
              FootBlog
            </Typography>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography
                component={Link}
                to="/articles"
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                    transition: 'color 0.2s ease'
                  }
                }}
              >
                Articles
              </Typography>
            </Box>

            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'flex-end',
              gap: 1
            }}>
              <IconButton 
                onClick={toggleTheme} 
                color="inherit"
              >
                {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              {isAuthenticated ? (
                <Box>
                  <IconButton
                    size="large"
                    aria-label="compte de l'utilisateur"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: deepOrange[500],
                        width: 32,
                        height: 32
                      }}
                    >
                      {getInitials()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleProfile}>
                      <AccountCircle sx={{ mr: 1 }} />
                        Profil
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Déconnexion
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleLogin}
                >
                  <LoginIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Navbar; 