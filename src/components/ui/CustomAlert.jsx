import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

const CustomAlert = ({
  open,
  onClose,
  message,
  severity = "info",
  duration = 6000,
  action,
  position = {
    vertical: 'bottom',
    horizontal: 'right'
  }
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        action={
          action && (
            <Button color="inherit" size="small" onClick={action.onClick}>
              {action.label}
            </Button>
          )
        }
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert; 