import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CircularProgress,
  Chip
} from '@mui/material';
import ImageService from '../../services/ImageService';

const MaterialCategories = {
  WALL: 'walls',
  FLOOR: 'floors',
  CEILING: 'ceiling',
  FURNITURE: 'furniture'
};

const MaterialManager = ({ onMaterialSelect }) => {
  const [category, setCategory] = useState(MaterialCategories.WALL);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMaterials = async () => {
      setLoading(true);
      try {
        const previews = await ImageService.getCategoryPreviews(category);
        setMaterials(previews);
      } catch (error) {
        console.error('Error loading materials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMaterials();
  }, [category]);

  const handleMaterialSelect = async (material) => {
    if (onMaterialSelect) {
      const details = await ImageService.getItemDetails(category, material.id);
      onMaterialSelect(details);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Paper sx={{ borderRadius: 1 }}>
        <Tabs
          value={category}
          onChange={(e, newValue) => setCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="دیوار" value={MaterialCategories.WALL} />
          <Tab label="کف" value={MaterialCategories.FLOOR} />
          <Tab label="سقف" value={MaterialCategories.CEILING} />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 2, p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {materials.map((material) => (
              <Grid item xs={6} sm={4} md={3} key={material.id}>
                <Card>
                  <CardActionArea onClick={() => handleMaterialSelect(material)}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={material.previewUrl}
                      alt={material.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2" gutterBottom>
                        {material.name}
                      </Typography>
                      <Chip
                        label={`${material.price} تومان`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default MaterialManager;
