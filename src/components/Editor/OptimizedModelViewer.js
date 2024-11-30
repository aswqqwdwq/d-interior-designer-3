import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, LoadingManager } from '@react-three/drei';
import { LinearProgress, Box, Typography } from '@mui/material';

// کامپوننت مدیریت کیفیت
const QualityManager = ({ url, onQualityChange }) => {
  const [quality, setQuality] = useState('low');
  const [devicePerformance, setDevicePerformance] = useState('unknown');

  useEffect(() => {
    // بررسی توان دستگاه
    const checkDevicePerformance = () => {
      const gpu = getGPUTier();
      const memory = navigator.deviceMemory || 4;
      
      if (gpu.tier >= 3 && memory >= 8) {
        return 'high';
      } else if (gpu.tier >= 2 && memory >= 4) {
        return 'medium';
      }
      return 'low';
    };

    setDevicePerformance(checkDevicePerformance());
  }, []);

  useEffect(() => {
    // تنظیم کیفیت بر اساس توان دستگاه
    setQuality(devicePerformance);
    onQualityChange(devicePerformance);
  }, [devicePerformance, onQualityChange]);

  return null;
};

// کامپوننت اصلی نمایش مدل
const OptimizedModelViewer = ({ modelUrl }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentQuality, setCurrentQuality] = useState('low');

  // مدیریت لودینگ
  const loadingManager = new LoadingManager();
  loadingManager.onProgress = (url, loaded, total) => {
    setProgress((loaded / total) * 100);
  };
  loadingManager.onLoad = () => {
    setLoading(false);
  };

  // تابع تغییر کیفیت
  const handleQualityChange = (quality) => {
    setCurrentQuality(quality);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {loading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center">
            {در حال بارگذاری: ${Math.round(progress)}%}
          </Typography>
        </Box>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 5] }}
        gl={{ 
          powerPreference: "high-performance",
          antialias: currentQuality !== 'low',
          precision: currentQuality === 'high' ? 'highp' : 'mediump'
        }}
      >
        <Suspense fallback={null}>
          <QualityManager 
            url={modelUrl} 
            onQualityChange={handleQualityChange}
          />
          <Model 
            url={modelUrl} 
            quality={currentQuality}
            loadingManager={loadingManager}
          />
        </Suspense>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </Canvas>
    </Box>
  );
};

// کامپوننت مدل با قابلیت کش
const Model = React.memo(({ url, quality, loadingManager }) => {
  const { scene } = useGLTF(url, loadingManager);
  
  useEffect(() => {
    // کش کردن مدل
    useGLTF.preload(url);
    
    return () => {
      useGLTF.clear(url);
    };
  }, [url]);

  return <primitive object={scene} />;
});

export default OptimizedModelViewer;
