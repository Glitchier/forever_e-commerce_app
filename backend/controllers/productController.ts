import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel";

//Add Product
const addProduct = async (
  req: {
    files: any;
    body: {
      name: string;
      description: string;
      price: number;
      category: string;
      subCategory: string;
      sizes: any;
      bestseller: boolean;
    };
  },
  res: any
) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller,
      image: imagesUrl,
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added Successfully." });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Total Product List
const listProduct = async (req: any, res: any) => {
  try {
    const product = await productModel.find({});
    res.json({ success: true, product });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req: { body: { id: string } }, res: any) => {
  try {
    const proID = await productModel.findById(req.body.id);
    if (proID) {
      await productModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Product Removed." });
    } else {
      res.json({ success: false, message: "ID not found!" });
    }
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Single Product Details
const singleProduct = async (
  req: { body: { productId: string } },
  res: any
) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error: any) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, deleteProduct, singleProduct };
