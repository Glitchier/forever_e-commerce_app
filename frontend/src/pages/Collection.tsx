import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { LuSettings2 } from "react-icons/lu";
import Title from "../components/Title";
import { productType } from "../assets/assets";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState<productType[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("relavent");

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy: productType[] = products.slice();

    if (search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    return setFilterProduct(productCopy);
  };

  const sortProduct = () => {
    const filterProductCopy = filterProduct.slice();

    switch (sortType) {
      case "low-high":
        setFilterProduct(filterProductCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(filterProductCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, search, category, subCategory]);

  useEffect(() => {
    sortProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return (
    <div className="flex flex-col justify-center items-start gap-8 mt-14">
      <h1 className="text-xl flex justify-start gap-3 cursor-pointer items-center font-semibold uppercase tracking-wide font-Montserrat">
        Filters
        <LuSettings2
          size={"2rem"}
          onClick={() => setShowFilter(!showFilter)}
          className={`lg:hidden block cursor-pointer rounded hover:bg-zinc-100 p-1 ${
            showFilter ? "text-blue" : "text-zinc-800"
          }`}
        />
      </h1>
      <div className="grid grid-cols-12 gap-6 w-full">
        {/* Filter */}
        <aside
          className={`lg:col-span-3 lg:block ${
            showFilter ? "block col-span-12" : "hidden"
          }`}
        >
          <div className="flex lg:flex-col justify-center items-start gap-8">
            {/* Categories */}
            <div className="flex flex-col justify-center items-center sm:items-start gap-4 border px-8 py-4 rounded w-full">
              <h1 className="font-semibold">Categories</h1>
              <div className="flex flex-col justify-center items-start text-zinc-700">
                <p className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    value={"Men"}
                    onChange={toggleCategory}
                  />
                  Men
                </p>
                <p className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    value={"Women"}
                    onChange={toggleCategory}
                  />
                  Women
                </p>
                <p className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    value={"Kids"}
                    onChange={toggleCategory}
                  />
                  Kids
                </p>
              </div>
            </div>
            {/* Sub Categories */}
            <div className="flex flex-col justify-center items-start gap-4 border px-8 py-4 rounded w-full">
              <h1 className="font-semibold">Type</h1>
              <div className="flex flex-col justify-center items-start text-zinc-700">
                <p className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    value={"Topwear"}
                    onChange={toggleSubCategory}
                  />
                  Topwear
                </p>
                <p className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    value={"Bottomwear"}
                    onChange={toggleSubCategory}
                  />
                  Bottomwear
                </p>
                <p className="flex justify-start items-center gap-2">
                  <input
                    type="checkbox"
                    value={"Winterwear"}
                    onChange={toggleSubCategory}
                  />
                  Winterwear
                </p>
              </div>
            </div>
          </div>
        </aside>
        {/* Collection */}
        <main className="lg:col-span-9 col-span-full">
          <div className="col-span-full flex justify-between items-center gap-4 mb-8">
            <Title txt1="All" txt2="Collections" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="cursor-pointer border px-2 py-1 rounded text-sm"
            >
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
            {filterProduct.map((item, idx) => (
              <ProductItem
                key={idx}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Collection;
