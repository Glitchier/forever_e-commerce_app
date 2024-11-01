import userModel from "../models/userModel";

// Add Products to User Cart
const addToCart = async (
  req: { body: { userId: string; itemId: string; size: string } },
  res: any
) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    if (userData.cartData[itemId]) {
      if (userData.cartData[itemId][size]) {
        userData.cartData[itemId][size] += 1;
      } else {
        userData.cartData[itemId][size] = 1;
      }
    } else {
      userData.cartData[itemId] = {};
      userData.cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(
      userId,
      { cartData: userData.cartData },
      { new: true }
    );
    res.json({ success: true, message: "Added to Cart" });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Updates User Cart
const updateCart = async (
  req: {
    body: { userId: string; itemId: string; size: string; quantity: number };
  },
  res: any
) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);

    userData.cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData: userData.cartData });
    res.json({ success: true, message: "Cart Updated" });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get User cart data
const getUserCart = async (
  req: {
    body: { userId: string };
  },
  res: any
) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    res.json({ success: true, cartData: userData.cartData });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
