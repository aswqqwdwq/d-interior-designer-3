import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { SSRPass } from 'three/examples/jsm/postprocessing/SSRPass';

const ModelViewer = ({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  const { gl, scene: threeScene, camera } = useThree();

  useEffect(() => {
    // High-quality renderer setup
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(3840, 2160); // 4K resolution
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;

    // Post-processing setup
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(threeScene, camera);
    composer.addPass(renderPass);

    // Add SSAO (Ambient Occlusion)
    const ssaoPass = new SSAOPass(threeScene, camera, 3840, 2160);
    ssaoPass.kernelRadius = 16;
    ssaoPass.minDistance = 0.005;
    ssaoPass.maxDistance = 0.1;
    composer.addPass(ssaoPass);

    // Add SSR (Screen Space Reflections)
    const ssrPass = new SSRPass({
      renderer: gl,
      scene: threeScene,
      camera: camera,
      width: 3840,
      height: 2160,
      encoding: THREE.sRGBEncoding,
    });
    composer.addPass(ssrPass);

    return () => {
      composer.dispose();
    };
  }, [gl, threeScene, camera]);

  useFrame((state) => {
    if (modelRef.current) {
      // Add any per-frame updates here
      modelRef.current.rotation.y += 0.001;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  );
};

export default ModelViewer;
