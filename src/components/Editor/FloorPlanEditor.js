import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

const FloorPlanEditor = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    // Initialize Fabric.js canvas
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth * 0.7,
      height: window.innerHeight * 0.8,
      backgroundColor: '#f0f0f0',
    });

    // Add drawing mode for walls
    const canvas = fabricRef.current;
    let isDrawing = false;
    let startPoint;

    canvas.on('mouse:down', (options) => {
      isDrawing = true;
      startPoint = canvas.getPointer(options.e);
      const wall = new fabric.Line([startPoint.x, startPoint.y, startPoint.x, startPoint.y], {
        stroke: '#333',
        strokeWidth: 5,
        selectable: true,
      });
      canvas.add(wall);
      canvas.renderAll();
    });

    canvas.on('mouse:move', (options) => {
      if (!isDrawing) return;
      const pointer = canvas.getPointer(options.e);
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === 'line') {
        activeObject.set({
          x2: pointer.x,
          y2: pointer.y,
        });
        canvas.renderAll();
      }
    });

    canvas.on('mouse:up', () => {
      isDrawing = false;
    });

    // Cleanup
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FloorPlanEditor;
