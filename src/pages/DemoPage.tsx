import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Dialog,
} from '@mui/material';
import useProjectStore from '../store/projectStore';

const demoProjects = [
  {
    id: 'living-room',
    name: 'نمونه پذیرایی مدرن',
    thumbnail: '/demo/living-room-thumb.jpg',
    description: 'طراحی پذیرایی با سبک مدرن و مینیمال',
    presetData: {
      walls: [
        { type: 'wall', points: [[0, 0], [500, 0]], height: 280 },
        { type: 'wall', points: [[500, 0], [500, 400]], height: 280 },
        { type: 'wall', points: [[500, 400], [0, 400]], height: 280 },
        { type: 'wall', points: [[0, 400], [0, 0]], height: 280 },
      ],
      furniture: [
        {
          type: 'sofa',
          model: 'modern-sofa',
          position: [250, 0, 200],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        },
        {
          type: 'table',
          model: 'coffee-table',
          position: [250, 0, 300],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        },
      ],
      materials: {
        walls: { type: 'paint', color: '#f5f5f5' },
        floor: { type: 'wood', texture: 'oak' },
      },
    },
  },
  {
    id: 'bedroom',
    name: 'نمونه اتاق خواب',
    thumbnail: '/demo/bedroom-thumb.jpg',
    description: 'طراحی اتاق خواب با سبک معاصر',
    presetData: {
      walls: [
        { type: 'wall', points: [[0, 0], [400, 0]], height: 280 },
        { type: 'wall', points: [[400, 0], [400, 300]], height: 280 },
        { type: 'wall', points: [[400, 300], [0, 300]], height: 280 },
        { type: 'wall', points: [[0, 300], [0, 0]], height: 280 },
      ],
      furniture: [
        {
          type: 'bed',
          model: 'modern-bed',
          position: [200, 0, 150],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        },
        {
          type: 'wardrobe',
          model: 'sliding-wardrobe',
          position: [380, 0, 150],
          rotation: [0, Math.PI / 2, 0],
          scale: [1, 1, 1],
        },
      ],
      materials: {
        walls: { type: 'paint', color: '#e8e8e8' },
        floor: { type: 'carpet', texture: 'beige' },
      },
    },
  },
];

const DemoPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const loadProject = useProjectStore(state => state.loadProject);

  const handleProjectSelect = (project: any) => {
    setSelectedProject(project);
    loadProject(project.presetData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        نسخه نمایشی طراح دکوراسیون داخلی سه‌بعدی
      </Typography>
      
      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        نمونه‌های آماده را مشاهده کنید و با امکانات نرم‌افزار آشنا شوید
      </Typography>

      <Grid container spacing={3}>
        {demoProjects.map((project) => (
          <Grid item xs={12} md={6} key={project.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={project.thumbnail}
                alt={project.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleProjectSelect(project)}
                >
                  مشاهده و ویرایش
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          امکانات نسخه نمایشی:
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Typography>✓ طراحی پلان دوبعدی</Typography>
            <Typography>✓ نمای سه‌بعدی آنی</Typography>
            <Typography>✓ کتابخانه مبلمان آماده</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>✓ تغییر رنگ و متریال</Typography>
            <Typography>✓ اندازه‌گیری دقیق</Typography>
            <Typography>✓ خروجی عکس و PDF</Typography>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        maxWidth="lg"
        fullWidth
      >
        {selectedProject && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {selectedProject.name}
            </Typography>
            {/* اینجا کامپوننت اصلی طراحی قرار می‌گیرد */}
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default DemoPage;
