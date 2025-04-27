import { useState } from 'react';
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
  Divider,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState(false);

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
        p: isMobile ? 2 : 3,
        position: isMobile ? 'relative' : 'sticky',
        top: isMobile ? 0 : 20,
        height: 'fit-content',
        mb: isMobile ? 2 : 0
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: isMobile ? 0 : 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography 
            variant={isMobile ? "h6" : "h5"}
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Filters
          </Typography>
        </Box>
        {isMobile ? (
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        ) : (
          hasActiveFilters && (
            <Button
              startIcon={<ClearIcon />}
              onClick={onClearFilters}
              variant="outlined"
              size="small"
              color="error"
            >
              Clear
            </Button>
          )
        )}
      </Box>

      <Collapse in={!isMobile || isExpanded}>
        <Box sx={{ mt: isMobile ? 2 : 0 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
              size={isMobile ? "small" : "medium"}
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

          <Divider sx={{ mb: 2 }} />

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
                width: isMobile ? 24 : 20,
                height: isMobile ? 24 : 20,
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

          {isMobile && hasActiveFilters && (
            <Button
              fullWidth
              startIcon={<ClearIcon />}
              onClick={onClearFilters}
              variant="outlined"
              size="small"
              color="error"
              sx={{ mt: 2 }}
            >
              Clear Filters
            </Button>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default Filters; 