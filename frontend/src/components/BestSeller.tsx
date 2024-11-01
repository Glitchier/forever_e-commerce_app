import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { productType } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState<productType[]>([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="text-center font-Montserrat text-xl sm:text-3xl">
        <Title txt1="Best" txt2="Sellers" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-zinc-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
          possimus!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, idx) => (
          <ProductItem
            key={idx}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
