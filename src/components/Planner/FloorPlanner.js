import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Box, Paper, Typography } from '@mui/material';
import GridLines from './GridLines';
import { GRID_SIZE, WALL_THICKNESS } from '../../constants/dimensions';

class FloorPlan extends fabric.Canvas {
  constructor(element, options) {
    super(element, options);
    this.walls = [];
    this.rooms = [];
    this.measurements = [];
    this.gridSize = GRID_SIZE;
    this.setupGrid();
    this.setupHandlers();
  }

  setupGrid() {
    const gridLines = new GridLines(this);
    gridLines.draw();
    this.gridLines = gridLines;
  }

  setupHandlers() {
    this.on('mouse:down', this.onMouseDown.bind(this));
    this.on('mouse:move', this.onMouseMove.bind(this));
    this.on('mouse:up', this.onMouseUp.bind(this));
    this.on('object:moving', this.snapToGrid.bind(this));
  }

  addWall(startPoint, endPoint) {
    const wall = new fabric.Line([
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y
    ], {
      stroke: '#333',
      strokeWidth: WALL_THICKNESS,
      selectable: true,
      hasControls: true,
      hasBorders: true,
      lockScalingX: false,
      lockScalingY: true,
      cornerStyle: 'circle',
      cornerSize: 8,
      transparentCorners: false,
      cornerColor: '#0078D4',
      type: 'wall'
    });

    this.walls.push(wall);
    this.add(wall);
    this.renderAll();
    return wall;
  }

  addRoom(points) {
    const room = new fabric.Polygon(points, {
      fill: 'rgba(0, 120, 212, 0.1)',
      stroke: '#0078D4',
      strokeWidth: 1,
      selectable: true,
      hasControls: true,
      hasBorders: true,
      type: 'room'
    });

    this.rooms.push(room);
    this.add(room);
    this.renderAll();
    return room;
  }

  addMeasurement(wall) {
    const start = wall.get('x1');
    const end = wall.get('x2');
    const length = Math.sqrt(
      Math.pow(end - start, 2) + 
      Math.pow(wall.get('y2') - wall.get('y1'), 2)
    );

    const text = new fabric.Text(
      `${(length / this.gridSize).toFixed(2)}m`,
      {
        fontSize: 14,
        fill: '#666',
        left: (start + end) / 2,
        top: wall.get('y1') - 20,
        selectable: false
      }
    );

    this.measurements.push(text);
    this.add(text);
    this.renderAll();
  }

  snapToGrid(event) {
    const obj = event.target;
    const grid = this.gridSize;
    
    obj.set({
      left: Math.round(obj.left / grid) * grid,
      top: Math.round(obj.top / grid) * grid
    });
  }

  onMouseDown(event) {
    if (this.drawingMode) {
      const pointer = this.getPointer(event.e);
      this.isDrawing = true;
      this.startPoint = pointer;
      
      if (this.activeWall) {
        this.activeWall.set({
          x2: pointer.x,
          y2: pointer.y
        });
      } else {
        this.activeWall = this.addWall(pointer, pointer);
      }
    }
  }

  onMouseMove(event) {
    if (!this.isDrawing) return;
    
    const pointer = this.getPointer(event.e);
    this.activeWall.set({
      x2: pointer.x,
      y2: pointer.y
    });
    
    this.renderAll();
  }

  onMouseUp() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.addMeasurement(this.activeWall);
      this.activeWall = null;
    }
  }
}

const FloorPlannerComponent = () => {
  const canvasRef = useRef(null);
  const [planner, setPlanner] = useState(null);
  const [mode, setMode] = useState('wall'); // wall, room, furniture

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FloorPlan(canvasRef.current, {
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.8,
      backgroundColor: '#fff',
      selection: true
    });

    setPlanner(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <Box sx={{ p: 2, height: '100%' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Floor Planner</Typography>
      </Paper>
      <canvas ref={canvasRef} />
    </Box>
  );
};

export default FloorPlannerComponent;
