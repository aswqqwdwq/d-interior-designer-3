import React, { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import * as THREE from 'three';

interface ModelLoaderProps {
  modelPath: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  materialPath?: string;
}

const ModelLoader: React.FC<ModelLoaderProps> = ({
  modelPath,
  position,
  rotation,
  scale,
  materialPath
}) => {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (modelPath.toLowerCase().endsWith('.glb') || modelPath.toLowerCase().endsWith('.gltf')) {
          const gltf = await new GLTFLoader().loadAsync(modelPath);
          setModel(gltf.scene);
        } else if (modelPath.toLowerCase().endsWith('.obj')) {
          const objLoader = new OBJLoader();
          
          if (materialPath) {
            const materials = await new MTLLoader().loadAsync(materialPath);
            materials.preload();
            objLoader.setMaterials(materials);
          }
          
          const obj = await objLoader.loadAsync(modelPath);
          setModel(obj);
        }
      } catch (error) {
        console.error('Error loading model:', error);
      }
    };

    loadModel();
  }, [modelPath, materialPath]);

  if (!model) return null;

  return (
    <primitive 
      object={model} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export default ModelLoader;
