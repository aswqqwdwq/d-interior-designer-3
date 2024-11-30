export interface FurnitureItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  modelPath: string;
  thumbnailPath: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  defaultRotation: [number, number, number];
  price?: number;
  description?: string;
}

export const categories = {
  living: 'پذیرایی',
  bedroom: 'اتاق خواب',
  kitchen: 'آشپزخانه',
  bathroom: 'سرویس بهداشتی',
  office: 'اداری',
  outdoor: 'فضای باز',
  decoration: 'دکوراتیو',
};

export const furnitureItems: FurnitureItem[] = [
  {
    id: 'sofa-1',
    name: 'مبل راحتی سه نفره',
    category: 'living',
    subcategory: 'sofa',
    modelPath: '/models/furniture/living/sofa-1.glb',
    thumbnailPath: '/thumbnails/furniture/living/sofa-1.jpg',
    dimensions: {
      width: 200,
      height: 85,
      depth: 90,
    },
    defaultRotation: [0, 0, 0],
    price: 12000000,
    description: 'مبل راحتی سه نفره با طراحی مدرن',
  },
  {
    id: 'bed-1',
    name: 'تخت خواب دو نفره',
    category: 'bedroom',
    subcategory: 'bed',
    modelPath: '/models/furniture/bedroom/bed-1.glb',
    thumbnailPath: '/thumbnails/furniture/bedroom/bed-1.jpg',
    dimensions: {
      width: 160,
      height: 120,
      depth: 200,
    },
    defaultRotation: [0, 0, 0],
    price: 15000000,
    description: 'تخت خواب دو نفره با طراحی کلاسیک',
  },
  // اضافه کردن آیتم‌های بیشتر...
];

export const getItemsByCategory = (category: string) => {
  return furnitureItems.filter(item => item.category === category);
};

export const getItemById = (id: string) => {
  return furnitureItems.find(item => item.id === id);
};
