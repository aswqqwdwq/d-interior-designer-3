import React from 'react';
import { AppBar, Toolbar as MUIToolbar, IconButton, Typography, Box } from '@mui/material';
import {
  Brush,
  Wallpaper,
  Chair,
  ThreeDRotation,
  Save,
  Undo,
  Redo,
} from '@mui/icons-material';

const Toolbar = ({ onToolSelect }) => {
  return (
    <AppBar position="static" color="default">
      <MUIToolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          3D Interior Designer
        </Typography>
        <Box>
          <IconButton onClick={() => onToolSelect('draw')}>
            <Brush />
          </IconButton>
          <IconButton onClick={() => onToolSelect('texture')}>
            <Wallpaper />
          </IconButton>
          <IconButton onClick={() => onToolSelect('furniture')}>
            <Chair />
          </IconButton>
          <IconButton onClick={() => onToolSelect('3d')}>
            <ThreeDRotation />
          </IconButton>
          <IconButton onClick={() => onToolSelect('save')}>
            <Save />
          </IconButton>
          <IconButton onClick={() => onToolSelect('undo')}>
            <Undo />
          </IconButton>
          <IconButton onClick={() => onToolSelect('redo')}>
            <Redo />
          </IconButton>
        </Box>
      </MUIToolbar>
    </AppBar>
  );
};

export default Toolbar;
