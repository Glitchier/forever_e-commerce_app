import React from "react";
import img0 from "../assets/frontend_assets/slide0.jpg";
import img1 from "../assets/frontend_assets/slide1.jpg";
import img2 from "../assets/frontend_assets/slide2.jpg";
import img3 from "../assets/frontend_assets/slide3.jpg";
import { products } from "./frontend_assets/assets";
import logoImg from "./logo.svg";
import { NavigateFunction } from "react-router-dom";
import caro0 from "../assets/frontend_assets/slide0.jpg";
import caro1 from "../assets/frontend_assets/slide1.jpg";
import caro2 from "../assets/frontend_assets/slide2.jpg";
import caro3 from "../assets/frontend_assets/slide3.jpg";
import { CartType } from "../context/ShopContext";

export const Logo = logoImg;

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

export type slideShowProps = {
  text: string[];
  img: string[];
};

export const carousel = [
  {
    img: caro0,
    title: "our bestsellers",
  },
  {
    img: caro1,
    title: "for mens",
  },
  {
    img: caro2,
    title: "for womens",
  },
  {
    img: caro3,
    title: "kids section",
  },
];

export const slideShow: slideShowProps = {
  text: ["our bestsellers", "for mens", "for womens", "kids section"],
  img: [img0, img1, img2, img3],
};

export type ContextType = {
  currency: string;
  delivery_fee: number;
  products: productType[];
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>> | null;
  addToCart?: (
    itemId: string,
    size: string,
    quantity?: number
  ) => Promise<void>;
  getCartCount?: () => number;
  cartItems: { [itemId: string]: Record<string, number> };
  updateQuantity: (
    itemId: string,
    size: string,
    quantity: number
  ) => Promise<void>;
  getCartAmount: () => number;
  navigate: NavigateFunction;
  backendUrl?: string;
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  setCartItems: React.Dispatch<React.SetStateAction<CartType>>;
};

export const context: ContextType = {
  currency: "$",
  delivery_fee: 10,
  products: products,
  cartItems: {},
  setToken: () => "",
  navigate: () => "",
  setCartItems: () => {},
  updateQuantity: async () => Promise.resolve(),
  getCartAmount: () => 0,
};
