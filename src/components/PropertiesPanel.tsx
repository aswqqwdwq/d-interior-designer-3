import React from 'react';
import {
  Paper,
  Typography,
  Slider,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ColorPicker,
  Button,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface PropertiesPanelProps {
  selectedObject: any;
  onPropertyChange: (property: string, value: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedObject,
  onPropertyChange,
}) => {
  if (!selectedObject) {
    return (
      <Paper sx={{ p: 2, width: 300, height: '100%', overflow: 'auto' }}>
        <Typography>هیچ آیتمی انتخاب نشده است</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, width: 300, height: '100%', overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {selectedObject.type === 'wall' ? 'تنظیمات دیوار' :
         selectedObject.type === 'furniture' ? 'تنظیمات مبلمان' :
         selectedObject.type === 'room' ? 'تنظیمات اتاق' : 'تنظیمات'}
      </Typography>

      <Stack spacing={2}>
        {/* ابعاد و موقعیت */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>ابعاد و موقعیت</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField
                label="طول"
                type="number"
                value={selectedObject.width || 0}
                onChange={(e) => onPropertyChange('width', Number(e.target.value))}
                fullWidth
                InputProps={{ endAdornment: 'سانتی‌متر' }}
              />
              <TextField
                label="ارتفاع"
                type="number"
                value={selectedObject.height || 0}
                onChange={(e) => onPropertyChange('height', Number(e.target.value))}
                fullWidth
                InputProps={{ endAdornment: 'سانتی‌متر' }}
              />
              {selectedObject.type === 'furniture' && (
                <TextField
                  label="عمق"
                  type="number"
                  value={selectedObject.depth || 0}
                  onChange={(e) => onPropertyChange('depth', Number(e.target.value))}
                  fullWidth
                  InputProps={{ endAdornment: 'سانتی‌متر' }}
                />
              )}
              <Box>
                <Typography gutterBottom>چرخش</Typography>
                <Slider
                  value={selectedObject.rotation || 0}
                  onChange={(_, value) => onPropertyChange('rotation', value)}
                  min={0}
                  max={360}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `${value}°`}
                />
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* متریال و رنگ */}
        {(selectedObject.type === 'wall' || selectedObject.type === 'floor') && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>متریال و رنگ</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>نوع پوشش</InputLabel>
                  <Select
                    value={selectedObject.material || ''}
                    onChange={(e) => onPropertyChange('material', e.target.value)}
                  >
                    <MenuItem value="paint">رنگ</MenuItem>
                    <MenuItem value="wallpaper">کاغذ دیواری</MenuItem>
                    <MenuItem value="tile">کاشی</MenuItem>
                    <MenuItem value="wood">چوب</MenuItem>
                    <MenuItem value="stone">سنگ</MenuItem>
                  </Select>
                </FormControl>
                
                {selectedObject.material === 'paint' && (
                  <Box>
                    <Typography gutterBottom>رنگ</Typography>
                    <ColorPicker
                      value={selectedObject.color || '#ffffff'}
                      onChange={(color) => onPropertyChange('color', color)}
                    />
                  </Box>
                )}

                {selectedObject.material === 'wallpaper' && (
                  <Box>
                    <Typography gutterBottom>الگوی کاغذ دیواری</Typography>
                    {/* اینجا گرید تصاویر کاغذ دیواری قرار می‌گیرد */}
                  </Box>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}

        {/* تنظیمات نور */}
        {selectedObject.type === 'light' && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>تنظیمات نور</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Box>
                  <Typography gutterBottom>شدت نور</Typography>
                  <Slider
                    value={selectedObject.intensity || 1}
                    onChange={(_, value) => onPropertyChange('intensity', value)}
                    min={0}
                    max={2}
                    step={0.1}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <Box>
                  <Typography gutterBottom>رنگ نور</Typography>
                  <ColorPicker
                    value={selectedObject.lightColor || '#ffffff'}
                    onChange={(color) => onPropertyChange('lightColor', color)}
                  />
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedObject.castShadow || false}
                      onChange={(e) => onPropertyChange('castShadow', e.target.checked)}
                    />
                  }
                  label="ایجاد سایه"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}

        {/* تنظیمات درب و پنجره */}
        {(selectedObject.type === 'door' || selectedObject.type === 'window') && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>تنظیمات {selectedObject.type === 'door' ? 'درب' : 'پنجره'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>نوع</InputLabel>
                  <Select
                    value={selectedObject.style || ''}
                    onChange={(e) => onPropertyChange('style', e.target.value)}
                  >
                    {selectedObject.type === 'door' ? (
                      <>
                        <MenuItem value="single">تک لنگه</MenuItem>
                        <MenuItem value="double">دو لنگه</MenuItem>
                        <MenuItem value="sliding">کشویی</MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem value="fixed">ثابت</MenuItem>
                        <MenuItem value="sliding">کشویی</MenuItem>
                        <MenuItem value="casement">بازشو</MenuItem>
                      </>
                    )}
                  </Select>
                </FormControl>
              </Stack>
            </AccordionDetails>
          </Accordion>
        )}
      </Stack>

      {/* دکمه‌های عملیات */}
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => onPropertyChange('delete', true)}
          >
            حذف
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onPropertyChange('duplicate', true)}
          >
            کپی
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PropertiesPanel;
