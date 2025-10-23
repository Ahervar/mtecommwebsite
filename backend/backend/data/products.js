const MOCK_PRODUCTS = [
  {
    "id": 1,
    "category": "Smartphone",
    "brand": "Samsung",
    "name": "Galaxy S24 Ultra",
    "price": 139999,
    "discount": 12,
    "img": "https://images.unsplash.com/photo-1619183186300-5e31d1e6cfd4?q=80&w=800&auto=format&fit=crop",
    "desc": "6.8\" Dynamic AMOLED \u00b7 200MP \u00b7 5000mAh \u00b7 12GB RAM",
    "tags": [
      "Trending",
      "New"
    ]
  },
  {
    "id": 2,
    "category": "Smartphone",
    "brand": "Apple",
    "name": "iPhone 15 Pro Max",
    "price": 159999,
    "discount": 10,
    "img": "https://images.unsplash.com/photo-1701253491198-2c3b7f4fd6f8?q=80&w=800&auto=format&fit=crop",
    "desc": "6.7\" OLED \u00b7 A17 Pro \u00b7 256GB \u00b7 Titanium",
    "tags": [
      "iPhoneDeals",
      "Trending"
    ]
  },
  {
    "id": 3,
    "category": "Smartphone",
    "brand": "OnePlus",
    "name": "OnePlus 12",
    "price": 79999,
    "discount": 15,
    "img": "https://images.unsplash.com/photo-1618246651247-5e6d6c7e7b3e?q=80&w=800&auto=format&fit=crop",
    "desc": "6.82\" Fluid AMOLED \u00b7 50MP \u00b7 5000mAh \u00b7 12GB RAM",
    "tags": [
      "Trending",
      "New"
    ]
  },
  {
    "id": 4,
    "category": "Smartphone",
    "brand": "Xiaomi",
    "name": "Redmi Note 13 Pro",
    "price": 24999,
    "discount": 8,
    "img": "https://images.unsplash.com/photo-1580913428738-1df6f6a6c8f9?q=80&w=800&auto=format&fit=crop",
    "desc": "6.67\" AMOLED \u00b7 108MP \u00b7 5000mAh \u00b7 8GB RAM",
    "tags": [
      "New"
    ]
  },
  {
    "id": 5,
    "category": "Smartphone",
    "brand": "Realme",
    "name": "Realme GT 6",
    "price": 44999,
    "discount": 10,
    "img": "https://images.unsplash.com/photo-1621368090463-1b8d2e3a4e7f?q=80&w=800&auto=format&fit=crop",
    "desc": "6.74\" AMOLED \u00b7 50MP \u00b7 5000mAh",
    "tags": [
      "Trending"
    ]
  },
  {
    "id": 6,
    "category": "Smartphone",
    "brand": "Google",
    "name": "Pixel 8 Pro",
    "price": 89999,
    "discount": 9,
    "img": "https://images.unsplash.com/photo-1542751371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    "desc": "6.7\" LTPO OLED \u00b7 Tensor G3 \u00b7 5000mAh",
    "tags": [
      "New"
    ]
  },
  {
    "id": 7,
    "category": "Smartphone",
    "brand": "Vivo",
    "name": "iQOO Neo 7",
    "price": 29999,
    "discount": 7,
    "img": "https://images.unsplash.com/photo-1599058917214-9b0b9a2d1b6b?q=80&w=800&auto=format&fit=crop",
    "desc": "6.62\" AMOLED \u00b7 64MP \u00b7 4800mAh",
    "tags": [
      "Trending"
    ]
  },
  {
    "id": 8,
    "category": "Refurbished",
    "brand": "Apple",
    "name": "iPhone 12 (Refurbished)",
    "price": 21999,
    "discount": 20,
    "img": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    "desc": "6.1\" OLED \u00b7 A14 \u00b7 64GB \u00b7 Refurbished",
    "tags": [
      "SecondHand",
      "iPhoneDeals"
    ]
  },
  {
    "id": 9,
    "category": "Smartphone",
    "brand": "Samsung",
    "name": "Galaxy A54",
    "price": 25999,
    "discount": 10,
    "img": "https://images.unsplash.com/photo-1523475496153-3d6cc2b5f2c3?q=80&w=800&auto=format&fit=crop",
    "desc": "6.4\" Super AMOLED \u00b7 50MP \u00b7 5000mAh",
    "tags": [
      "Trending"
    ]
  },
  {
    "id": 10,
    "category": "Accessories",
    "brand": "Boat",
    "name": "Boat Airdopes 621 (Wireless)",
    "price": 2499,
    "discount": 25,
    "img": "https://images.unsplash.com/photo-1518444021199-7a7a7f5f2f9c?q=80&w=800&auto=format&fit=crop",
    "desc": "Wireless Earbuds \u00b7 24H Playback \u00b7 IPX4",
    "tags": [
      "Accessories"
    ]
  },
  {
    "id": 11,
    "category": "Accessories",
    "brand": "Anker",
    "name": "Anker PowerCore 20000",
    "price": 3999,
    "discount": 18,
    "img": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=800&auto=format&fit=crop",
    "desc": "20000mAh Power Bank \u00b7 Fast Charge",
    "tags": [
      "Accessories"
    ]
  },
  {
    "id": 12,
    "category": "Accessories",
    "brand": "Xiaomi",
    "name": "Mi Fast Charger 33W",
    "price": 999,
    "discount": 10,
    "img": "https://images.unsplash.com/photo-1588345921523-9f5dfd3b6f4c?q=80&w=800&auto=format&fit=crop",
    "desc": "33W Fast Charger \u00b7 USB-C",
    "tags": [
      "Accessories"
    ]
  },
  {
    "id": 13,
    "category": "Smartphone",
    "brand": "Samsung",
    "name": "Galaxy M14",
    "price": 11999,
    "discount": 5,
    "img": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=800&auto=format&fit=crop",
    "desc": "6.5\" HD+ \u00b7 50MP \u00b7 6000mAh",
    "tags": [
      "New"
    ]
  },
  {
    "id": 14,
    "category": "Smartphone",
    "brand": "Motorola",
    "name": "Moto G Power",
    "price": 14999,
    "discount": 12,
    "img": "https://images.unsplash.com/photo-1510557880182-3d4d3c3f3b3a?q=80&w=800&auto=format&fit=crop",
    "desc": "6.5\" LCD \u00b7 50MP \u00b7 5000mAh",
    "tags": [
      "Trending"
    ]
  },
  {
    "id": 15,
    "category": "Refurbished",
    "brand": "Samsung",
    "name": "Galaxy S21 (Refurbished)",
    "price": 27999,
    "discount": 18,
    "img": "https://images.unsplash.com/photo-1617119110647-0c9f6a9b2c2f?q=80&w=800&auto=format&fit=crop",
    "desc": "6.2\" AMOLED \u00b7 Exynos \u00b7 Refurbished",
    "tags": [
      "SecondHand"
    ]
  },
  {
    "id": 16,
    "category": "Smartphone",
    "brand": "Oppo",
    "name": "Oppo Reno 11",
    "price": 34999,
    "discount": 10,
    "img": "https://images.unsplash.com/photo-1542751371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    "desc": "6.7\" AMOLED \u00b7 50MP \u00b7 4500mAh",
    "tags": [
      "New"
    ]
  },
  {
    "id": 17,
    "category": "Smartphone",
    "brand": "iPhone",
    "name": "iPhone 13 Mini (Refurbished)",
    "price": 16999,
    "discount": 22,
    "img": "https://images.unsplash.com/photo-1523475482561-8c6c8d9e1a0a?q=80&w=800&auto=format&fit=crop",
    "desc": "5.4\" OLED \u00b7 A15 \u00b7 Refurbished",
    "tags": [
      "SecondHand",
      "iPhoneDeals"
    ]
  },
  {
    "id": 18,
    "category": "Smartphone",
    "brand": "Poco",
    "name": "Poco X6 Pro",
    "price": 22999,
    "discount": 9,
    "img": "https://images.unsplash.com/photo-1541807084-5c52b6b84f91?q=80&w=800&auto=format&fit=crop",
    "desc": "6.67\" AMOLED \u00b7 64MP \u00b7 5000mAh",
    "tags": [
      "Trending"
    ]
  },
  {
    "id": 19,
    "category": "Accessories",
    "brand": "Samsung",
    "name": "Samsung Fast Charger 25W",
    "price": 1299,
    "discount": 15,
    "img": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    "desc": "25W Charger \u00b7 USB-C",
    "tags": [
      "Accessories"
    ]
  },
  {
    "id": 20,
    "category": "Accessories",
    "brand": "Sony",
    "name": "Sony WH-CH720N",
    "price": 9999,
    "discount": 20,
    "img": "https://images.unsplash.com/photo-1518444021199-7a7a7f5f2f9c?q=80&w=800&auto=format&fit=crop",
    "desc": "Noise Cancelling Headphones \u00b7 35H Battery",
    "tags": [
      "Accessories"
    ]
  },
  {
    "id": 21,
    "category": "Smartphone",
    "brand": "Samsung",
    "name": "Galaxy F14",
    "price": 10999,
    "discount": 5,
    "img": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=800&auto=format&fit=crop",
    "desc": "6.5\" HD+ \u00b7 50MP \u00b7 6000mAh",
    "tags": [
      "Trending"
    ]
  },
  {
    "id": 22,
    "category": "Smartphone",
    "brand": "Infinix",
    "name": "Infinix Note 40",
    "price": 17999,
    "discount": 10,
    "img": "https://images.unsplash.com/photo-1541807084-5c52b6b84f91?q=80&w=800&auto=format&fit=crop",
    "desc": "6.78\" AMOLED \u00b7 108MP \u00b7 5000mAh",
    "tags": [
      "New"
    ]
  },
  {
    "id": 23,
    "category": "Smartphone",
    "brand": "OnePlus",
    "name": "OnePlus Nord 3",
    "price": 27999,
    "discount": 11,
    "img": "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=800&auto=format&fit=crop",
    "desc": "6.74\" AMOLED \u00b7 64MP \u00b7 5000mAh",
    "tags": [
      "Trending"
    ]
  },
  {
    "id": 24,
    "category": "Refurbished",
    "brand": "Google",
    "name": "Pixel 6 (Refurbished)",
    "price": 12999,
    "discount": 30,
    "img": "https://images.unsplash.com/photo-1523475496153-3d6cc2b5f2c3?q=80&w=800&auto=format&fit=crop",
    "desc": "6.4\" OLED \u00b7 Tensor \u00b7 Refurbished",
    "tags": [
      "SecondHand"
    ]
  }
];

export default MOCK_PRODUCTS;