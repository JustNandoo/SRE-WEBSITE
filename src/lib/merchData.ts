export interface MerchItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  tag: string;
  link: string;
}

export const merchItems: MerchItem[] = [
  {
    id: 1,
    name: "T-Shirt Econysm",
    category: "Apparel",
    price: "IDR 65.000",
    image: "https://lh3.googleusercontent.com/d/1N03qfs9j6dwoOw1Vszt1JAMHrIMxq4Ro=w1000",
    tag: "Best Recommended",
    link: "https://www.instagram.com/greenspark.pens/"
  },
  {
    id: 2,
    name: "SRE Pin Series",
    category: "Accessories",
    price: "IDR 5.000/ITEM",
    image: "https://lh3.googleusercontent.com/d/1UdnZwAwV65zSilUpZPSLbSU3nQ9IUSEo=w1000",
    tag: "Limited",
    link: "https://www.instagram.com/greenspark.pens/"
  },
  {
    id: 3,
    name: "SRE Keychain Series",
    category: "Accessories",
    price: "IDR 10.000/ITEM",
    image: "https://lh3.googleusercontent.com/d/1xxeR6rcMe-_laslTDLbaFGuTvHjmz8SH=w1000",
    tag: "Limited",
    link: "https://www.instagram.com/greenspark.pens/"
  },
];