import { Logo } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-sm">
        <div>
          <img src={Logo} alt="logo" className="mb-5 w-20" />
          <p className="w-full md:w-2/3 text-zinc-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio,
            quaerat sunt! Aperiam veritatis aliquam laudantium blanditiis
            tempore accusantium sint maiores saepe. Ipsa ab nesciunt incidunt
            voluptates labore at suscipit nulla.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium my-5">COMPANY</p>
          <ul className="flex flex-col gap-2">
            <li className="text-zinc-600">Home</li>
            <li className="text-zinc-600">About us</li>
            <li className="text-zinc-600">Delivery</li>
            <li className="text-zinc-600">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium my-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2">
            <li className="text-zinc-600">+1 254 862 5456</li>
            <li className="text-zinc-600">contact@forever.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-sm text-gray-400 py-5 text-center">
          Copyright © 2024 forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
