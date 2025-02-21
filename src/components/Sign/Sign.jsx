import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { signIn, signUp } from '../../api/auth';
import CustomInput from '../ui/CustomInput';
import CustomButton from '../ui/CustomButton';
import CustomAlert from '../ui/CustomAlert';
import useAlert from '../../hooks/useAlert';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useTheme } from '../../context/ThemeContext';

const Sign = () => {
  const [value, setValue] = useState('1');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const { alert, showAlert, hideAlert } = useAlert();
  const { isDarkMode } = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password);
      authLogin(data);
      navigate('/');
    } catch (error) {
      showAlert({
        message: 'Erreur lors de la connexion',
        severity: 'error'
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await signUp(firstname, lastname, email, password);
      authLogin(data);
      navigate('/');
    } catch (error) {
      showAlert({
        message: 'Erreur lors de l\'inscription',
        severity: 'error'
      });
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        typography: 'body1'
      }}
    >
      <TabContext value={value}>
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'divider',
          mb: 3
        }}>
          <TabList 
            onChange={handleChange} 
            centered
            sx={{
              '& .MuiTab-root': {
                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
                '&.Mui-selected': {
                  color: isDarkMode ? '#fff' : 'primary.main'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: isDarkMode ? '#fff' : 'primary.main'
              }
            }}
          >
            <Tab label="Connexion" value="1" />
            <Tab label="Inscription" value="2" />
          </TabList>
        </Box>
        
        <TabPanel value="1" sx={{ padding: '0' }}>
          <form onSubmit={handleLogin}>
            <CustomInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <CustomInput
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <CustomButton type="submit" variant="contained" fullWidth>
              Se connecter
            </CustomButton>
          </form>
        </TabPanel>

        <TabPanel value="2" sx={{ padding: '0' }}>
          <form onSubmit={handleRegister}>
            <CustomInput
              label="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <CustomInput
              label="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <CustomInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <CustomInput
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <CustomButton type="submit" variant="contained" fullWidth>
              S'inscrire
            </CustomButton>
          </form>
        </TabPanel>
      </TabContext>

      <CustomAlert
        open={alert.open}
        onClose={hideAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Box>
  );
};

export default Sign;  