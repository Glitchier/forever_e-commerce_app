import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

type ProductItemProps = {
  id: string;
  image: string[];
  name: string;
  price: number;
};

const ProductItem = ({ id, image, name, price }: ProductItemProps) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link
      className="text-zinc-700 mx-auto cursor-pointer border rounded w-full flex flex-col justify-start items-center"
      to={`/product/${id}`}
    >
      <div className="flex justify-center items-center flex-col overflow-hidden">
        <div className="flex h-full w-full justify-center items-center overflow-hidden">
          <img
            src={image[0]}
            alt={`product${id}`}
            className="hover:scale-110 transition ease-in-out overflow-hidden"
          />
        </div>
        <div className="flex flex-col gap-2 w-full justify-center items-start p-4">
          <p className="text-sm">{name}</p>
          <p className="font-semibold text-md">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
