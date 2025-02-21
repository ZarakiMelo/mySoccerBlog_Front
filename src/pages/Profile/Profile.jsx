import "../../App.css";
import { useAuth } from "../../context/AuthContext";
import BuildIcon from '@mui/icons-material/Build';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const Profile = () => {
  const { user } = useAuth();

  return (
    <Box className='main-content' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>Bienvenue {user.firstname} {user.lastname}</Typography>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>Ton espace est en cours de construction, il sera disponible dans quelques jours...</Typography>
        <BuildIcon sx={{ fontSize: '100px', display: 'block', margin: '0 auto' }} />
    </Box>
  );
};  

export default Profile; 