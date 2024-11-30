import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Typography,
  Collapse,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  MoreVert,
  Lock,
  LockOpen,
} from '@mui/icons-material';
import useProjectStore from '../store/projectStore';

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  objects: string[];
}

const LayerManager: React.FC = () => {
  const [layers, setLayers] = React.useState<Layer[]>([
    {
      id: 'walls',
      name: 'دیوارها',
      visible: true,
      locked: false,
      objects: [],
    },
    {
      id: 'furniture',
      name: 'مبلمان',
      visible: true,
      locked: false,
      objects: [],
    },
    {
      id: 'decorations',
      name: 'دکوراسیون',
      visible: true,
      locked: false,
      objects: [],
    },
  ]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedLayer, setSelectedLayer] = React.useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, layerId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedLayer(layerId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLayer(null);
  };

  const toggleVisibility = (layerId: string) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLock = (layerId: string) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const renameLayer = (layerId: string, newName: string) => {
    setLayers(layers.map(layer =>
      layer.id === layerId ? { ...layer, name: newName } : layer
    ));
  };

  return (
    <Paper sx={{ width: 300, maxHeight: '100%', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        لایه‌ها
      </Typography>
      <List>
        {layers.map((layer) => (
          <ListItem key={layer.id}>
            <ListItemIcon>
              <IconButton
                size="small"
                onClick={() => toggleVisibility(layer.id)}
              >
                {layer.visible ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </ListItemIcon>
            <ListItemText primary={layer.name} />
            <ListItemSecondaryAction>
              <IconButton
                size="small"
                onClick={() => toggleLock(layer.id)}
              >
                {layer.locked ? <Lock /> : <LockOpen />}
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => handleMenuClick(e, layer.id)}
              >
                <MoreVert />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          // Implement rename functionality
          handleMenuClose();
        }}>
          تغییر نام
        </MenuItem>
        <MenuItem onClick={() => {
          // Implement merge functionality
          handleMenuClose();
        }}>
          ادغام با لایه دیگر
        </MenuItem>
        <MenuItem onClick={() => {
          // Implement duplicate functionality
          handleMenuClose();
        }}>
          کپی لایه
        </MenuItem>
        <MenuItem onClick={() => {
          // Implement delete functionality
          handleMenuClose();
        }}>
          حذف لایه
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default LayerManager;
