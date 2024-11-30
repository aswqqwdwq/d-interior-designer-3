import { saveAs } from 'file-saver';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

export const exportToImage = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => {
  renderer.render(scene, camera);
  const dataURL = renderer.domElement.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'interior-design.png';
  link.href = dataURL;
  link.click();
};

export const exportTo3D = async (scene: THREE.Scene) => {
  const exporter = new GLTFExporter();
  
  const gltf = await new Promise((resolve) => {
    exporter.parse(
      scene,
      (result) => {
        resolve(result);
      },
      { binary: true }
    );
  });

  const blob = new Blob([gltf as BlobPart], { type: 'application/octet-stream' });
  saveAs(blob, 'interior-design.glb');
};

export const exportToJSON = (projectData: any) => {
  const json = JSON.stringify(projectData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, 'interior-design.json');
};

export const generateShareableLink = (projectData: any) => {
  const compressed = btoa(JSON.stringify(projectData));
  return `${window.location.origin}/share/${compressed}`;
};

export const exportToPDF = async (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  projectData: any
) => {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();

  // Add project info
  doc.setFont('helvetica');
  doc.setFontSize(20);
  doc.text('گزارش طراحی داخلی', 105, 20, { align: 'center' });

  // Add rendered image
  renderer.render(scene, camera);
  const dataURL = renderer.domElement.toDataURL('image/jpeg', 1.0);
  doc.addImage(dataURL, 'JPEG', 15, 40, 180, 100);

  // Add measurements and details
  doc.setFontSize(12);
  let y = 150;
  
  doc.text('مشخصات پروژه:', 15, y);
  y += 10;
  
  if (projectData.dimensions) {
    doc.text(`ابعاد کلی: ${projectData.dimensions.width}×${projectData.dimensions.length} متر`, 20, y);
    y += 7;
  }
  
  if (projectData.rooms) {
    doc.text(`تعداد اتاق: ${projectData.rooms.length}`, 20, y);
    y += 7;
  }
  
  if (projectData.furniture) {
    doc.text(`تعداد مبلمان: ${projectData.furniture.length}`, 20, y);
    y += 7;
  }

  // Save PDF
  doc.save('interior-design-report.pdf');
};
