import React, { useState } from 'react';
import { Box, Grid, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import FloorPlanEditor from './components/FloorPlanEditor';
import ThreeViewer from './components/ThreeViewer';
import Toolbar from './components/Toolbar';
import PropertiesPanel from './components/PropertiesPanel';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [selectedTool, setSelectedTool] = useState('wall');
  const [floorPlan, setFloorPlan] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [viewMode, setViewMode] = useState('2d'); // '2d' or '3d'

  const handleToolSelect = (tool: string) => {
    if (tool === '3d') {
      setViewMode(viewMode === '2d' ? '3d' : '2d');
    } else {
      setSelectedTool(tool);
    }
  };

  const handlePlanUpdate = (newPlan: any) => {
    setFloorPlan(newPlan);
  };

  const handlePropertyChange = (property: string, value: any) => {
    if (selectedObject) {
      setSelectedObject({ ...selectedObject, [property]: value });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Toolbar onToolSelect={handleToolSelect} />
        <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
          <Grid item xs={9}>
            {viewMode === '2d' ? (
              <FloorPlanEditor onPlanUpdate={handlePlanUpdate} />
            ) : (
              <ThreeViewer floorPlan={floorPlan} />
            )}
          </Grid>
          <Grid item xs={3}>
            <PropertiesPanel
              selectedObject={selectedObject}
              onPropertyChange={handlePropertyChange}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
