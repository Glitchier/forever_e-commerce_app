import { FormEvent, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { backendUrl } from "../assets/assets";
import { toast } from "react-toastify";

type props = {
  token: string;
};

const Add = ({ token }: props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [image1, setImage1] = useState<File>();
  const [image2, setImage2] = useState<File>();
  const [image3, setImage3] = useState<File>();
  const [image4, setImage4] = useState<File>();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("Men");
  const [subCategory, setSubCategory] = useState<string>("Topwear");
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [sizes, setSizes] = useState<string[]>([]);

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", String(bestseller));
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const res = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(undefined);
        setImage2(undefined);
        setImage3(undefined);
        setImage4(undefined);
      } else {
        toast.error(res.data.message);
      }
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Form submission error:", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-6"
    >
      <div className="flex flex-col w-fit gap-4">
        <p className="text-sm font-medium">Upload Image:</p>
        <div className="flex flex-wrap gap-2">
          {image1 ? (
            <img src={URL.createObjectURL(image1)} className="w-20" />
          ) : (
            <div className="bg-gray-100 border-dashed border-2 border-gray-200 px-6 py-4 rounded">
              <label
                htmlFor="image1"
                className="flex flex-col justify-center items-center"
              >
                <IoMdCloudUpload
                  fill="gray"
                  size={"2.5rem"}
                  className="cursor-pointer"
                />
                <input
                  onChange={(e) => {
                    setImage1(
                      e.target && e.target.files ? e.target.files[0] : image1
                    );
                  }}
                  type="file"
                  id="image1"
                  hidden
                  className="cursor-pointer w-full h-full"
                />
                <p className="text-xs text-gray-500 cursor-pointer">Upload</p>
              </label>
            </div>
          )}

          {image2 ? (
            <img src={URL.createObjectURL(image2)} className="w-20" />
          ) : (
            <div className="bg-gray-100 border-dashed border-2 border-gray-200 px-6 py-4 rounded">
              <label
                htmlFor="image2"
                className="flex flex-col justify-center items-center"
              >
                <IoMdCloudUpload
                  fill="gray"
                  size={"2.5rem"}
                  className="cursor-pointer"
                />
                <input
                  onChange={(e) => {
                    setImage2(
                      e.target && e.target.files ? e.target.files[0] : image2
                    );
                  }}
                  type="file"
                  id="image2"
                  hidden
                  className="cursor-pointer w-full h-full"
                />
                <p className="text-xs text-gray-500 cursor-pointer">Upload</p>
              </label>
            </div>
          )}

          {image3 ? (
            <img src={URL.createObjectURL(image3)} className="w-20" />
          ) : (
            <div className="bg-gray-100 border-dashed border-2 border-gray-200 px-6 py-4 rounded">
              <label
                htmlFor="image3"
                className="flex flex-col justify-center items-center"
              >
                <IoMdCloudUpload
                  fill="gray"
                  size={"2.5rem"}
                  className="cursor-pointer"
                />
                <input
                  onChange={(e) => {
                    setImage3(
                      e.target && e.target.files ? e.target.files[0] : image3
                    );
                  }}
                  type="file"
                  id="image3"
                  hidden
                  className="cursor-pointer w-full h-full"
                />
                <p className="text-xs text-gray-500 cursor-pointer">Upload</p>
              </label>
            </div>
          )}

          {image4 ? (
            <img src={URL.createObjectURL(image4)} className="w-20" />
          ) : (
            <div className="bg-gray-100 border-dashed border-2 border-gray-200 px-6 py-4 rounded">
              <label
                htmlFor="image4"
                className="flex flex-col justify-center items-center"
              >
                <IoMdCloudUpload
                  fill="gray"
                  size={"2.5rem"}
                  className="cursor-pointer"
                />
                <input
                  onChange={(e) => {
                    setImage4(
                      e.target && e.target.files ? e.target.files[0] : image4
                    );
                  }}
                  type="file"
                  id="image4"
                  hidden
                  className="cursor-pointer w-full h-full"
                />
                <p className="text-xs text-gray-500 cursor-pointer">Upload</p>
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-medium">Product Name:</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter product name"
          required
          className="w-full max-w-[512px] px-3 py-2 border-2 rounded"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-sm font-medium">Product Description:</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          rows={4}
          placeholder="Write product description"
          required
          className="w-full max-w-[512px] px-3 py-2 border-2 rounded"
        />
      </div>
      <div className="flex flex-wrap w-full justify-between items-center gap-4">
        <div className="flex flex-col gap-2 w-fit">
          <p className="text-sm font-medium">Product Category:</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="px-2 py-1 rounded border text-gray-700"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-fit">
          <p className="text-sm font-medium">Sub Category:</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="px-2 py-1 rounded border text-gray-700"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-fit">
          <p className="text-sm font-medium">Product Price:</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="px-3 py-1 rounded border max-w-[160px]"
            type="number"
            placeholder="Price (ex. 25)"
            required
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Product Sizes:</p>
        <div className="flex flex-wrap gap-4">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`rounded border ${
                sizes.includes("S") ? "border-blue" : "border-transparent"
              } px-3 py-1 cursor-pointer border-2 bg-gray-200`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`rounded border ${
                sizes.includes("M") ? "border-blue" : "border-transparent"
              } px-3 py-1 cursor-pointer border-2 bg-gray-200`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`rounded border ${
                sizes.includes("L") ? "border-blue" : "border-transparent"
              } px-3 py-1 cursor-pointer border-2 bg-gray-200`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`rounded border ${
                sizes.includes("XL") ? "border-blue" : "border-transparent"
              } px-3 py-1 cursor-pointer border-2 bg-gray-200`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`rounded border ${
                sizes.includes("XXL") ? "border-blue" : "border-transparent"
              } px-3 py-1 cursor-pointer border-2 bg-gray-200`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label
          className="cursor-pointer text-sm font-medium"
          htmlFor="bestseller"
        >
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className={`rounded px-8 font-medium py-2 text-white font-Montserrat uppercase ${
          loading ? "bg-gray-500" : "bg-blue active:bg-gray-800"
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default Add;
