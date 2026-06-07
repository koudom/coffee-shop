export interface MenuCategory {
  id: string;
  label: string;
}

export interface MenuItem {
  id: number;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const categories: MenuCategory[] = [
  { id: "coffee", label: "Coffee" },
  { id: "tea", label: "Tea" },
  { id: "cold", label: "Cold Drinks" },
  { id: "pastry", label: "Pastries" },
  { id: "food", label: "Food" },
];

export const menuItems: MenuItem[] = [
  // --- COFFEE ---
  {
    id: 1,
    category: "coffee",
    name: "Flat White",
    price: 4.5,
    description:
      "Double ristretto with silky steamed milk. A Melbourne classic.",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400",
  },
  {
    id: 2,
    category: "coffee",
    name: "Cortado",
    price: 4.0,
    description: "Equal parts espresso and warm milk. Sharp and balanced.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
  },
  {
    id: 3,
    category: "coffee",
    name: "Long Black",
    price: 3.8,
    description: "Hot water over a double espresso. Bold and clean.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400",
  },
  {
    id: 4,
    category: "coffee",
    name: "Cappuccino",
    price: 4.2,
    description: "Espresso with thick microfoam and a dusting of cocoa.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400",
  },
  {
    id: 5,
    category: "coffee",
    name: "Pour Over",
    price: 5.5,
    description:
      "Single origin, filter brewed to order. Ask the barista what's on.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
  },
  {
    id: 6,
    category: "coffee",
    name: "Latte",
    price: 4.5,
    description: "Espresso with velvety steamed milk. Approachable and smooth.",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400",
  },
  {
    id: 18,
    category: "coffee",
    name: "Affogato",
    price: 6.0,
    description:
      "A scoop of vanilla gelato drowned in a hot shot of espresso. Dessert in a cup.",
    image: "https://images.unsplash.com/photo-1638543284847-3a6bed3e1689?w=400",
  },
  {
    id: 19,
    category: "coffee",
    name: "Espresso",
    price: 3.0,
    description:
      "Single origin double shot. Short, strong, and the foundation of everything we do.",
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400",
  },
  // --- TEA ---
  {
    id: 7,
    category: "tea",
    name: "Matcha Latte",
    price: 5.0,
    description: "Ceremonial grade matcha whisked with steamed oat milk.",
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400",
  },
  {
    id: 8,
    category: "tea",
    name: "Chai Latte",
    price: 4.8,
    description: "House-spiced masala chai with your choice of milk.",
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400",
  },
  {
    id: 9,
    category: "tea",
    name: "Earl Grey",
    price: 3.5,
    description:
      "Bergamot-scented loose leaf, steeped 3 minutes. Bright and fragrant.",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400",
  },
  {
    id: 20,
    category: "tea",
    name: "Jasmine Green",
    price: 3.8,
    description:
      "Fragrant jasmine-infused green tea. Light, floral, and calming.",
    image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400",
  },
  {
    id: 21,
    category: "tea",
    name: "Turmeric Latte",
    price: 5.2,
    description:
      "Golden milk with turmeric, ginger, cinnamon, and a touch of honey.",
    image: "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=400",
  },
  // --- COLD ---
  {
    id: 10,
    category: "cold",
    name: "Cold Brew",
    price: 5.0,
    description:
      "18-hour cold-steeped concentrate. Smooth, low-acid, naturally sweet.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
  },
  {
    id: 11,
    category: "cold",
    name: "Iced Matcha",
    price: 5.5,
    description:
      "Matcha shaken over ice with oat milk. Bright green and refreshing.",
    image: "https://images.unsplash.com/photo-1575487426366-079595af2247?w=400",
  },
  {
    id: 12,
    category: "cold",
    name: "Sparkling Citrus",
    price: 4.0,
    description:
      "Sparkling water with yuzu syrup and fresh orange. Non-coffee.",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400",
  },
  {
    id: 22,
    category: "cold",
    name: "Iced Latte",
    price: 4.8,
    description:
      "Espresso poured over chilled oat milk and ice. Crisp and refreshing.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
  },
  {
    id: 23,
    category: "cold",
    name: "Berry Smoothie",
    price: 6.5,
    description:
      "Mixed berries, banana, yoghurt, and a splash of honey. No caffeine.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400",
  },
  // --- PASTRIES ---
  {
    id: 13,
    category: "pastry",
    name: "Almond Croissant",
    price: 4.5,
    description:
      "Twice-baked with almond cream and flaked almonds. Buttery and rich.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
  },
  {
    id: 14,
    category: "pastry",
    name: "Cardamom Knot",
    price: 3.8,
    description: "Soft Swedish-style bun spiced with cardamom and brown sugar.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
  },
  {
    id: 15,
    category: "pastry",
    name: "Banana Bread",
    price: 4.0,
    description: "Dense, moist slice with walnuts. Made fresh each morning.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400",
  },
  {
    id: 24,
    category: "pastry",
    name: "Cinnamon Scroll",
    price: 4.2,
    description:
      "Soft yeasted dough swirled with cinnamon sugar and topped with cream cheese glaze.",
    image: "https://images.unsplash.com/photo-1511919886926-f9d2fc7e7f0b?w=400",
  },
  {
    id: 25,
    category: "pastry",
    name: "Chocolate Brownie",
    price: 4.5,
    description:
      "Fudgy, dense chocolate brownie with a crackly top. Gluten-free option available.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
  },
  // --- FOOD ---
  {
    id: 16,
    category: "food",
    name: "Avocado Toast",
    price: 12.0,
    description:
      "Sourdough with smashed avo, chilli flakes, lemon, and micro herbs.",
    image: "https://images.unsplash.com/photo-1604467715878-83e57e8bc129?w=400",
  },
  {
    id: 17,
    category: "food",
    name: "Granola Bowl",
    price: 10.0,
    description:
      "House granola with seasonal fruit, coconut yoghurt, and honey.",
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400",
  },
  {
    id: 26,
    category: "food",
    name: "Breakfast Wrap",
    price: 11.0,
    description:
      "Scrambled eggs, cheddar, roasted tomato, and spinach in a warm tortilla.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400",
  },
  {
    id: 27,
    category: "food",
    name: "Smoked Salmon Bagel",
    price: 13.5,
    description:
      "Toasted everything bagel with smoked salmon, cream cheese, capers, and dill.",
    image: "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=400",
  },
];
