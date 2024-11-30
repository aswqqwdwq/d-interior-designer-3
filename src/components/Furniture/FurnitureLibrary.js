import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  Drawer,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const categories = [
  { id: 'living', label: 'نشیمن' },
  { id: 'bedroom', label: 'اتاق خواب' },
  { id: 'kitchen', label: 'آشپزخانه' },
  { id: 'bathroom', label: 'سرویس بهداشتی' },
  { id: 'office', label: 'اداری' }
];

const FurnitureLibrary = ({ onFurnitureSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('living');
  const [searchQuery, setSearchQuery] = useState('');
  const [furniture, setFurniture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const loadFurniture = async () => {
      setLoading(true);
      try {
        // در حالت واقعی، این داده‌ها از API دریافت می‌شوند
        const furnitureData = {
          living: [
            {
              id: 1,
              name: 'مبل راحتی',
              thumbnail: 'E:/کتاب/New folder (2)/furniture1.jpg',
              model: 'path/to/model1.glb',
              dimensions: { width: 200, depth: 85, height: 90 },
              category: 'living'
            },
            // ... سایر مبلمان
          ],
          bedroom: [
            {
              id: 2,
              name: 'تخت خواب',
              thumbnail: 'E:/کتاب/New folder (2)/furniture2.jpg',
              model: 'path/to/model2.glb',
              dimensions: { width: 160, depth: 200, height: 45 },
              category: 'bedroom'
            },
            // ... سایر مبلمان
          ],
          // ... سایر دسته‌بندی‌ها
        };

        setFurniture(furnitureData[selectedCategory] || []);
      } catch (error) {
        console.error('Error loading furniture:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFurniture();
  }, [selectedCategory]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFurnitureSelect = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleAddToScene = () => {
    if (selectedItem && onFurnitureSelect) {
      onFurnitureSelect(selectedItem);
      setDrawerOpen(false);
    }
  };

  const filteredFurniture = furniture.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="جستجوی مبلمان..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper sx={{ mt: 2 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map(category => (
            <Tab
              key={category.id}
              value={category.id}
              label={category.label}
              icon={<CategoryIcon />}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ flexGrow: 1, overflow: 'auto', mt: 2 }}>
        <Grid container spacing={2}>
          {filteredFurniture.map(item => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <Card>
                <CardActionArea onClick={() => handleFurnitureSelect(item)}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.thumbnail}
                    alt={item.name}
                  />
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2" align="center">
                      {item.name}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {selectedItem && (
          <Box sx={{ width: 350, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">{selectedItem.name}</Typography>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <CardMedia
              component="img"
              height="250"
              image={selectedItem.thumbnail}
              alt={selectedItem.name}
              sx={{ borderRadius: 1, mb: 2 }}
            />

            <Typography variant="subtitle1" gutterBottom>
              ابعاد:
            </Typography>
            <Typography variant="body2" gutterBottom>
              عرض: {selectedItem.dimensions.width} سانتی‌متر
              <br />
              عمق: {selectedItem.dimensions.depth} سانتی‌متر
              <br />
              ارتفاع: {selectedItem.dimensions.height} سانتی‌متر
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleAddToScene}
              >
                افزودن به صحنه
              </Button>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default FurnitureLibrary;
