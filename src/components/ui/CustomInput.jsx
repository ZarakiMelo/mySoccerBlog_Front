import TextField from '@mui/material/TextField';
import { useTheme } from '../../context/ThemeContext';

const CustomInput = ({ 
  label, 
  value, 
  onChange,
  type = "text",
  required = false,
  error = false,
  helperText = "",
  fullWidth = true,
  multiline = false,
  rows = 1,
  disabled = false,
  variant = "outlined",
  ...props 
}) => {
  const { isDarkMode } = useTheme();

  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      required={required}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      variant={variant}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
          }
        },
        '& .MuiInputLabel-root': {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
          '&.Mui-focused': {
            color: isDarkMode ? '#fff' : 'primary.main'
          }
        },
        '& .MuiInputBase-input': {
          color: isDarkMode ? '#fff' : '#000',
          '&::placeholder': {
            color: isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            opacity: 1
          }
        },
        ...props.sx
      }}
      {...props}
    />
  );
};

export default CustomInput; 