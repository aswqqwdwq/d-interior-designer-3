import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface FloorPlanEditorProps {
  onPlanUpdate: (plan: any) => void;
}

const FloorPlanEditor: React.FC<FloorPlanEditorProps> = ({ onPlanUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#f0f0f0',
      });

      // Add grid
      for (let i = 0; i < 800; i += 20) {
        fabricCanvasRef.current.add(new fabric.Line([i, 0, i, 600], {
          stroke: '#ddd',
          selectable: false
        }));
        fabricCanvasRef.current.add(new fabric.Line([0, i, 800, i], {
          stroke: '#ddd',
          selectable: false
        }));
      }

      // Add drawing tools
      fabricCanvasRef.current.on('mouse:down', (options) => {
        const pointer = fabricCanvasRef.current?.getPointer(options.e);
        if (pointer) {
          const wall = new fabric.Rect({
            left: pointer.x,
            top: pointer.y,
            width: 10,
            height: 100,
            fill: '#666',
            originX: 'center',
            originY: 'center',
          });
          fabricCanvasRef.current?.add(wall);
        }
      });

      fabricCanvasRef.current.on('object:modified', () => {
        if (onPlanUpdate && fabricCanvasRef.current) {
          onPlanUpdate(fabricCanvasRef.current.toJSON());
        }
      });
    }

    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, [onPlanUpdate]);

  return (
    <div className="floor-plan-editor">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FloorPlanEditor;
