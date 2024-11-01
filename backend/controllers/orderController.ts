import orderModel from "../models/orderModel";
import userModel from "../models/userModel";
import Stripe from "stripe";
import razorpay from "razorpay";

export type productType = {
  quantity: number;
  size: string;
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

type orderType = {
  userId: string;
  items: [
    {
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
    }
  ];
  amount: number;
  address: object;
  currency: string;
};

// Global Variables
const currency = "usd";
const deliveryCharges = 10;

// Gateway Init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Placing orders using COD Method
const placeOrder = async (
  req: {
    body: { userId: string; items: []; amount: number; address: object };
  },
  res: any
) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Stripe Method
const placeOrderStripe = async (
  req: {
    body: orderType;
    headers: { origin: string };
  },
  res: any
) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    res.json({ success: true, session_url: session.url });
  } catch (error: any) {
    console.log("Error initiating Stripe checkout:", error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Stripe
const verifyStripe = async (
  req: { body: { orderId: string; success: string; userId: string } },
  res: any
) => {
  const { orderId, success, userId } = req.body;
  try {
    if (!orderId || !userId) {
      res
        .status(400)
        .json({ success: false, message: "Invalid data provided." });
    }
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error: any) {
    console.log("Stripe verification error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req: any, res: any) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "razorpay",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      return res.json({ success: true, order });
    });
  } catch (error: any) {
    console.log("Razorpay verification error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Razorpay Verify

const verifyRazorpay = async (
  req: { body: { userId: string; razorpay_order_id: string } },
  res: any
) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successfull" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error: any) {
    console.log("Razorpay verification error:", error);
    res.json({ success: false, message: error.message });
  }
};

// All orders data for admin panel
const allOrders = async (req: any, res: any) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User order data for frontend
const userOrders = async (req: { body: { userId: string } }, res: any) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status from admin panel
const updateStatus = async (
  req: { body: { orderId: string; status: string } },
  res: any
) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete order from admin panel
const deleteOrder = async (
  req: { body: { orderId: string; status: string } },
  res: any
) => {
  try {
    const { orderId } = req.body;
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Order Deleted" });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  deleteOrder,
  verifyRazorpay,
};
