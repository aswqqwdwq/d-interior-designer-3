import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Effects } from '@react-three/drei';
import { EffectComposer, SSAO, Bloom, ToneMapping } from '@react-three/postprocessing';
import { detectDeviceCapabilities, getQualitySettings, ModelCache } from '../utils/optimization';

interface ThreeViewerProps {
  floorPlan: any;
}

const ThreeViewer: React.FC<ThreeViewerProps> = ({ floorPlan }) => {
  const [quality, setQuality] = useState(null);
  
  useEffect(() => {
    const capabilities = detectDeviceCapabilities();
    setQuality(getQualitySettings(capabilities));
  }, []);

  if (!quality) return null;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [10, 10, 10], fov: 50 }}
        gl={{
          antialias: quality.antialiasing,
          preserveDrawingBuffer: true,
          precision: quality.isHighEnd ? 'highp' : 'mediump',
          powerPreference: 'high-performance'
        }}
        dpr={[1, quality.isHighEnd ? 2 : 1]}
        shadows
      >
        <ambientLight intensity={0.5} />
        <pointLight 
          position={[10, 10, 10]} 
          castShadow 
          shadow-mapSize-width={quality.shadowMapSize}
          shadow-mapSize-height={quality.shadowMapSize}
        />
        <Grid infiniteGrid />
        <OrbitControls />
        
        {quality.isHighEnd && (
          <EffectComposer>
            <SSAO radius={0.4} intensity={50} luminanceInfluence={0.4} />
            <Bloom intensity={0.5} luminanceThreshold={1} />
            <ToneMapping
              exposure={1}
              whitePoint={1}
              adaptationRate={1}
              maxLuminance={16}
            />
          </EffectComposer>
        )}

        {/* Render walls based on floor plan */}
        {floorPlan && floorPlan.objects?.map((obj: any, index: number) => (
          <mesh
            key={index}
            position={[obj.left / 50, 1, obj.top / 50]}
            rotation={[0, obj.angle * Math.PI / 180, 0]}
          >
            <boxGeometry args={[obj.width / 50, 2, obj.height / 50]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
};

export default ThreeViewer;
