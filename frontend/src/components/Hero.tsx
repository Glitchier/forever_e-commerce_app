import { carousel } from "../assets/assets";
import { IoIosArrowRoundForward } from "react-icons/io";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";

const Hero = () => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      handleRight();
    }, 4000);
  });

  const handleRight = () => {
    setCurrent(current === carousel.length - 1 ? 0 : current + 1);
  };

  return (
    <div
      id="main"
      className="flex flex-col justify-center items-center mt-14 w-full gap-6"
    >
      <div className="grid grid-cols-12 gap-8 mx-auto">
        <div className="flex flex-col gap-3 md:gap-6 justify-center items-start capitalize col-span-full xl:col-span-4">
          <div className="flex justify-center items-center gap-2 md:gap-4">
            <div className="h-[3px] rounded-full bg-blue w-6 lg:w-10"></div>
            <p className="font-Montserrat text-xl md:text-2xl lg:text-3xl leading-tight">
              Latest Arrivals
            </p>
          </div>
          <p className="font-Montserrat text-3xl md:text-4xl lg:text-5xl leading-tight tracking-wide">
            {carousel[current].title}
          </p>
          <div className="flex justify-center items-center gap-2 cursor-pointer">
            <p className="font-Montserrat text-xl md:text-2xl lg:text-3xl leading-tight">
              shop now
            </p>
            <IoIosArrowRoundForward size={"3rem"} fill="#4B70F5" />
          </div>
        </div>

        <div className="col-span-full xl:col-span-8">
          <Carousel current={current} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
