import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Rating } from "@mui/material";
import RelatedProduct from "../components/RelatedProduct";
import { toast } from "react-toastify";

type itemType = {
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

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState<itemType>();
  const [image, setImage] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const fetchProductData = useCallback(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  const onClickAddToCartHandle = (id: string, size: string) => {
    if (addToCart !== undefined && size !== "") {
      addToCart(id, size);
      toast.success("Item added successfully.", { position: "bottom-right" });
    } else {
      toast.error("Select Product Size!");
      return;
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [fetchProductData]);

  return productData ? (
    <div className="pt-10 w-full transition-opacity ease-in duration-300 opacity-100">
      {/* Product Data */}
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-2 sm:flex-row">
          <div className="flex px-1 sm:flex-col justify-between sm:justify-normal overflow-x-auto sm:overflow-y-scroll sm:w-[20%] w-full">
            {productData.image.map((item, idx) => (
              <img
                src={item}
                key={idx}
                alt={`img${idx}`}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-2 flex-shrink-0 cursor-pointer rounded"
              />
            ))}
          </div>
          <div className="w-full h-auto sm:w-[80%]">
            <img className="w-full rounded" src={image} alt="productImg" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex justify-start items-center gap-2 mt-2">
            <Rating name="read-only" value={4} readOnly />
            <p>(122)</p>
          </div>
          <p className="font-semibold text-xl mt-4">
            {currency}
            {productData.price}
          </p>
          <p className="mt-4 text-zinc-500 w-full md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, i) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border-2 rounded py-2 px-4 bg-gray-100 ${
                    item === size ? "border-blue" : ""
                  }`}
                  key={i}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => onClickAddToCartHandle(productData._id, size)}
            className="text-white px-6 py-2 text-sm uppercase bg-blue rounded active:bg-gray-800"
          >
            Add to cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-zinc-500 mt-6 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review */}
      <div className="mt-20">
        <div className="flex">
          <b className="px-4 py-2 border text-sm">Description</b>
          <p className="px-4 py-2 border text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ut
            quam maxime perspiciatis eius exercitationem blanditiis illum harum
            excepturi. Harum porro commodi rem aliquam veritatis ad laborum,
            tempora voluptate tenetur aut culpa in hic consectetur eveniet
            asperiores architecto totam dolore qui veniam? Ea magnam alias culpa
            repudiandae impedit maiores, possimus in explicabo beatae ab,
            adipisci aliquam id at. Saepe, doloribus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            beatae debitis asperiores, quisquam explicabo corporis. Velit, qui
            error. Delectus impedit repellendus consequuntur repudiandae
            voluptates repellat aliquam tempore. Animi, harum hic tenetur error
            ad, dolor autem voluptate sit corrupti, voluptas repellat ipsum
            consequuntur dicta? Maiores quos corrupti corporis quas hic eveniet
            eum saepe ipsum, laboriosam autem aliquid ex aliquam iusto esse
            laborum. Ipsa incidunt fugit sit reprehenderit ad veritatis
            assumenda totam sint exercitationem! Nemo, odio ea modi in, eveniet
            et harum vero consequuntur tempora totam maxime molestias dicta
            voluptates dolorum ab quia cumque ratione! Deleniti asperiores
            commodi vero aut aperiam sint!
          </p>
        </div>
      </div>
      {/* Related Category */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
