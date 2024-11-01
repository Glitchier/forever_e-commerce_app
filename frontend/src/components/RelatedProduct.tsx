import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { productType } from "../assets/assets";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({
  category,
  subCategory,
}: {
  category: string;
  subCategory: string;
}) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState<productType[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 5));
    }
  }, [category, products, subCategory]);

  return (
    <div className="mt-20">
      <div className="text-2xl py-2">
        <Title txt1="Related" txt2="Products" />
      </div>
      <div className="grid grid-cols-2 mt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, i) => (
          <ProductItem
            key={i}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
