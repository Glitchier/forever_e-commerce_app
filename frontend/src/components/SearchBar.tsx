import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch } = useContext(ShopContext);

  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/collection") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return (
    visible && (
      <div className="flex justify-center mt-6 items-center gap-4 w-full">
        <div className="flex justify-between items-center gap-4 w-full rounded-full border text-sm px-4 py-1 max-w-[480px]">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            className="w-full h-full outline-none text-sm p-2"
            onChange={(e) => (setSearch ? setSearch(e.target.value) : null)}
          />
          <FiSearch className="mx-2" size={"1.3rem"} stroke="#666" />
        </div>
      </div>
    )
  );
};

export default SearchBar;
