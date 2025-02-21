import Button from '@mui/material/Button';

const CustomButton = ({ 
  onClick, 
  children, 
  variant = "contained", 
  color = "primary",
  ...props 
}) => {
  return (
    <Button 
      variant={variant}
      onClick={onClick}
      color={color}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton; 