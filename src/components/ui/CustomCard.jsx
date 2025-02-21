import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '../../context/ThemeContext';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CustomCard = ({ 
  title, 
  content, 
  actions = [],
  maxWidth = 345,
  createdAt,
  ...props 
}) => {
  const { isDarkMode } = useTheme();

  // Fonction pour rendre l'icône appropriée
  const renderActionIcon = (action) => {
    const iconProps = {
      fontSize: "small",
      sx: { color: action.props?.color || 'inherit' }
    };

    switch(action.label.toLowerCase()) {
      case "modifier":
        return <EditIcon {...iconProps} />;
      case "supprimer":
        return <DeleteIcon {...iconProps} />;
      case "voir l'article":
        return <VisibilityIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth,
        width: '100%',
        height: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#121212',
        border: isDarkMode 
          ? '1px solid rgba(255, 255, 255, 0.12)'
          : '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 'none'
      }}
      {...props}
    >
      <CardContent>
        <Typography 
          gutterBottom 
          variant="h5" 
          component="div"
          sx={{
            fontSize: '1.2rem',
            mb: 1,
            color: isDarkMode ? '#ffffff' : '#121212'
          }}
        >
          {title}
        </Typography>
        <Box sx={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
        }}>
          {content}
        </Box>
      </CardContent>
      <div>
        <Divider sx={{ 
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)' 
        }} />
        <CardActions sx={{ 
          padding: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {createdAt && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
              }}
            >
              Publié le {createdAt}
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {actions.map((action, index) => (
              <Tooltip key={index} title={action.label}>
                <IconButton
                  size="small"
                  onClick={action.onClick}
                  sx={{
                    color: action.props?.color === 'error' 
                      ? 'error.main'
                      : action.props?.color === 'primary'
                        ? 'primary.main'
                        : 'inherit'
                  }}
                >
                  {renderActionIcon(action)}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </CardActions>
      </div>
    </Card>
  );
};

export default CustomCard; 