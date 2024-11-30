import React from 'react';
import {
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

interface FurnitureItem {
  id: string;
  name: string;
  thumbnail: string;
  modelPath: string;
  materialPath?: string;
  category: string;
}

interface FurnitureLibraryProps {
  items: FurnitureItem[];
  onSelectItem: (item: FurnitureItem) => void;
}

const FurnitureLibrary: React.FC<FurnitureLibraryProps> = ({
  items,
  onSelectItem,
}) => {
  return (
    <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Furniture Library
      </Typography>
      <ImageList cols={2} gap={8}>
        {items.map((item) => (
          <ImageListItem 
            key={item.id}
            onClick={() => onSelectItem(item)}
            sx={{ cursor: 'pointer' }}
          >
            <img
              src={item.thumbnail}
              alt={item.name}
              loading="lazy"
              style={{ borderRadius: 4 }}
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.category}
              sx={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default FurnitureLibrary;
