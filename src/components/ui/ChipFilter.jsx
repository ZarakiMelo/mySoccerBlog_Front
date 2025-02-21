import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ChipFilter = ({ 
  title,
  items,
  selectedItem,
  onItemClick,
  getItemLabel = (item) => item.label || item.title || item.name,
  getItemValue = (item) => item.id || item.value,
  showAllOption = true,
  allOptionLabel = "Toutes",
  sx
}) => {
  return (
    <Box sx={sx}>
      {title && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ 
          flexWrap: 'wrap', 
          gap: 1 
        }}
      >
        {showAllOption && (
          <Chip
            label={allOptionLabel}
            onClick={() => onItemClick(null)}
            color={!selectedItem ? "primary" : "default"}
            variant={!selectedItem ? "filled" : "outlined"}
          />
        )}
        {items.map((item) => {
          const value = getItemValue(item);
          return (
            <Chip
              key={value}
              label={getItemLabel(item)}
              onClick={() => onItemClick(value)}
              color={selectedItem === value ? "primary" : "default"}
              variant={selectedItem === value ? "filled" : "outlined"}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default ChipFilter; 