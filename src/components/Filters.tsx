import { 
  Box, 
  Typography, 
  Slider, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Paper,
  Button,
  Divider
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type FiltersProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
};

const Filters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters
}: FiltersProps) => {
  const handleCategoryChange = (event: SelectChangeEvent) => {
    onCategoryChange(event.target.value);
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    onPriceRangeChange(newValue as [number, number]);
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 1000;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        position: 'sticky',
        top: 20,
        height: 'fit-content'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          Filters
        </Typography>
        {hasActiveFilters && (
          <Button
            startIcon={<ClearIcon />}
            onClick={onClearFilters}
            variant="outlined"
            size="small"
            color="error"
          >
            Clear
          </Button>
        )}
      </Box>
      
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
          sx={{
            '& .MuiSelect-select': {
              bgcolor: 'background.paper'
            }
          }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ mb: 3 }} />

      <Typography 
        variant="subtitle1" 
        gutterBottom
        sx={{ 
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Price Range
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
        sx={{ 
          mb: 2,
          '& .MuiSlider-thumb': {
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0px 0px 0px 8px rgba(25, 118, 210, 0.16)'
            }
          }
        }}
      />
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'background.default',
        p: 1,
        borderRadius: 1
      }}>
        <Typography variant="body2" color="text.secondary">
          ${priceRange[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${priceRange[1]}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Filters; 