import { RiExchangeLine } from "react-icons/ri";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";

const OurPolicy = () => {
  return (
    <div className="flex flex-col w-full sm:flex-row justify-around gap-12 sm:gap-2 text-center text-xs sm:text-sm md:text-base text-zinc-700">
      <div className="p-6">
        <RiExchangeLine size={"3rem"} fill="#4B70F5" className="m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-zinc-400">We offer hassle free exchange policy</p>
      </div>
      <div className="p-6">
        <RiVerifiedBadgeFill
          size={"3rem"}
          fill="#4B70F5"
          className="m-auto mb-5"
        />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-zinc-400">We provide 7 days free return policy</p>
      </div>
      <div className="p-6">
        <MdOutlineSupportAgent
          size={"3rem"}
          fill="#4B70F5"
          className="m-auto mb-5"
        />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-zinc-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
