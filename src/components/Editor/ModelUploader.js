import React, { useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';

const ModelUploader = ({ onModelUploaded }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['.glb', '.gltf', '.fbx', '.obj'];
    const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
    if (!validTypes.includes(fileExtension)) {
      alert('فرمت فایل پشتیبانی نمی‌شود. لطفاً از فرمت‌های GLB, GLTF, FBX یا OBJ استفاده کنید.');
      return;
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      alert('حجم فایل نباید بیشتر از 50 مگابایت باشد.');
      return;
    }

    const formData = new FormData();
    formData.append('model', file);

    setUploading(true);
    try {
      const response = await axios.post('/api/models/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      if (response.data.success) {
        onModelUploaded(response.data.model);
      }
    } catch (error) {
      console.error('Error uploading model:', error);
      alert('خطا در آپلود فایل. لطفاً دوباره تلاش کنید.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <input
        accept=".glb,.gltf,.fbx,.obj"
        style={{ display: 'none' }}
        id="model-upload"
        type="file"
        onChange={handleFileUpload}
        disabled={uploading}
      />
      <label htmlFor="model-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
          disabled={uploading}
        >
          آپلود مدل سه بعدی
        </Button>
      </label>
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            در حال آپلود: {progress}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ModelUploader;
