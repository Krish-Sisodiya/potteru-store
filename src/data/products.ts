export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  amazonLink: string;
  badge?: string;
  category: 'bowl' | 'cup' | 'set' | 'serving';
}

export const PRODUCTS: Product[] = [
  // 🥣 BOWLS (8 items)
  {
    id: 1,
    title: "Rustic Clay Breakfast Bowl",
    description: "Hand-thrown terracotta bowl, perfect for cereals, oats & salads. Food-safe glazed finish.",
    price: "₹499",
    image: "/assets/b2.jpeg",
    amazonLink: "https://www.amazon.in/s?k=handmade+clay+bowl",
    badge: "Bestseller",
    category: "bowl"
  },
  {
    id: 2,
    title: "Earthy Minimalist Bowl",
    description: "Smooth matte finish, microwave safe. Adds rustic charm to your dining table.",
    price: "₹649",
    image: "/assets/b5.jpeg",
    amazonLink: "https://www.amazon.in/s?k=ceramic+bowl+handmade",
    category: "bowl"
  },
  {
    id: 3,
    title: "Artisan Speckled Bowl",
    description: "Unique speckled glaze, each piece one-of-a-kind. Dishwasher safe.",
    price: "₹799",
    image: "/assets/b6.jpeg",
    amazonLink: "https://www.amazon.in/s?k=artisan+ceramic+bowl",
    badge: "New",
    category: "bowl"
  },
  {
    id: 4,
    title: "Deep Serving Clay Bowl",
    description: "Large capacity for curries, soups & family meals. Handcrafted with love.",
    price: "₹899",
    image: "/assets/b7.jpeg",
    amazonLink: "https://www.amazon.in/s?k=large+handmade+bowl",
    category: "bowl"
  },
  {
    id: 5,
    title: "Terracotta Rice Bowl Set",
    description: "Set of 2 traditional terracotta bowls. Perfect for Indian meals.",
    price: "₹1,099",
    image: "/assets/b8.jpeg",
    amazonLink: "https://www.amazon.in/s?k=terracotta+bowl+set",
    category: "bowl"
  },
  {
    id: 6,
    title: "Glazed Blue Accent Bowl",
    description: "Stunning blue glaze with natural clay rim. Decorative & functional.",
    price: "₹749",
    image: "/assets/b9.jpeg",
    amazonLink: "https://www.amazon.in/s?k=blue+ceramic+bowl",
    badge: "Limited",
    category: "bowl"
  },
  {
    id: 7,
    title: "Small Snack Clay Bowl",
    description: "Compact size for chutneys, nuts & snacks. Easy to stack & store.",
    price: "₹299",
    image: "/assets/b5.jpeg",
    amazonLink: "https://www.amazon.in/s?k=small+clay+bowl",
    category: "bowl"
  },
  {
    id: 8,
    title: "Textured Handmade Bowl",
    description: "Finger-textured exterior, smooth interior. A true artisan piece.",
    price: "₹699",
    image: "/assets/b4.jpeg",
    amazonLink: "https://www.amazon.in/s?k=textured+ceramic+bowl",
    category: "bowl"
  },

  // ☕ CUPS & MUGS (7 items)
  {
    id: 9,
    title: "Minimalist Ceramic Mug",
    description: "Ergonomic handle, perfect weight. Your new favorite coffee companion.",
    price: "₹349",
    image: "/assets/b3.jpeg",
    amazonLink: "https://www.amazon.in/s?k=handmade+ceramic+mug",
    badge: "Bestseller",
    category: "cup"
  },
  {
    id: 10,
    title: "Earthy Clay Tea Cup",
    description: "Traditional clay cup for chai lovers. Enhances tea flavor naturally.",
    price: "₹199",
    image: "/assets/b2.jpeg",
    amazonLink: "https://www.amazon.in/s?k=clay+tea+cup",
    category: "cup"
  },
  {
    id: 11,
    title: "Artisan Speckled Mug",
    description: "Unique speckled glaze, comfortable grip. Microwave & dishwasher safe.",
    price: "₹449",
    image: "/assets/b1.jpeg",
    amazonLink: "https://www.amazon.in/s?k=speckled+ceramic+mug",
    category: "cup"
  },
  {
    id: 12,
    title: "Large Morning Coffee Mug",
    description: "Generous 350ml capacity. Perfect for lazy weekend mornings.",
    price: "₹549",
    image: "/assets/b10.jpeg",
    amazonLink: "https://www.amazon.in/s?k=large+ceramic+mug",
    badge: "New",
    category: "cup"
  },
  {
    id: 13,
    title: "Terracotta Kulhad Set",
    description: "Set of 4 traditional kulhads. Eco-friendly & authentic taste.",
    price: "₹399",
    image: "/assets/b6.jpeg",
    amazonLink: "https://www.amazon.in/s?k=terracotta+kulhad+set",
    category: "cup"
  },
  {
    id: 14,
    title: "Glazed Blue Coffee Cup",
    description: "Stunning blue interior, natural clay exterior. A conversation starter.",
    price: "₹479",
    image: "/assets/b4.jpeg",
    amazonLink: "https://www.amazon.in/s?k=blue+ceramic+cup",
    category: "cup"
  },
  {
    id: 15,
    title: "Hand-Thrown Espresso Cup",
    description: "Compact 80ml size for perfect espresso. Artisan crafted.",
    price: "₹279",
    image: "/assets/b2.jpeg",
    amazonLink: "https://www.amazon.in/s?k=espresso+cup+handmade",
    category: "cup"
  },

  // 🎁 SETS (3 items)
  {
    id: 16,
    title: "Breakfast Bowl & Mug Set",
    description: "Matching bowl + mug set. Perfect for gifting or personal use.",
    price: "₹899",
    image: "/assets/b7.jpeg",
    amazonLink: "https://www.amazon.in/s?k=ceramic+bowl+mug+set",
    badge: "Gift Pick",
    category: "set"
  },
  {
    id: 17,
    title: "Family Dining Set (4 Bowls)",
    description: "Set of 4 matching bowls. Ideal for family meals & gatherings.",
    price: "₹1,799",
    image: "/assets/b8.jpeg",
    amazonLink: "https://www.amazon.in/s?k=ceramic+bowl+set+of+4",
    category: "set"
  },
  {
    id: 18,
    title: "Tea Time Duo (2 Cups)",
    description: "Set of 2 handcrafted tea cups. Perfect for couples or best friends.",
    price: "₹649",
image: "/assets/b9.jpeg",
    amazonLink: "https://www.amazon.in/s?k=ceramic+tea+cup+set+of+2",
    category: "set"
  },

  // 🍽️ SERVING (2 items)
  {
    id: 19,
    title: "Large Serving Platter Bowl",
    description: "Oval shaped, perfect for salads, fruits & party servings. Statement piece.",
    price: "₹1,499",
    image: "/assets/b10.jpeg",
    amazonLink: "https://www.amazon.in/s?k=large+serving+bowl+ceramic",
    badge: "Premium",
    category: "serving"
  },
  {
    id: 20,
    title: "Rustic Bread Serving Bowl",
    description: "Wide & shallow design for breads, appetizers & snacks. Handcrafted.",
    price: "₹999",
    image: "/assets/b6.jpeg",
    amazonLink: "https://www.amazon.in/s?k=ceramic+bread+bowl",
    category: "serving"
  },
  // Bonus: 21st product for good luck 🎉
  {
    id: 21,
    title: "Artisan Collection Sampler",
    description: "Mini set: 1 bowl + 1 cup + 1 small dish. Try our craft before committing!",
    price: "₹799",
    image: "/assets/b8.jpeg",
    amazonLink: "https://www.amazon.in/s?k=ceramic+pottery+gift+set",
    badge: "Starter Kit",
    category: "set"
  }
];