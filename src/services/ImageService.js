import axios from 'axios';

class ImageService {
  constructor() {
    // مسیر پایه برای تصاویر
    this.basePath = 'E:/کتاب/New folder (2)';
    
    // دسته‌بندی تصاویر
    this.categories = {
      walls: {
        path: '/walls',
        items: [
          { id: 'wall1', name: 'دیوار سفید', price: '150000', thumbnail: '/wall1.jpg' },
          { id: 'wall2', name: 'دیوار آجری', price: '280000', thumbnail: '/wall2.jpg' },
          { id: 'wall3', name: 'کاغذ دیواری گلدار', price: '320000', thumbnail: '/wall3.jpg' },
          // سایر تصاویر دیوار
        ]
      },
      floors: {
        path: '/floors',
        items: [
          { id: 'floor1', name: 'پارکت چوبی', price: '450000', thumbnail: '/floor1.jpg' },
          { id: 'floor2', name: 'سرامیک طرح سنگ', price: '380000', thumbnail: '/floor2.jpg' },
          // سایر تصاویر کف
        ]
      },
      furniture: {
        path: '/furniture',
        items: [
          { id: 'furniture1', name: 'مبل راحتی', price: '12500000', 
            dimensions: { width: 180, height: 90, depth: 85 },
            thumbnail: '/furniture1.jpg' 
          },
          { id: 'furniture2', name: 'میز ناهارخوری', price: '8800000',
            dimensions: { width: 160, height: 75, depth: 90 },
            thumbnail: '/furniture2.jpg'
          },
          // سایر مبلمان
        ]
      }
    };
  }

  getFullPath(relativePath) {
    return `${this.basePath}${relativePath}`;
  }

  async loadImage(path) {
    try {
      const response = await fetch(this.getFullPath(path));
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error loading image:', error);
      return null;
    }
  }

  getCategoryItems(category) {
    return this.categories[category]?.items || [];
  }

  async getItemDetails(category, itemId) {
    const items = this.getCategoryItems(category);
    const item = items.find(i => i.id === itemId);
    if (!item) return null;

    // بارگذاری تصویر با کیفیت بالا
    const imageUrl = await this.loadImage(item.thumbnail);
    return {
      ...item,
      imageUrl
    };
  }

  // تبدیل تصویر به فرمت مناسب برای Three.js
  async loadTextureForThree(path) {
    const image = await this.loadImage(path);
    const texture = new THREE.TextureLoader().load(image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  // دریافت پیش‌نمایش‌های یک دسته
  async getCategoryPreviews(category) {
    const items = this.getCategoryItems(category);
    const previews = await Promise.all(
      items.map(async item => ({
        ...item,
        previewUrl: await this.loadImage(item.thumbnail)
      }))
    );
    return previews;
  }
}

export default new ImageService();
