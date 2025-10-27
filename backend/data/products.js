const MOCK_PRODUCTS = [
  {
    "id": 1,
    "category": "Smartphone",
    "brand": "Samsung",
    "name": "Galaxy S24 Ultra",
    "price": 139999,
    "discount": 12,
    "img": "https://m.media-amazon.com/images/I/71WcjsOVOmL._UF894%2C1000_QL80_.jpg",
    "desc": "6.8\" Dynamic AMOLED · 200MP · 5000mAh · 12GB RAM",
    "tags": [
      "Trending",
      "New",
      "Android"
      
    ]
  },
  {
    "id": 2,
    "category": "Smartphone",
    "brand": "Apple",
    "name": "iPhone 15 Pro Max",
    "price": 159999,
    "discount": 10,
    "img": "https://maplestore-stage.s3.amazonaws.com/production/products/Iphone%2015%20Pro%20Natural%201.png",
    "desc": "6.7\" OLED · A17 Pro · 256GB · Titanium",
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
    "img": "https://image01-in.oneplus.net/media/202407/04/6c65a8d000b569dab4d9898c1dde1dfb.png?x-amz-process=image/format,webp/quality,Q_80",
    "desc": "6.82\" Fluid AMOLED · 50MP · 5000mAh · 12GB RAM",
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
    "img": "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303569_0_xi6tje.png?tr=w-640",
    "desc": "6.67\" AMOLED · 108MP · 5000mAh · 8GB RAM",
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
    "img": "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/307769_0_cyfqam.png?tr=w-640",
    "desc": "6.74\" AMOLED · 50MP · 5000mAh",
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
    "img": "https://m.media-amazon.com/images/I/71r0349s3cL._SX679_.jpg",
    "desc": "6.7\" LTPO OLED · Tensor G3 · 5000mAh",
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
    "img": "https://m.media-amazon.com/images/I/41xfzQ2MeAL._SY300_SX300_QL70_FMwebp_.jpg",
    "desc": "6.62\" AMOLED · 64MP · 4800mAh",
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
    "img": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYImkTH4baOuRDVI9s-wCx--npQRKhutuC8oRwUVD4yt8rR0egqA1_KnzXj-j842xaJm74CKQHJunowK08e17a7EWqmetoxhLa61h0LrbNv48CG1W5GUEz",
    "desc": "6.1\" OLED · A14 · 64GB · Refurbished",
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
    "img": "https://m.media-amazon.com/images/I/71kfHC4ANJL._SX679_.jpg",
    "desc": "6.4\" Super AMOLED · 50MP · 5000mAh",
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
    "img": "https://www.boat-lifestyle.com/cdn/shop/products/main-img_AD621_1_600x.png?v=1616230788",
    "desc": "Wireless Earbuds · 24H Playback · IPX4",
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
    "img": "https://m.media-amazon.com/images/I/51HYM-4CXVL._SX522_.jpg",
    "desc": "20000mAh Power Bank · Fast Charge",
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
    "img": "https://i01.appmifile.com/webfile/globalimg/xm_event/in/2d96a807dea5d9e526974dae7b53e01a.jpg",
    "desc": "33W Fast Charger · USB-C",
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
    "img": "https://m.media-amazon.com/images/I/41tFC8GKz8L._SY300_SX300_QL70_FMwebp_.jpg",
    "desc": "6.5\" HD+ · 50MP · 6000mAh",
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
    "img": "https://m.media-amazon.com/images/I/71BxTKhVCEL._AC_UY218_.jpg",
    "desc": "6.5\" LCD · 50MP · 5000mAh",
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
    "img": "https://m.media-amazon.com/images/I/41v6xtH3IYL._SY300_SX300_QL70_FMwebp_.jpg",
    "desc": "6.2\" AMOLED · Exynos · Refurbished",
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
    "img": "https://m.media-amazon.com/images/I/41bcKW1FbAL._SY300_SX300_QL70_FMwebp_.jpg",
    "desc": "6.7\" AMOLED · 50MP · 4500mAh",
    "tags": [
      "New"
    ]
  },
  {
    "id": 17,
    "category": "Smartphone", 
    "brand": "Apple",
    "name": "iPhone 13 Mini (Refurbished)",
    "price": 16999,
    "discount": 22,
    "img": "https://m.media-amazon.com/images/I/31GEfQ0aszL._SX342_SY445_QL70_FMwebp_.jpg",
    "desc": "5.4\" OLED · A15 · Refurbished",
    "tags": [
      "SecondHand",
      "iPhoneDeals",
      "budget"
    ]
  },
  {
    "id": 18,
    "category": "Smartphone",
    "brand": "Poco",
    "name": "Poco X6 Pro",
    "price": 22999,
    "discount": 9,
    "img": "https://m.media-amazon.com/images/I/61wTF6ORVnL._SL1400_.jpg",
    "desc": "6.67\" AMOLED · 64MP · 5000mAh",
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
    "img": "https://m.media-amazon.com/images/I/31uoupSkzaL._SX300_SY300_QL70_FMwebp_.jpg",
    "desc": "25W Charger · USB-C",
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
    "img": "https://m.media-amazon.com/images/I/51rpbVmi9XL._SX522_.jpg",
    "desc": "Noise Cancelling Headphones · 35H Battery",
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
    "img": "https://m.media-amazon.com/images/I/817R1SqIaUL._SY679_.jpg",
    "desc": "6.5\" HD+ · 50MP · 6000mAh",
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
    "img": "https://m.media-amazon.com/images/I/61zcDK4jZBL._SY741_.jpg",
    "desc": "6.78\" AMOLED · 108MP · 5000mAh",
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
    "img": "https://oasis.opstatics.com/content/dam/oasis/page/2023/global/product/vitamin/vitamin-spec-green.png",
    "desc": "6.74\" AMOLED · 64MP · 5000mAh",
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
    "img": "https://m.media-amazon.com/images/I/61OJJSFEkBL._SL1500_.jpg",
    "desc": "6.4\" OLED · Tensor · Refurbished",
    "tags": [
      "SecondHand"
    ]
  },
  {
    "id": 25,
    "category": "Apple",
    "brand": "Apple",
    "name": "iPhone 17",
    "price": 82900,
    "discount": 20,
    "img": "https://m.media-amazon.com/images/I/61UCtwkgV7L._SX679_.jpg",
    "desc": "6.3\" OLED · A19 · 256GB",
    "tags": [
      "SecondHand",
      "iPhoneDeals"
    ]
  },
    // 🆕 New Launches
    {
      id: 26,
      category: "Smartphone",
      brand: "Lava",
      name: "Lava Blaze 5G",
      price: 10999,
      discount: 5,
      img: "https://m.media-amazon.com/images/I/61QrADCsn8L.jpg",
      desc: "6.5\" HD+ · Dimensity 6020 · 5000mAh",
      tags: ["NewLaunch"]
    },
    {
      id: 27,
      category: "Smartphone",
      brand: "iQOO",
      name: "iQOO Z9 5G",
      price: 18999,
      discount: 8,
      img: "https://m.media-amazon.com/images/I/41WnWm3IjiL._SY300_SX300_QL70_FMwebp_.jpg",
      desc: "6.67\" AMOLED · Dimensity 7200 · 5000mAh",
      tags: ["NewLaunch"]
    },
    {
      id: 28,
      category: "Smartphone",
      brand: "Infinix",
      name: "Infinix Zero 30",
      price: 15999,
      discount: 10,
      img: "https://m.media-amazon.com/images/I/41Otlt7DBBL._SY300_SX300_QL70_FMwebp_.jpg",
      desc: "6.78\" AMOLED · 108MP · Helio G99",
      tags: ["NewLaunch"]
    },
    {
      id: 29,
      category: "Smartphone",
      brand: "Motorola",
      name: "Moto G85 5G",
      price: 14999,
      discount: 7,
      img: "https://m.media-amazon.com/images/I/61y2gkO89wL._AC_UY218_.jpg",
      desc: "6.6\" AMOLED · Snapdragon 695 · 5000mAh",
      tags: ["NewLaunch"]
    },
  
    // 💸 Discount Products
    {
      id: 30,
      category: "Smartphone",
      brand: "Realme",
      name: "Realme Narzo 60X",
      price: 9999,
      discount: 20,
      img: "https://m.media-amazon.com/images/I/81WimZLWH1L._SL1500_.jpg",
      desc: "6.72\" FHD+ · Dimensity 6100+ · 5000mAh",
      tags: ["Discount"]
    },
    {
      id: 31,
      category: "Smartphone",
      brand: "Tecno",
      name: "Tecno Spark 20",
      price: 7999,
      discount: 25,
      img: "https://m.media-amazon.com/images/I/71RJ9pZFMFL._SL1280_.jpg",
      desc: "6.6\" HD+ · Helio G85 · 5000mAh",
      tags: ["Discount"]
    },
    {
      id: 32,
      category: "Smartphone",
      brand: "Infinix",
      name: "Infinix Smart 9 HD",
      price: 6799,
      discount: 18,
      img: "https://m.media-amazon.com/images/I/71LEdAu9VAL._AC_UY218_.jpg",
      desc: "6.6\" HD+ · Unisoc T606 · 5000mAh",
      tags: ["Discount"]
    },
    {
      id: 33,
      category: "Smartphone",
      brand: "Samsung",
      name: "Samsung Galaxy M13",
      price: 9499,
      discount: 15,
      img: "https://m.media-amazon.com/images/I/71kmZ1zJYUL._AC_UY218_.jpg",
      desc: "6.6\" PLS LCD · Exynos 850 · 6000mAh",
      tags: ["Discount"]
    }
];

export default MOCK_PRODUCTS;
