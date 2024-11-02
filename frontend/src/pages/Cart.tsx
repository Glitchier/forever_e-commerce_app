import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { MdDelete } from "react-icons/md";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

type tempDataType = {
  _id: string;
  size: string;
  quantity: number;
};

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState<tempDataType[]>([]);

  useEffect(() => {
    if (products.length !== 0) {
      const tempData: tempDataType[] = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="py-14 mt-14">
      <div className="text-2xl mb-4">
        <Title txt1="Your" txt2="Cart" />
      </div>
      {cartData.length !== 0 ? (
        <>
          <div>
            {cartData.map((item, i) => {
              const productData = products.find(
                (product) => product._id === item._id
              );
              return (
                <div
                  key={i}
                  className="p-4 border rounded bg-white text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] w-full sm:grid-cols-[4fr_2fr_0.5fr] items-center justify-between gap-4 my-4"
                >
                  <div className="flex items-center h-full w-full gap-6">
                    <img
                      className="w-20 sm:w-36 rounded"
                      src={productData?.image[0]}
                      alt="img"
                    />
                    <div className="flex flex-col h-full items-start gap-4">
                      <p className="text-xs sm:text-lg font-medium sm:font-normal">
                        {productData?.name}
                      </p>
                      <div className="flex flex-col items-center justify-end gap-2">
                        <p className="text-sm sm:text-md">Size: {item.size}</p>
                        <p className="font-semibold text-sm sm:text-lg">
                          {currency}
                          {productData?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2 w-full">
                    <p className="text-xs sm:text-sm">Quantity:</p>
                    <input
                      className="border rounded ml-2 max-w-12 sm:max-w-16 px-1 sm:px-2 py-1"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(e) =>
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateQuantity
                          ? updateQuantity(
                              item._id,
                              item.size,
                              Number(e.target.value)
                            )
                          : null
                      }
                    />
                  </div>
                  <div
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="flex justify-center items-center w-fit mx-auto cursor-pointer p-2 transition-all ease-in rounded-md active:bg-zinc-200 active:scale-110"
                  >
                    <MdDelete fill="#FF7777" size={"1.8rem"} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[480px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => (navigate ? navigate("/place-order") : null)}
                  className="bg-blue text-white text-sm uppercase font-medium tracking-wider my-8 px-6 rounded py-3 active:bg-gray-800"
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4 my-14">
          <p className="text-2xl font-Montserrat text-gray-400">
            Your Cart is Empty
          </p>
          <Link to={"/collection"}>
            <p className="bg-blue px-4 py-2 text-white rounded text-sm font-medium uppercase tracking-wide active:bg-gray-600">
              Shop Now
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
