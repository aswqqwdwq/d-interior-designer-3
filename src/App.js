import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Toolbar from './components/UI/Toolbar';
import FloorPlanEditor from './components/Editor/FloorPlanEditor';
import ThreeViewer from './components/Editor/ThreeViewer';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  const [currentTool, setCurrentTool] = useState('draw');
  const [viewMode, setViewMode] = useState('2d');

  const handleToolSelect = (tool) => {
    if (tool === '3d') {
      setViewMode(viewMode === '2d' ? '3d' : '2d');
    }
    setCurrentTool(tool);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Toolbar onToolSelect={handleToolSelect} />
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          {viewMode === '2d' ? (
            <FloorPlanEditor currentTool={currentTool} />
          ) : (
            <ThreeViewer />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
