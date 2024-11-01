import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency, productType } from "../assets/assets";
import { toast } from "react-toastify";
import { BsBox2 } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

type orderType = {
  _id: string;
  items: productType[];
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
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
};

type props = {
  token: string;
};

const Orders = ({ token }: props) => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [visible, setVisible] = useState<string>("");

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteOrder = async (orderId: string) => {
    const res = await axios.post(
      backendUrl + "/api/order/deleteOrder",
      { orderId },
      { headers: { token } }
    );
    console.log(res);

    try {
      if (res.data.success) {
        await fetchAllOrders();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (
    e: { target: { value: string } },
    orderId: string
  ) => {
    const res = await axios.post(
      backendUrl + "/api/order/status",
      {
        orderId,
        status: e.target.value,
      },
      { headers: { token } }
    );
    try {
      if (res.data.success) {
        await fetchAllOrders();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div>
      {orders.length > 0 ? (
        <>
          <h3>Order Page</h3>
          <div>
            {orders.map((order, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border-2 rounded border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              >
                <div className="border-2 p-3 rounded flex justify-center items-center w-fit">
                  <BsBox2 size={"2rem"} />
                </div>
                <div>
                  <div>
                    {order.items.map((item, i) => {
                      if (i === order.items.length - 1) {
                        return (
                          <p className="py-0.5" key={i}>
                            {item.name} X {item.quantity}
                            <span>{item.size}</span>
                          </p>
                        );
                      } else {
                        return (
                          <p className="py-0.5" key={i}>
                            {item.name} X {item.quantity}
                            <span>{item.size}</span>,
                          </p>
                        );
                      }
                    })}
                  </div>
                  <p className="mt-3 mb-2 font-medium">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>
                      {order.address.city + ", " + order.address.state + ","}
                    </p>
                    <p>
                      {order.address.country + " - " + order.address.zipcode}
                    </p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-sm">Items: {order.items.length}</p>
                  <p className="mt-3">
                    Method: {order.paymentMethod.toUpperCase()}
                  </p>
                  <p>Payment: {order.payment ? "Paid" : "Pending"}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="text-sm font-medium">
                  {currency}
                  {order.amount}
                </p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="p-2 font-semibold border-2 rounded"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <div className="col-span-full flex w-full justify-end items-center gap-2">
                  {visible === order._id ? (
                    <div className="w-full h-full p-4 flex flex-col items-end gap-4">
                      <p>Are you sure you want to delete this order?</p>
                      <div className="flex justify-center items-center gap-4">
                        <button
                          className="bg-[#FF7777] text-white border-white/50 border-2 px-4 py-2 rounded active:border-gray-400"
                          onClick={() => deleteOrder(order._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-white border-2 px-4 py-2 rounded active:border-gray-400"
                          onClick={() => setVisible("")}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setVisible(order._id)}
                      className="border-2 rounded p-2 cursor-pointer hover:border-[#FF7777] active:border-gray-400"
                    >
                      <MdDelete fill="#FF7777" size={"1.2rem"} className="" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 w-full h-full my-14">
          <p className="text-2xl font-Montserrat font-medium text-gray-400">
            No Orders Yet 😞
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
