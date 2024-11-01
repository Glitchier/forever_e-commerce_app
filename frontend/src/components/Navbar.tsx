import { Link, NavLink } from "react-router-dom";
import { IoPersonCircleSharp } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { CgMenu } from "react-icons/cg";
import { IoIosArrowBack } from "react-icons/io";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Logo } from "../assets/assets";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, setToken, navigate, token, setCartItems } =
    useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <nav
      id="nav"
      className="flex justify-between items-center z-[99] min-w-fit gap-2 py-5 font-medium h-20 w-full"
    >
      <Link to={"/"}>
        <div id="logo" className="flex justify-center items-center gap-2">
          <img src={Logo} alt="logo" className="h-[30px] w-[30px] font-black" />
          <h1 className="text-xl font-Montserrat">Forever</h1>
        </div>
      </Link>

      <ul
        id="link"
        className="hidden sm:flex justify-end items-center gap-5 text-sm"
      >
        <NavLink
          id="navlink"
          to="/"
          className="flex flex-col gap-1 items-center"
        >
          <p>Home</p>
          <hr className="w-2/3 border-none h-1 rounded-full" />
        </NavLink>
        <NavLink
          id="navlink"
          to="/collection"
          className="flex flex-col gap-1 items-center"
        >
          <p>Collection</p>
          <hr className="w-2/3 border-none h-1 rounded-full" />
        </NavLink>
        <NavLink
          id="navlink"
          to="/contact"
          className="flex flex-col gap-1 items-center"
        >
          <p>Contact</p>
          <hr className="w-2/3 border-none h-1 rounded-full" />
        </NavLink>
        <NavLink
          id="navlink"
          to="/about"
          className="flex flex-col gap-1 items-center"
        >
          <p>About</p>
          <hr className="w-2/3 border-none h-1 rounded-full" />
        </NavLink>
      </ul>
      <div
        id="navicons"
        className="flex items-center gap-4 justify-center text-3xl"
      >
        <div className="group relative">
          <Link to={"/collection"} className="cursor-pointer">
            <FiSearch size={"1.5rem"} className="cursor-pointer" />
          </Link>
        </div>
        <div id="profile" className="group relative">
          <IoPersonCircleSharp
            size={"1.8rem"}
            className="cursor-pointer"
            onClick={() => (token ? null : navigate("/login"))}
          />
          {token && (
            <div
              id="profileMenu"
              className="absolute z-[999] left-0 top-full -translate-x-1/2 py-3 pl-4 pr-8 text-gray-500 rounded shadow-md border bg-white text-sm font-medium hidden group-hover:block"
            >
              <p className="hover:text-gray-900 cursor-pointer mb-2 text-nowrap">
                My Profile
              </p>
              <p
                onClick={() => navigate("/orders")}
                className="hover:text-gray-900 cursor-pointer mb-2 text-nowrap"
              >
                Orders
              </p>
              <p
                className="hover:text-gray-900 cursor-pointer mb-2 text-nowrap"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <LuShoppingCart size={"1.8rem"} className="p-[2px] cursor-pointer" />
          <div className="absolute right-[0%] top-[0%] flex justify-center items-center w-4 h-4 bg-blue aspect-square rounded-full">
            <p className="text-center text-[8px] text-white">
              {getCartCount ? getCartCount() : 0}
            </p>
          </div>
        </Link>
        <CgMenu
          onClick={() => setVisible(true)}
          size={"1.8rem"}
          className="cursor-pointer ml-1 sm:hidden"
        />
      </div>
      {/* Sidebar Menu */}
      <div
        className={`fixed z-[99] top-0 right-0 bottom-0 py-10 px-8 overflow-hidden bg-slate-200 duration-300 transition-all ${
          visible ? "w-[300px]" : "w-0 hidden"
        }`}
      >
        <div className="flex flex-col justify-start items-end gap-4">
          <div
            className="flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <IoIosArrowBack
              size={"2rem"}
              fill="#4b5563"
              stroke="#4b5563"
              className="text-gray-600 p-1"
            />
            <p>Back</p>
          </div>
          <div className="flex flex-col justify-center items-end gap-4 mt-8">
            <NavLink
              to="/"
              onClick={() => setVisible(false)}
              className="flex flex-col items-end hover:scale-110 hover:text-blue"
            >
              <p className="text-lg font-Montserrat hover:scale-110 hover:text-blue">
                Home
              </p>
            </NavLink>
            <NavLink
              to="/collection"
              onClick={() => setVisible(false)}
              className="flex flex-col items-end"
            >
              <p className="text-lg font-Montserrat hover:scale-110 hover:text-blue">
                Collection
              </p>
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setVisible(false)}
              className="flex flex-col gap-1 items-center"
            >
              <p className="text-lg font-Montserrat hover:scale-110 hover:text-blue">
                Contact
              </p>
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setVisible(false)}
              className="flex flex-col items-end hover:scale-110 hover:text-blue"
            >
              <p className="text-lg font-Montserrat hover:scale-110 hover:text-blue">
                About
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
