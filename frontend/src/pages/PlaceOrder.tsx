import { FormEvent, useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { IoMdCash } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const PlaceOrder = () => {
  const [method, setMethod] = useState<string>("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e: { target: { name: string; value: string } }) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order: {
    amount: number;
    currency: string;
    id: string;
    receipt: string;
  }) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: async (res: any) => {
        console.log(res);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            res,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.log(error.message);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // API call for COD
        case "cod": {
          const res = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success(res.data.message, { theme: "colored" });
          } else {
            toast.error(res.data.message);
          }
          break;
        }
        case "stripe": {
          const resStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(resStripe.data.message);
          }
          break;
        }
        case "razorpay": {
          const resRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (resRazorpay.data.success) {
            initPay(resRazorpay.data.order);
          }
          break;
        }
        default:
          break;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-4">
          <Title txt1="Delivery" txt2="Information" />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            className="border-gray-400 border rounded py-2 px-4 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            className="border-gray-400 border rounded py-2 px-4 w-full"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email"
          className="border-gray-400 border rounded py-2 px-4 w-full"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border-gray-400 border rounded py-2 px-4 w-full"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border-gray-400 border rounded py-2 px-4 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border-gray-400 border rounded py-2 px-4 w-full"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Zip Code"
            className="border-gray-400 border rounded py-2 px-4 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border-gray-400 border rounded py-2 px-4 w-full"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone"
          className="border-gray-400 border rounded py-2 px-4 w-full"
          required
        />
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title txt1="Payment" txt2="Method" />
          <div className="flex flex-col mt-4 gap-4 lg:flex-row">
            <div
              className={`flex items-center gap-4 border-2 py-2 px-4 rounded ${
                method === "stripe" ? "border-b-blue" : ""
              }`}
            >
              <input
                onChange={(e) => setMethod(e.target.value)}
                type="radio"
                name="payMethod"
                value="stripe"
                className="accent-blue cursor-pointer w-4 h-4"
                checked={method === "stripe"}
              />
              <img src={assets.stripe_logo} className="h-4 px-4" alt="stripe" />
            </div>
            <div
              className={`flex items-center gap-4 border-2 py-2 px-4 rounded ${
                method === "razorpay" ? "border-b-blue" : ""
              }`}
            >
              <input
                type="radio"
                onChange={(e) => setMethod(e.target.value)}
                name="payMethod"
                value="razorpay"
                className="accent-blue cursor-pointer w-4 h-4"
                checked={method === "razorpay"}
              />
              <img
                src={assets.razorpay_logo}
                className="h-4 px-4"
                alt="razorpay"
              />
            </div>
          </div>
          <div
            className={`flex items-center mt-4 gap-4 border-2 py-2 px-4 rounded ${
              method === "cod" ? "border-b-blue" : ""
            }`}
          >
            <input
              onChange={(e) => setMethod(e.target.value)}
              type="radio"
              name="payMethod"
              value="cod"
              className="accent-blue cursor-pointer w-4 h-4"
              checked={method === "cod"}
            />
            <div className="flex justify-center items-center gap-2 px-4">
              <IoMdCash size={"1.2rem"} fill="#09974A" />
              <p className="text-xs font-semibold text-gray-500">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-blue text-white text-sm font-semibold active:bg-gray-800 px-8 py-2 uppercase tracking-wider rounded"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
