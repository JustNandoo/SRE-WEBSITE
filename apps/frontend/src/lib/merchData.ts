export interface MerchItem {
  id: string | number;
  name: string;
  category: string;
  price: string;
  image: string;
  tag: string;
  link: string;
}

export const merchItems: MerchItem[] = [];