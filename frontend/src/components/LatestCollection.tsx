import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { productType } from "../assets/assets";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState<productType>([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div id="title" className="text-center text-xl sm:text-3xl">
        <Title txt1={"Latest"} txt2="Collection" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-zinc-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
          adipisci!
        </p>
      </div>
      {/* Rendering Products */}
      <div
        id="items"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
      >
        {latestProducts.map((item, idx) => (
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

export default LatestCollection;
