import { carousel } from "../assets/assets";

type CarouselProps = {
  current: number;
};

const Carousel = ({ current }: CarouselProps) => {
  return (
    <div className="flex flex-col gap-4 overflow-hidden drop-shadow-md">
      <div className="relative flex flex-col justify-center items-center gap-4">
        {carousel.map((item, idx) => {
          return (
            <div
              key={idx}
              className={
                idx === current
                  ? "opacity-100"
                  : "flex flex-1 opacity-0 absolute overflow-hidden"
              }
            >
              <img
                src={item.img}
                className="object-cover aspect-video rounded-xl max-h-[80vh]"
              />
            </div>
          );
        })}
        {/* Page Dots */}

        <div className="flex justify-center items-center gap-1">
          {carousel.map((_, idx) => {
            return (
              <div
                key={idx}
                className={
                  idx === current
                    ? "bg-blue rounded-full w-2 h-2 cursor-pointer z-[10]"
                    : "bg-zinc-400 rounded-full w-1 h-1 cursor-pointer z-[10]"
                }
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
