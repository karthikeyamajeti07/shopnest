export interface Product {
  id: number;
  name: string;
  category: 'Smartphones' | 'Laptops' | 'Headphones' | 'Smart Watches' | 'Shoes' | 'Cameras';
  price: number;
  rating: number;
  availability: 'In Stock' | 'Out of Stock';
  deliveryDays: number;
  quality: number; // 1-10 scale
  qualityTier: 'Low' | 'Medium' | 'High';
  description: string;
  brand: string;
  image: string;
  specs: Record<string, string>;
  features: string[];
}

export const sampleProducts: Product[] = [
  // Smartphones (6)
  {
    id: 1,
    name: "OnePlus Nord CE4 5G",
    category: "Smartphones",
    price: 24999,
    rating: 4.5,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 9,
    qualityTier: "High",
    description: "High-performance smartphone with Snapdragon 7 Gen 3, 100W SUPERVOOC charging and 50MP Sony LYT-600 OIS camera.",
    brand: "OnePlus",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "6.7\" 120Hz AMOLED",
      "Processor": "Snapdragon 7 Gen 3",
      "RAM & Storage": "8GB + 256GB",
      "Battery": "5500 mAh (100W Fast Charge)"
    },
    features: ["100W SuperVOOC Fast Charging", "Sony 50MP OIS Camera", "Aqua Touch Display", "OxygenOS 14"]
  },
  {
    id: 2,
    name: "Samsung Galaxy M35 5G",
    category: "Smartphones",
    price: 19999,
    rating: 4.2,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 8,
    qualityTier: "Medium",
    description: "Reliable monster battery smartphone with Exynos 1380 processor and Super AMOLED 120Hz display.",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "6.6\" Super AMOLED 120Hz",
      "Processor": "Exynos 1380",
      "RAM & Storage": "6GB + 128GB",
      "Battery": "6000 mAh"
    },
    features: ["6000 mAh Long Battery", "Corning Gorilla Glass Victus+", "Knox Security", "Vapour Cooling Chamber"]
  },
  {
    id: 3,
    name: "Apple iPhone 15",
    category: "Smartphones",
    price: 69900,
    rating: 4.8,
    availability: "In Stock",
    deliveryDays: 1,
    quality: 10,
    qualityTier: "High",
    description: "Premium smartphone featuring Dynamic Island, 48MP main camera with 2x Telephoto, and A16 Bionic chip.",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "6.1\" Super Retina XDR OLED",
      "Processor": "A16 Bionic chip",
      "RAM & Storage": "6GB + 128GB",
      "Battery": "3349 mAh (USB-C)"
    },
    features: ["Dynamic Island", "48MP Advanced Dual Camera", "USB-C Connector", "Ceramic Shield Front"]
  },
  {
    id: 4,
    name: "Realme Narzo 70 Pro 5G",
    category: "Smartphones",
    price: 17499,
    rating: 4.1,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 7,
    qualityTier: "Medium",
    description: "Value-for-money 5G smartphone equipped with Sony IMX890 flagship camera sensor and Air Gestures.",
    brand: "Realme",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "6.67\" Horizon OLED 120Hz",
      "Processor": "MediaTek Dimensity 7050",
      "RAM & Storage": "8GB + 128GB",
      "Battery": "5000 mAh (67W Charge)"
    },
    features: ["Air Gesture Controls", "Flagship Sony IMX890 OIS", "Glass Design", "67W Fast Charging"]
  },
  {
    id: 5,
    name: "Redmi 13C 5G",
    category: "Smartphones",
    price: 10499,
    rating: 3.9,
    availability: "In Stock",
    deliveryDays: 4,
    quality: 6,
    qualityTier: "Low",
    description: "Affordable entry-level 5G smartphone with 50MP AI dual camera and Star Trail back design.",
    brand: "Redmi",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "6.74\" 90Hz Display",
      "Processor": "MediaTek Dimensity 6100+",
      "RAM & Storage": "4GB + 128GB",
      "Battery": "5000 mAh (18W)"
    },
    features: ["Entry 5G Connectivity", "50MP AI Camera", "Side Fingerprint", "Corning Gorilla Glass"]
  },
  {
    id: 6,
    name: "Google Pixel 8a",
    category: "Smartphones",
    price: 49999,
    rating: 4.6,
    availability: "Out of Stock",
    deliveryDays: 5,
    quality: 9,
    qualityTier: "High",
    description: "Google Tensor G3 powered device with state-of-the-art computational photography and 7 years of OS updates.",
    brand: "Google",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "6.1\" Actua 120Hz OLED",
      "Processor": "Google Tensor G3 + Titan M2",
      "RAM & Storage": "8GB + 128GB",
      "Battery": "4492 mAh"
    },
    features: ["Best Take & Magic Editor", "Audio Magic Eraser", "IP67 Water Resistance", "7 Years Support"]
  },

  // Laptops (6)
  {
    id: 7,
    name: "Lenovo IdeaPad Slim 3 15",
    category: "Laptops",
    price: 38990,
    rating: 4.2,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 8,
    qualityTier: "Medium",
    description: "Slim and portable everyday laptop powered by 12th Gen Intel Core i3 with military grade durability.",
    brand: "Lenovo",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Processor": "Intel Core i3-1215U (6 Cores)",
      "RAM & Storage": "8GB DDR4 + 512GB SSD",
      "Display": "15.6\" FHD Anti-glare",
      "Weight": "1.63 kg"
    },
    features: ["Rapid Charge (2hr in 15min)", "Physical Privacy Shutter", "Dolby Audio", "Military Grade MIL-STD 810H"]
  },
  {
    id: 8,
    name: "ASUS Vivobook 16X",
    category: "Laptops",
    price: 54990,
    rating: 4.4,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 9,
    qualityTier: "High",
    description: "Productivity workhorse featuring AMD Ryzen 5 5600H processor with 16:10 large display and backlit keyboard.",
    brand: "ASUS",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Processor": "AMD Ryzen 5 5600H",
      "RAM & Storage": "16GB DDR4 + 512GB NVMe SSD",
      "Display": "16.0\" WUXGA (1920 x 1200)",
      "Weight": "1.80 kg"
    },
    features: ["180-degree Lay-flat Hinge", "Antibacterial Guard", "Fingerprint Sensor", "ErgoSense Keyboard"]
  },
  {
    id: 9,
    name: "Apple MacBook Air M2",
    category: "Laptops",
    price: 89900,
    rating: 4.9,
    availability: "In Stock",
    deliveryDays: 1,
    quality: 10,
    qualityTier: "High",
    description: "Strikingly thin design with Apple M2 chip, 18 hours of battery life, and vivid Liquid Retina display.",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Processor": "Apple M2 8-core CPU / 8-core GPU",
      "RAM & Storage": "8GB Unified + 256GB SSD",
      "Display": "13.6\" Liquid Retina with True Tone",
      "Battery": "Up to 18 hours"
    },
    features: ["Fanless Silent Operation", "MagSafe 3 Charging", "1080p FaceTime HD", "Four-Speaker Sound System"]
  },
  {
    id: 10,
    name: "HP 15s Ryzen 3",
    category: "Laptops",
    price: 29990,
    rating: 4.0,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 7,
    qualityTier: "Medium",
    description: "Budget laptop tailored for students and basic programming with micro-edge anti-glare display.",
    brand: "HP",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Processor": "AMD Ryzen 3 5300U",
      "RAM & Storage": "8GB DDR4 + 512GB SSD",
      "Display": "15.6\" FHD Micro-edge",
      "Weight": "1.69 kg"
    },
    features: ["HP Fast Charge", "Dual Speakers", "Full-size Keyboard with Numpad", "Windows 11 + Office 2021"]
  },
  {
    id: 11,
    name: "Acer Aspire Lite 11th Gen",
    category: "Laptops",
    price: 24990,
    rating: 3.8,
    availability: "In Stock",
    deliveryDays: 4,
    quality: 6,
    qualityTier: "Low",
    description: "Super affordable entry-level computing device with metal body cover and Type-C connectivity.",
    brand: "Acer",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Processor": "Intel Core i3 11th Gen",
      "RAM & Storage": "8GB RAM + 256GB SSD",
      "Display": "15.6\" Full HD",
      "Weight": "1.59 kg"
    },
    features: ["Steel Gray Premium Finish", "Type-C Port", "Reversible USB", "Numeric Keypad"]
  },
  {
    id: 12,
    name: "Dell G15 Gaming Laptop",
    category: "Laptops",
    price: 68990,
    rating: 4.5,
    availability: "Out of Stock",
    deliveryDays: 6,
    quality: 9,
    qualityTier: "High",
    description: "Heavy-duty gaming laptop with 13th Gen Intel Core i5 and NVIDIA GeForce RTX 3050 graphics card.",
    brand: "Dell",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Processor": "Intel Core i5-13450HX",
      "Graphics": "NVIDIA RTX 3050 6GB GDDR6",
      "RAM & Storage": "16GB DDR5 + 1TB SSD",
      "Display": "15.6\" FHD 120Hz"
    },
    features: ["Alienware-inspired Thermal Design", "Game Shift Macro Key", "RGB 4-Zone Keyboard", "Nahimic 3D Audio"]
  },

  // Headphones (5)
  {
    id: 13,
    name: "Sony WH-1000XM5 Wireless ANC",
    category: "Headphones",
    price: 28990,
    rating: 4.8,
    availability: "In Stock",
    deliveryDays: 1,
    quality: 10,
    qualityTier: "High",
    description: "Industry-leading noise cancellation with 2 processors, 8 microphones, and ultra-comfortable soft leather.",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Battery Life": "30 Hours ANC On",
      "ANC": "Integrated Processor V1 + QN1",
      "Connectivity": "Bluetooth 5.2, LDAC, Multi-point",
      "Weight": "250g"
    },
    features: ["Auto NC Optimizer", "Speak-to-Chat", "Multipoint Connection", "3 min quick charge for 3 hrs"]
  },
  {
    id: 14,
    name: "boAt Rockerz 551ANC",
    category: "Headphones",
    price: 2799,
    rating: 4.1,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 7,
    qualityTier: "Medium",
    description: "Hybrid Active Noise Cancellation wireless over-ear headphones with up to 100 hours of continuous playback.",
    brand: "boAt",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Battery Life": "Up to 100 Hours",
      "ANC": "Hybrid Active Noise Cancellation up to 35dB",
      "Drivers": "40mm Dynamic Drivers",
      "Charging": "ASAP Charge Type-C"
    },
    features: ["Hybrid ANC 35dB", "Ambient Sound Mode", "100-Hour Playback", "Dual EQ Modes"]
  },
  {
    id: 15,
    name: "JBL Tune 760NC",
    category: "Headphones",
    price: 4999,
    rating: 4.3,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 8,
    qualityTier: "Medium",
    description: "Over-ear wireless headphones with active noise cancellation and iconic JBL Pure Bass Sound.",
    brand: "JBL",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Battery Life": "35 Hours with ANC",
      "Drivers": "40mm Sound Drivers",
      "Bluetooth": "5.0 with Multi-point",
      "Weight": "220g Lightweight"
    },
    features: ["JBL Pure Bass Sound", "Active Noise Cancelling", "Hands-free Calls & Voice Assistant", "Foldable Design"]
  },
  {
    id: 16,
    name: "OnePlus Bullets Wireless Z2",
    category: "Headphones",
    price: 1699,
    rating: 4.2,
    availability: "In Stock",
    deliveryDays: 1,
    quality: 7,
    qualityTier: "Medium",
    description: "Magnetic neckband Bluetooth earphones with bombastic 12.4mm bass drivers and IP55 water resistance.",
    brand: "OnePlus",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Battery Life": "30 Hours Playback",
      "Driver": "12.4mm Bass Boost",
      "Waterproof": "IP55 Water & Sweat",
      "Charging": "10 min for 20 hours"
    },
    features: ["Super Fast Warp Charge", "Anti-distortion Audio Technology", "Magnetic Snap Pause", "Lightweight Fit"]
  },
  {
    id: 17,
    name: "Noise Buds VS104 Truly Wireless",
    category: "Headphones",
    price: 999,
    rating: 3.8,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 5,
    qualityTier: "Low",
    description: "Ultra budget TWS earbuds with 45 hours total playtime, 13mm speaker driver, and Instacharge technology.",
    brand: "Noise",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Battery Life": "45 Hours Total",
      "Latency": "Low Latency Gaming Mode",
      "Water Resistance": "IPX5",
      "Driver": "13mm Dynamic"
    },
    features: ["Instacharge (10 min = 200 min)", "HyperSync Tech", "Quad Mic ENC", "Pocket Sized Case"]
  },

  // Smart Watches (5)
  {
    id: 18,
    name: "Samsung Galaxy Watch6",
    category: "Smart Watches",
    price: 19999,
    rating: 4.6,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 9,
    qualityTier: "High",
    description: "Advanced Wear OS smartwatch with personalized sleep coaching, ECG, Blood Pressure monitoring, and Sapphire Crystal.",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "1.3\" Super AMOLED Sapphire",
      "OS": "Wear OS Powered by Samsung",
      "Sensors": "BioActive (HR, ECG, BIA)",
      "Durability": "5ATM + IP68 + MIL-STD-810H"
    },
    features: ["Body Composition Analysis (BIA)", "Advanced Sleep Tracker", "Contactless Samsung Pay", "Rotary Bezel"]
  },
  {
    id: 19,
    name: "Apple Watch SE (2nd Gen)",
    category: "Smart Watches",
    price: 27900,
    rating: 4.7,
    availability: "In Stock",
    deliveryDays: 1,
    quality: 9,
    qualityTier: "High",
    description: "Essential health and fitness tracking, Crash Detection, Heart Rate notifications, and seamless iOS integration.",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "Retina LTPO OLED Display",
      "Chip": "S8 SiP with 64-bit dual-core",
      "Water Resistance": "50m Swimproof",
      "Sensors": "Optical Heart Sensor, Compass, Altimeter"
    },
    features: ["Crash Detection & Fall Detection", "Fitness Workout Rings", "Emergency SOS", "Sleep Stages Tracking"]
  },
  {
    id: 20,
    name: "Amazfit GTR 4",
    category: "Smart Watches",
    price: 14999,
    rating: 4.4,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 8,
    qualityTier: "High",
    description: "Classic design smartwatch with dual-band circularly polarized GPS antenna and 14-day ultra-long battery life.",
    brand: "Amazfit",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Battery Life": "14 Days Typical Use",
      "Display": "1.43\" HD AMOLED Anti-glare",
      "GPS": "Dual-Band 6 Satellite Positioning",
      "Sports Modes": "150+ Sports Modes"
    },
    features: ["14 Days Battery", "Route Import & Navigation", "Bluetooth Phone Calls", "Zepp OS 2.0 Ecosystem"]
  },
  {
    id: 21,
    name: "Fire-Boltt Phoenix Pro",
    category: "Smart Watches",
    price: 1499,
    rating: 4.0,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 6,
    qualityTier: "Low",
    description: "Affordable luxury metal body smartwatch with Bluetooth calling, AI voice assistant, and 120+ sports modes.",
    brand: "Fire-Boltt",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "1.39\" Round TFT Display",
      "Body": "Full Metal Casing",
      "Battery": "7 Days Standby",
      "Calling": "Inbuilt Speaker & Microphone"
    },
    features: ["Bluetooth Calling", "AI Voice Assistant (Siri/Google)", "SpO2 & Heart Rate", "Inbuilt Games"]
  },
  {
    id: 22,
    name: "Fastrack Limitless FS1 Pro",
    category: "Smart Watches",
    price: 2495,
    rating: 4.1,
    availability: "Out of Stock",
    deliveryDays: 4,
    quality: 7,
    qualityTier: "Medium",
    description: "Fashion smartwatch with curved Super AMOLED display, SingleSync Bluetooth calling, and NitroFast charging.",
    brand: "Fastrack",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Display": "1.96\" Super AMOLED Curved",
      "Charging": "NitroFast (10 min = 1 day)",
      "Battery": "Up to 7 Days",
      "Watchfaces": "150+ Cloud Watchfaces"
    },
    features: ["Curved AMOLED Screen", "SingleSync BT Calling", "Advanced ATS Chipset", "Stress & Mood Monitor"]
  },

  // Shoes (5)
  {
    id: 23,
    name: "Nike Pegasus 40 Running Shoes",
    category: "Shoes",
    price: 10495,
    rating: 4.7,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 10,
    qualityTier: "High",
    description: "Legendary springy running shoes featuring dual Zoom Air units and React foam midsole for long-distance comfort.",
    brand: "Nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Midsole": "Nike React Foam + Dual Zoom Air",
      "Upper": "Engineered Single Layer Mesh",
      "Weight": "288g (Men's UK 8)",
      "Terrain": "Road Running & Everyday Marathon"
    },
    features: ["Responsive React Cushioning", "Waffle-inspired Outsole", "Neutral Support", "Padded Collar & Tongue"]
  },
  {
    id: 24,
    name: "Adidas Ultraboost Light",
    category: "Shoes",
    price: 14999,
    rating: 4.8,
    availability: "In Stock",
    deliveryDays: 1,
    quality: 10,
    qualityTier: "High",
    description: "Lightest Ultraboost ever made with BOOST cushioning capsules and Primeknit+ breathable textile upper.",
    brand: "Adidas",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Midsole": "Light BOOST Material",
      "Upper": "Adidas Primeknit+ textile",
      "Outsole": "Continental Natural Rubber",
      "Drop": "10mm"
    },
    features: ["30% Lighter BOOST Foam", "Linear Energy Push System", "Continental Better Rubber Outsole", "Recycled Parley Material"]
  },
  {
    id: 25,
    name: "Puma Deviate Nitro 2",
    category: "Shoes",
    price: 7999,
    rating: 4.4,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 8,
    qualityTier: "High",
    description: "Carbon plate propulsive racing and training shoes with premium NITRO Elite foam for maximum propulsion.",
    brand: "Puma",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Plate": "PWRPLATE Carbon Composite",
      "Foam": "NITRO Elite Nitrogen-infused",
      "Grip": "PUMAGRIP all-surface rubber",
      "Fit": "Form-fitting race upper"
    },
    features: ["Carbon Plate Propulsion", "Nitrogen Infused Cushion", "Reflective Branding", "Breathable Mesh"]
  },
  {
    id: 26,
    name: "Campus North Running Shoes",
    category: "Shoes",
    price: 1399,
    rating: 4.0,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 6,
    qualityTier: "Low",
    description: "Pocket-friendly sports and gym shoes with knitted mesh upper and Springy Response foam sole.",
    brand: "Campus",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Sole": "Phylon + TPR Anti-skid",
      "Upper": "Breathable Knitted Mesh",
      "Closure": "Lace-up",
      "Weight": "310g"
    },
    features: ["Memory Tech Insole", "Shock Absorption Sole", "Washable Mesh", "Everyday Gym Friendly"]
  },
  {
    id: 27,
    name: "Asian Superfly-01 Sneakers",
    category: "Shoes",
    price: 899,
    rating: 3.8,
    availability: "In Stock",
    deliveryDays: 4,
    quality: 5,
    qualityTier: "Low",
    description: "Ultra-affordable casual walking sneakers with lightweight EVA sole and padded sockliner.",
    brand: "Asian",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Sole": "Ultra-light EVA",
      "Upper": "Synthetic & Mesh",
      "Weight": "240g",
      "Color": "Slate Black / Cyan"
    },
    features: ["Ultra-Lightweight EVA", "Orthopaedic Memory Foam", "Anti-sweat Insole", "Flexible Grooves"]
  },

  // Cameras (5)
  {
    id: 28,
    name: "Sony Alpha ZV-E10 Mirrorless",
    category: "Cameras",
    price: 61490,
    rating: 4.6,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 9,
    qualityTier: "High",
    description: "Large 24.2MP APS-C sensor camera engineered for content creators with vari-angle screen and 4K HDR.",
    brand: "Sony",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Sensor": "24.2 MP Exmor APS-C CMOS",
      "Video": "4K 30p HDR (no crop)",
      "Autofocus": "425 Phase Detection Points",
      "Audio": "Directional 3-Capsule Mic + Windscreen"
    },
    features: ["Product Showcase Setting", "Background Defocus Bokeh Button", "Real-time Eye AF (Human & Animal)", "Clean HDMI Out"]
  },
  {
    id: 29,
    name: "Canon EOS R50 Content Creator Kit",
    category: "Cameras",
    price: 68995,
    rating: 4.7,
    availability: "In Stock",
    deliveryDays: 3,
    quality: 9,
    qualityTier: "High",
    description: "Compact mirrorless camera with Dual Pixel CMOS AF II, 6K oversampled 4K 30p video, and electronic viewfinder.",
    brand: "Canon",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Sensor": "24.2 MP APS-C Dual Pixel",
      "Processor": "DIGIC X Image Processor",
      "Shooting Speed": "Up to 15 fps electronic",
      "Viewfinder": "OLED Color EVF"
    },
    features: ["Dual Pixel CMOS AF II with Subject Detect", "6K Oversampled 4K Video", "Close-up Demos Mode", "Multi-Function Shoe"]
  },
  {
    id: 30,
    name: "Fujifilm Instax Mini 12 Instant Camera",
    category: "Cameras",
    price: 6499,
    rating: 4.5,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 8,
    qualityTier: "Medium",
    description: "Playful instant film camera with automatic exposure, close-up selfie mirror, and credit card sized physical prints.",
    brand: "Fujifilm",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Film": "Fujifilm Instant Color Film 'instax mini'",
      "Lens": "2 components, 2 elements, f = 60mm",
      "Power": "Two AA-size alkaline batteries",
      "Print Speed": "Approx. 90 seconds"
    },
    features: ["Automatic Exposure Adjustment", "Twist-to-turn On Close-up Mode", "Built-in Selfie Mirror", "Vibrant Pastel Colors"]
  },
  {
    id: 31,
    name: "GoPro HERO12 Black Action Camera",
    category: "Cameras",
    price: 37990,
    rating: 4.6,
    availability: "In Stock",
    deliveryDays: 2,
    quality: 10,
    qualityTier: "High",
    description: "Rugged waterproof action camera with 5.3K60 video, HDR, Emmy-winning HyperSmooth 6.0 stabilization.",
    brand: "GoPro",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Video": "5.3K 60fps / 4K 120fps / 2.7K 240fps",
      "Photo": "27MP Photos & 24.7MP Frame Grabs",
      "Stabilization": "HyperSmooth 6.0 + 360° Horizon Lock",
      "Waterproof": "Up to 10m (33ft) without housing"
    },
    features: ["HyperSmooth 6.0 Stabilization", "Dual LCD Displays", "Bluetooth Audio Support (AirPods)", "Enduro Extended Battery"]
  },
  {
    id: 32,
    name: "SJCAM C100+ Thumb Action Cam",
    category: "Cameras",
    price: 4999,
    rating: 3.9,
    availability: "In Stock",
    deliveryDays: 4,
    quality: 6,
    qualityTier: "Low",
    description: "Ultra-compact miniature magnetic body camera with 2K video recording and 30m waterproof casing.",
    brand: "SJCAM",
    image: "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=600&q=80",
    specs: {
      "Resolution": "2K 30fps / 1080p 60fps",
      "Weight": "42g Featherlight",
      "Mount": "Magnetic Back Clip Included",
      "Battery": "130 min recording"
    },
    features: ["Magnetic Wearable Body", "Waterproof up to 30 Meters", "Pocket Action Cam", "WiFi App Live Stream"]
  }
];
