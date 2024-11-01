import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../assets/assets";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

type props = {
  token: string;
};

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string[];
}

const List = ({ token }: props) => {
  const [list, setList] = useState<Product[]>([]);
  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setList(res.data.product);
      } else {
        toast.error(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const delProduct = async (id: string) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/delete",
        { id },
        {
          headers: { token },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "An unexpected error occurred.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2">Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Product List */}
        {list.map((item, i) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={i}
          >
            <img className="w-12" src={item.image[0]} alt="img" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              className="cursor-pointer w-full flex justify-center items-center gap-2"
              onClick={() => delProduct(item._id)}
            >
              <MdDelete fill="#FF7777" size={"1.2rem"} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
