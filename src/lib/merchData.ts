export interface MerchItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  tag: string;
}

export const merchItems: MerchItem[] = [
  {
    id: 1,
    name: "SRE Signature Hoodie v.01",
    category: "Apparel",
    price: "IDR 250.000",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Eco Canvas Tote",
    category: "Accessories",
    price: "IDR 85.000",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1888&auto=format&fit=crop",
    tag: "Sustainable",
  },
  {
    id: 3,
    name: "Hydro Flask Series",
    category: "Essentials",
    price: "IDR 120.000",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop",
    tag: "Limited",
  },
  {
    id: 4,
    name: "Core Lanyard Black",
    category: "Accessories",
    price: "IDR 45.000",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
    tag: "Essential",
  },
  {
    id: 5,
    name: "Oversized Tee 'Future'",
    category: "Apparel",
    price: "IDR 135.000",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop",
    tag: "New Drop",
  },
  {
    id: 6,
    name: "Energy Cap",
    category: "Accessories",
    price: "IDR 75.000",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1936&auto=format&fit=crop",
    tag: "Restock",
  },
];