import logo from "./logo.svg";

export const LOGO = logo;

export const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

export const currency = "$";

export type productType = {
  quantity?: number;
  size?: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
};
