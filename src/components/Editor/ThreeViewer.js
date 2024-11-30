import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const ThreeViewer = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />
        <Environment preset="sunset" />
        {/* 3D models will be added here */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Canvas>
    </div>
  );
};

export default ThreeViewer;
