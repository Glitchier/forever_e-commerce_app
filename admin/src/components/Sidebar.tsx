import { IoAddCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { LuList } from "react-icons/lu";

const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-start gap-4 border-r max-w-[200px] w-fit md:w-full h-full min-h-screen">
      <div className="flex flex-col w-full h-full gap-2 pr-2 rounded mt-6 overflow-hidden">
        <NavLink to={"/add"} className="flex items-center gap-2 p-4 rounded">
          <IoAddCircleOutline size={"1.3rem"} />
          <p className="hidden md:block text-sm">Add Items</p>
        </NavLink>
        <hr />
        <NavLink to={"/list"} className="flex items-center gap-2 p-4 rounded">
          <LuList size={"1.3rem"} />
          <p className="hidden md:block text-sm">List Items</p>
        </NavLink>
        <hr />
        <NavLink to={"/orders"} className="flex items-center gap-2 p-4 rounded">
          <BsCartCheck size={"1.3rem"} />
          <p className="hidden md:block text-sm">Orders</p>
        </NavLink>
        <hr />
      </div>
    </aside>
  );
};

export default Sidebar;
