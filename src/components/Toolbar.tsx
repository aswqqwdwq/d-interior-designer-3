import React, { useState } from 'react';
import {
  AppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Wallpaper,
  Palette,
  Weekend,
  Straighten,
  ThreeDRotation,
  Add,
  GridOn,
  Door,
  Window,
  Stairs,
  Architecture,
  Crop,
  PhotoCamera,
  Save,
  Undo,
  Redo
} from '@mui/icons-material';

interface ToolbarProps {
  onToolSelect: (tool: string, subTool?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onToolSelect }) => {
  const [wallMenuAnchor, setWallMenuAnchor] = useState<null | HTMLElement>(null);
  const [furnitureMenuAnchor, setFurnitureMenuAnchor] = useState<null | HTMLElement>(null);

  const handleWallMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setWallMenuAnchor(event.currentTarget);
  };

  const handleFurnitureMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFurnitureMenuAnchor(event.currentTarget);
  };

  const handleWallMenuClose = () => {
    setWallMenuAnchor(null);
  };

  const handleFurnitureMenuClose = () => {
    setFurnitureMenuAnchor(null);
  };

  return (
    <AppBar position="static" color="default" sx={{ zIndex: 1000 }}>
      <MuiToolbar variant="dense">
        {/* File Operations */}
        <Box sx={{ mr: 2 }}>
          <Tooltip title="ذخیره">
            <IconButton onClick={() => onToolSelect('save')}>
              <Save />
            </IconButton>
          </Tooltip>
          <Tooltip title="برگشت">
            <IconButton onClick={() => onToolSelect('undo')}>
              <Undo />
            </IconButton>
          </Tooltip>
          <Tooltip title="جلو">
            <IconButton onClick={() => onToolSelect('redo')}>
              <Redo />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Drawing Tools */}
        <Box sx={{ mr: 2 }}>
          <Tooltip title="ابزارهای دیوار">
            <IconButton onClick={handleWallMenuOpen}>
              <Architecture />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={wallMenuAnchor}
            open={Boolean(wallMenuAnchor)}
            onClose={handleWallMenuClose}
          >
            <MenuItem onClick={() => { onToolSelect('wall', 'straight'); handleWallMenuClose(); }}>
              دیوار مستقیم
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('wall', 'curved'); handleWallMenuClose(); }}>
              دیوار منحنی
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('wall', 'room'); handleWallMenuClose(); }}>
              اتاق کامل
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { onToolSelect('door'); handleWallMenuClose(); }}>
              <Door sx={{ mr: 1 }} /> درب
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('window'); handleWallMenuClose(); }}>
              <Window sx={{ mr: 1 }} /> پنجره
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('stairs'); handleWallMenuClose(); }}>
              <Stairs sx={{ mr: 1 }} /> پله
            </MenuItem>
          </Menu>

          <Tooltip title="اندازه‌گیری">
            <IconButton onClick={() => onToolSelect('measure')}>
              <Straighten />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Furniture and Decoration */}
        <Box sx={{ mr: 2 }}>
          <Tooltip title="مبلمان و دکوراسیون">
            <IconButton onClick={handleFurnitureMenuOpen}>
              <Weekend />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={furnitureMenuAnchor}
            open={Boolean(furnitureMenuAnchor)}
            onClose={handleFurnitureMenuClose}
          >
            <MenuItem onClick={() => { onToolSelect('furniture', 'living'); handleFurnitureMenuClose(); }}>
              مبلمان پذیرایی
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('furniture', 'bedroom'); handleFurnitureMenuClose(); }}>
              مبلمان اتاق خواب
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('furniture', 'kitchen'); handleFurnitureMenuClose(); }}>
              لوازم آشپزخانه
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('furniture', 'bathroom'); handleFurnitureMenuClose(); }}>
              سرویس بهداشتی
            </MenuItem>
            <MenuItem onClick={() => { onToolSelect('furniture', 'office'); handleFurnitureMenuClose(); }}>
              لوازم اداری
            </MenuItem>
          </Menu>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Decoration Tools */}
        <Box sx={{ mr: 2 }}>
          <Tooltip title="کاغذ دیواری">
            <IconButton onClick={() => onToolSelect('wallpaper')}>
              <Wallpaper />
            </IconButton>
          </Tooltip>
          <Tooltip title="رنگ">
            <IconButton onClick={() => onToolSelect('paint')}>
              <Palette />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* View Tools */}
        <Box>
          <Tooltip title="نمای سه بعدی">
            <IconButton onClick={() => onToolSelect('3d')}>
              <ThreeDRotation />
            </IconButton>
          </Tooltip>
          <Tooltip title="عکس">
            <IconButton onClick={() => onToolSelect('screenshot')}>
              <PhotoCamera />
            </IconButton>
          </Tooltip>
          <Tooltip title="خط‌کش">
            <IconButton onClick={() => onToolSelect('grid')}>
              <GridOn />
            </IconButton>
          </Tooltip>
        </Box>
      </MuiToolbar>
    </AppBar>
  );
};

export default Toolbar;
