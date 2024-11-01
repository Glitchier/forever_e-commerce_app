import { Link } from "react-router-dom";
import { LOGO } from "../assets/assets";

type props = {
  setToken: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar = ({ setToken }: props) => {
  return (
    <nav className="flex justify-between items-center gap-4 py-6 col-span-full w-full border-y bg-white">
      <Link to={"/"}>
        <div id="logo" className="flex justify-center items-center gap-2">
          <img src={LOGO} alt="logo" className="h-[30px] w-[30px] font-black" />
          <h1 className="leading-none tracking-wider">
            <b className="block font-Montserrat tracking-wider">Forever</b>
            <i className="text-xs font-medium font-Montserrat">Admin Panel</i>
          </h1>
        </div>
      </Link>
      <button
        onClick={() => setToken("")}
        className="rounded px-4 py-2 text-sm bg-blue text-white font-Montserrat"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
