import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { productType } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

type OrderDataType = {
  items: productType[];
  amount: number;
  address: {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    phone: string;
  };
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
};

type OrderItemType = productType & {
  status: string;
  payment: boolean;
  paymentMethod: string;
  date: number;
};

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState<OrderItemType[]>([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        const allOrdersItem: OrderItemType[] = [];
        res.data.orders.forEach((order: OrderDataType) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrdersItem);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="pt-6 mt-14">
      <div className="text-2xl">
        <Title txt1="My" txt2="orders" />
      </div>
      {orderData.length !== 0 ? (
        <div className="flex flex-col gap-0 mt-6">
          {orderData.map((item, i) => (
            <div
              className="py-4 border-y text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full rounded"
              key={i}
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={item.image[0]}
                  alt="img"
                  className="w-[92px] rounded"
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center mt-2 gap-4 text-base text-gray-700">
                    <p className="font-semibold">
                      {currency}
                      {item.price}
                    </p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm">Size: {item.size}</p>
                  </div>
                  <p className="mt-2 text-sm">
                    Date:{" "}
                    <span className="text-gray-500 text-sm">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-2 text-sm">
                    Payment:{" "}
                    <span className="text-gray-500 text-sm uppercase">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p
                    className={`min-w-2 h-2 rounded-full ${
                      item.payment || item.paymentMethod === "cod"
                        ? "bg-green-500"
                        : "bg-yellow-300"
                    }`}
                  ></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border-2 hover:border-blue active:border-black px-4 py-2 text-sm font-medium rounded"
                >
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4 my-14">
          <p className="text-2xl font-Montserrat text-gray-400">
            No Orders Yet
          </p>
          <Link to={"/"}>
            <p className="bg-blue px-4 py-2 text-white tracking-wider font-medium text-sm rounded active:bg-gray-600">
              Back to Home
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
