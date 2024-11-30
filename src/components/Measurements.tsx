import React from 'react';
import { Line, Text } from '@react-three/drei';
import { Vector3 } from 'three';

interface MeasurementProps {
  start: Vector3;
  end: Vector3;
  offset?: number;
  unit?: string;
}

const Measurement: React.FC<MeasurementProps> = ({
  start,
  end,
  offset = 0.2,
  unit = 'cm'
}) => {
  const distance = start.distanceTo(end);
  const center = new Vector3().addVectors(start, end).multiplyScalar(0.5);
  const direction = new Vector3().subVectors(end, start).normalize();
  const perpendicular = new Vector3(-direction.z, 0, direction.x);

  const offsetStart = new Vector3().addVectors(start, perpendicular.multiplyScalar(offset));
  const offsetEnd = new Vector3().addVectors(end, perpendicular.multiplyScalar(offset));

  return (
    <>
      {/* خط اصلی اندازه */}
      <Line
        points={[offsetStart, offsetEnd]}
        color="black"
        lineWidth={1}
      />
      
      {/* خطوط عمودی */}
      <Line
        points={[start, offsetStart]}
        color="black"
        lineWidth={1}
      />
      <Line
        points={[end, offsetEnd]}
        color="black"
        lineWidth={1}
      />

      {/* متن اندازه */}
      <Text
        position={center.add(perpendicular.multiplyScalar(offset * 1.2))}
        fontSize={0.15}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {`${Math.round(distance * 100)} ${unit}`}
      </Text>
    </>
  );
};

interface RoomMeasurementsProps {
  walls: any[];
}

const RoomMeasurements: React.FC<RoomMeasurementsProps> = ({ walls }) => {
  return (
    <>
      {walls.map((wall, index) => (
        <Measurement
          key={index}
          start={new Vector3(wall.start.x, 0, wall.start.z)}
          end={new Vector3(wall.end.x, 0, wall.end.z)}
        />
      ))}
    </>
  );
};

export { Measurement, RoomMeasurements };
