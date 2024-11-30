import * as THREE from 'three';

// تشخیص قدرت دستگاه کاربر
export const detectDeviceCapabilities = () => {
  const gpu = (window as any).GPU;
  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return {
    isHighEnd: gpu && !mobile,
    isMobile: mobile,
    maxTextureSize: THREE.capabilities.maxTextureSize,
    isWebGL2: THREE.REVISION >= 126
  };
};

// مدیریت سطح کیفیت
export const getQualitySettings = (capabilities: any) => {
  if (capabilities.isHighEnd) {
    return {
      shadowMapSize: 2048,
      textureQuality: 'high',
      antialiasing: true,
      maxLights: 8
    };
  } else if (capabilities.isMobile) {
    return {
      shadowMapSize: 512,
      textureQuality: 'low',
      antialiasing: false,
      maxLights: 2
    };
  } else {
    return {
      shadowMapSize: 1024,
      textureQuality: 'medium',
      antialiasing: true,
      maxLights: 4
    };
  };
};

// کش کردن مدل‌ها
export class ModelCache {
  private static cache: Map<string, THREE.Object3D> = new Map();

  static async getModel(path: string, loader: any): Promise<THREE.Object3D> {
    if (this.cache.has(path)) {
      return this.cache.get(path)!.clone();
    }

    const model = await loader.loadAsync(path);
    this.cache.set(path, model);
    return model.clone();
  }

  static clearCache() {
    this.cache.clear();
  }
}
